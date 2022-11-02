import { FC, memo, useEffect, useMemo, useState } from "react";
import Scheduler, { Resource, SchedulerData } from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import "moment/locale/ru";
import s from "./ReactBigCalendar.module.css";
import CalendarHeader from "./Components/CalendarHeader/CalendarHeader";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import InformationContainer from "./Components/InformationContainer/InformationContainer";
import { RecruiterInfo } from "../../Types/RecruiterInfo";
import { getAvailableTimes } from "../../Helpers/GetAvailableTimes";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { changeCalendarViewTypeAction } from "../../Redux/Actions/ChangeCalendarViewTypeAction";
import PopUp from "../../UiKit/Popup/AlertDialog/AlertDialog";
import { createSchedulerEvent, createResourcesAndEvents } from "../../Helpers/CreateResourcesAndEvents";
import { resizeAction } from "../../Redux/Actions/ResizeAction";
import Popover from "./Components/Popover/Popover";
import { hasOverlap } from "../../Helpers/HasOverlap";
import PopupError from "../../UiKit/Popup/ErrorPopup/ErrorPopup";
import InfoPopup from "../../UiKit/Popup/InfoPopup/InfoPopup";
import { Alert, CircularProgress } from "@mui/material";
import { closeErrorWindowAction } from "../../Redux/Actions/CloseErrorWindowAction";
import { FullDateTime } from "../../Types/FullDateTime";
import {
    addRecruiterWorkTimeRequest,
    editRecruiterWorkTimeRequest,
    removeRecruiterWorkTimeRequest,
} from "../../Redux/Actions/RecruitersActions/RecruiterWorkTimesActions";
import { Time } from "../../Types/Time";
import { getDate, getHour, getMinutes, getTime } from "../../Helpers/DateTimeHelpers";
import WaitPopup from "../../UiKit/Popup/WaitPopup/WaitPopup";
import { DATE_FORMAT, DATE_TIME_FORMAT, widthDragDropContext } from "../../Constants";
import { getInformationRequest } from "../../Redux/Actions/GetInformationActions";
import { getStartAndEndOfWeek } from "../../Helpers/GetStartAndEndOfWeek";
import { changeCurrentDateAction } from "../../Redux/Actions/ChangeCurrentDateActions";
import { getEventsRequest } from "../../Redux/Actions/EventsActions/GetEventsActions";
import { ScheduleInterviewEvent } from "../../Types/ScheduleInterviewEvent";
import { signUpVolunteerRequest } from "../../Redux/Actions/SignUpVolunteerActions";
import { ViewTypeWorktime } from "../../Types/ViewTypeWorktime";
import { setViewAction } from "../../Redux/Actions/SetViewAction";
import AddWorkTimePopup from "../../UiKit/Popup/AddWorkTimePopup/AddWorkTimePopup";
import { findLastInterval } from "../../Helpers/FindLastInterval";

moment.locale("ru-ru");

const ReactBigCalendar: FC = () => {
    const { getInformationPending, allEventsPending, changePending, state, error, changeError } = useAppSelector(
        state => state.workDayState
    );
    const calendarViewType = state.calendarViewType;
    const recruiters = state.recruiters;
    const behaviours = state.behaviours;

    const currentDate = state.currentDate;
    const viewType = state.viewType;
    const currentDateString = moment(currentDate).format(DATE_TIME_FORMAT);
    const currentInformation = state.currentInformation;
    const currentEvent = state.currentEvent;
    const currentInterviewDuration = state.currentInterviewDuration;
    const currentEventInformation = state.currentEventInformation;

    const config = state.config;
    const role = state.role;
    const view = state.view;
    const [resources, scheduleEvents, interviews] = useMemo(
        () =>
            createResourcesAndEvents(
                recruiters,
                currentEvent.id,
                role,
                state.isWidget,
                viewType,
                currentInterviewDuration
            ),
        [recruiters, currentEvent, viewType]
    );
    const dispatch = useAppDispatch();
    const events = state.events;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [infoText, setInfoText] = useState<string>("");
    const [selectedFreeWorkTimeForAddNewWorkTime, setSelectedFreeWorkTimeForAddNewWorkTime] =
        useState<ScheduleEvent | null>(null);
    const [worktimeWeek, setWorktimeWeek] = useState<ScheduleEvent | null>(null);
    const [eventAdding, setEventAdding] = useState<ScheduleEvent | null>(null);
    const [isAdding, setIsAdding] = useState<boolean>(true);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | ScheduleInterviewEvent | null>(null);
    const [selectData, setData] = useState<RecruiterInfo | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [viewModel, setView] = useState<{ data: SchedulerData }>(() => {
        const data = new SchedulerData(currentDateString, calendarViewType, false, false, config, behaviours);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.setLocaleMoment(moment);
        data.setResources(resources);
        data.setEvents(view === "interview" ? interviews : scheduleEvents);
        return { data };
    });

    const removePrevClick = () => {
        const di = document.querySelector("i.anticon.anticon-left.icon-nav") as HTMLDivElement | null;
        const a = new Date();
        if (di && role !== "admin" && role !== "coord" && currentDate <= a) {
            di.style.display = "none";
        } else if (di) {
            di.style.display = "inline";
        }
    };

    useEffect(() => {
        const [start, end] = getStartAndEndOfWeek(new Date(currentDate));
        dispatch(getInformationRequest(start, end));
        dispatch(getEventsRequest());
        removePrevClick();
    }, []);

    useEffect(() => {
        if (currentInformation === undefined) {
            const [start, end] = getStartAndEndOfWeek(new Date(currentDate));
            dispatch(getInformationRequest(start, end));
        }
        removePrevClick();
    }, [currentDate]);

    useEffect(() => {
        const forceResize = () => {
            dispatch(resizeAction());
        };
        window.addEventListener("resize", forceResize);
        forceResize();
        return () => {
            window.removeEventListener("resize", forceResize);
        };
    }, []);

    useEffect(() => {
        setView(() => {
            const data = new SchedulerData(currentDateString, calendarViewType, false, false, config, behaviours);
            data.setResources(resources);
            data.setEvents(view === "interview" ? interviews : scheduleEvents);
            return { data };
        });
        removePrevClick();
    }, [currentDateString, config, resources, scheduleEvents, calendarViewType, behaviours, view]);

    function isScheduleEvent(event: ScheduleEvent | ScheduleInterviewEvent): event is ScheduleEvent {
        return (event as ScheduleEvent).interviews !== undefined;
    }

    const createData = (schedulerData: SchedulerData, event: ScheduleEvent | ScheduleInterviewEvent): RecruiterInfo => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const recruiter = schedulerData.resources.find((r: Resource) => r.id === event.resourceId);
        if (isScheduleEvent(event)) {
            const availableInterviewTimes = getAvailableTimes(event, event.interviews, currentInterviewDuration);
            return {
                name: recruiter.name,
                workTimeTitle: event.title,
                availableInterviewTimes,
                interviews: event.interviews,
            };
        } else {
            const selectedInterview = scheduleEvents
                .filter(e => e.id === event.workTimeId)[0]
                .interviews.filter(i => i.id === event.id);
            return {
                name: recruiter.name,
                workTimeTitle: event.title,
                availableInterviewTimes: [],
                interviews: selectedInterview,
            };
        }
    };

    const setSchedulerData = (schedulerData: SchedulerData) => {
        schedulerData.setResources(resources);
        schedulerData.setEvents(view === "interview" ? interviews : scheduleEvents);
        if (currentEventInformation.workTimes.get(schedulerData.startDate) === undefined) {
            const [start, end] = getStartAndEndOfWeek(new Date(schedulerData.startDate));
            dispatch(getInformationRequest(start, end));
        }
        dispatch(changeCurrentDateAction(new Date(schedulerData.startDate)));
    };

    const changeView = (view: ViewTypeWorktime) => {
        if (selectedEvent) {
            selectedEvent.bgColor = "#D9EDF7";
            setSelectedEvent(null);
            setData(null);
        }
        dispatch(setViewAction(view));
    };

    const changeMainEvent = () => {
        if (selectedEvent) {
            selectedEvent.bgColor = "#D9EDF7";
            setSelectedEvent(null);
            setData(null);
        }
    };

    const prevClick = (schedulerData: SchedulerData) => {
        schedulerData.prev();
        setSchedulerData(schedulerData);
    };

    const nextClick = (schedulerData: SchedulerData) => {
        schedulerData.next();
        setSchedulerData(schedulerData);
    };

    const selectDate = (schedulerData: SchedulerData, date: string) => {
        schedulerData.setDate(date);
        setSchedulerData(schedulerData);
    };

    const viewChange = (schedulerData: SchedulerData, view: any) => {
        if (selectedEvent) {
            selectedEvent.bgColor = "#D9EDF7";
            setSelectedEvent(null);
            setData(null);
        }
        dispatch(changeCalendarViewTypeAction(view.viewType));
    };

    const eventItemClick = (schedulerData: SchedulerData, event: ScheduleEvent | ScheduleInterviewEvent) => {
        if (event.bgColor === "#EEE" || (event as ScheduleEvent).isFree) return;
        setData(createData(schedulerData, event));
        event.bgColor = "#1890ff";
        if (selectedEvent && event !== selectedEvent) selectedEvent.bgColor = "#D9EDF7";
        setIsEditing(false);
        setSelectedEvent(event);
    };

    const addingEvent = (
        schedulerData: SchedulerData,
        slotId: string,
        slotName: string,
        start: FullDateTime,
        end: FullDateTime
    ) => {
        let ev = createSchedulerEvent(start, end, slotId);
        if (schedulerData.viewType === 1) {
            const today = start.split(" ")[0];
            const ints = scheduleEvents.filter(e => e.start.split(" ")[0] === today && e.resourceId === slotId);
            const last = findLastInterval(ints, new Date(today), {
                start: currentEventInformation!.workTimes.get(today)!.start,
                end: currentEventInformation!.workTimes.get(today)!.end,
            });
            start = today + " " + last.start;
            end = today + " " + last.end;
            ev = createSchedulerEvent(start, end, slotId);
            if (ev.start === ev.end) {
                setIsOpenInfo(true);
                setInfoText("Не осталось свободных мест на этот день. Выберите другой.");
                return;
            }
            setWorktimeWeek(ev);
        }
        let canAddEvent = true;
        scheduleEvents
            .filter(event => event.resourceId === ev.resourceId)
            .forEach(elem => {
                if (hasOverlap(elem, ev)) {
                    canAddEvent = false;
                }
            });
        if (canAddEvent && schedulerData.viewType !== 1) {
            setIsOpen(true);
            setIsAdding(true);
            setEventAdding(ev);
        }
    };

    const deleteEvent = (event: ScheduleEvent) => {
        setIsOpen(true);
        setEventAdding(event);
        setIsAdding(false);
        setSelectedEvent(event);
    };

    const setEvent = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setSelectedFreeWorkTimeForAddNewWorkTime(event);
    };

    const editEvent = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setData(createData(schedulerData, event));
        setSelectedEvent(event);
        setEventAdding(event);
        eventItemClick(schedulerData, event);
        setIsEditing(true);
    };

    const signUpHandler = (interviewEvent: ScheduleInterviewEvent) => {
        const roleId = Number((document.querySelector("#root") as HTMLDivElement).dataset.roleId);
        dispatch(signUpVolunteerRequest(interviewEvent.workTimeId, roleId, interviewEvent.start, interviewEvent.end));
        setData(null);
    };

    const editingEvent = (eventEditing: ScheduleEvent, newEventStart: Time, newEventEnd: Time) => {
        const date = getDate(moment(eventEditing.start).format(DATE_FORMAT));
        const start = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            getHour(newEventStart),
            getMinutes(newEventStart)
        );
        const end = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            getHour(newEventEnd),
            getMinutes(newEventEnd)
        );
        dispatch(
            editRecruiterWorkTimeRequest(start, end, Number(eventEditing.resourceId), eventEditing.id, currentEvent.id)
        );
        eventEditing.bgColor = "#D9EDF7";
        setSelectedEvent(null);
        setIsEditing(false);
    };

    const eventSubmit = () => {
        setIsOpen(false);
        if (eventAdding) {
            if (isEditing) {
                dispatch(
                    editRecruiterWorkTimeRequest(
                        new Date(eventAdding.start),
                        new Date(eventAdding.end),
                        Number(eventAdding.resourceId),
                        eventAdding.id,
                        currentEvent.id
                    )
                );
                setIsEditing(false);
            } else if (isAdding) {
                dispatch(
                    addRecruiterWorkTimeRequest(
                        new Date(eventAdding.start),
                        new Date(eventAdding.end),
                        Number(eventAdding.resourceId),
                        currentEvent.id
                    )
                );
            } else {
                dispatch(
                    removeRecruiterWorkTimeRequest(Number(eventAdding.resourceId), eventAdding.id, currentEvent.id)
                );
            }
        }
    };

    const addWorkTimeFromFreeWorkTime = (ev: ScheduleEvent, newStart: Date, newEnd: Date) => {
        setSelectedFreeWorkTimeForAddNewWorkTime(null);
        dispatch(addRecruiterWorkTimeRequest(newStart, newEnd, Number(ev.resourceId), currentEvent.id));
    };

    const cancelSetWorkTimeFromFreeWorkTime = () => {
        setSelectedFreeWorkTimeForAddNewWorkTime(null);
    };

    const addWorkTimeFromWeek = (ev: ScheduleEvent, newStart: Date, newEnd: Date) => {
        setWorktimeWeek(null);
        dispatch(addRecruiterWorkTimeRequest(newStart, newEnd, Number(ev.resourceId), currentEvent.id));
    };

    const cancelSetWorkTimeFromWeek = () => {
        setWorktimeWeek(null);
    };

    const customPopover = (
        schedulerData: SchedulerData,
        eventItem: ScheduleEvent,
        title: string,
        start: moment.Moment,
        end: moment.Moment
    ) => {
        return (
            <Popover
                schedulerData={schedulerData}
                eventItem={eventItem}
                title={title}
                start={start}
                end={end}
                role={role}
                viewType={viewType}
                view={view}
                events={events}
                currentEvent={currentEvent}
                deleteEvent={deleteEvent}
                editEvent={editEvent}
                setEvent={setEvent}
            />
        );
    };

    if (getInformationPending || allEventsPending) {
        return <CircularProgress />;
    } else if (error) {
        return <Alert severity="error">{error}</Alert>;
    } else {
        return (
            <>
                <div className={s.table_container}>
                    <CalendarHeader
                        currentDate={new Date(currentDate)}
                        onChangeEvent={changeMainEvent}
                        onChangeView={changeView}
                    />
                    <div className={s.scheduler_container}>
                        <div>
                            <Scheduler
                                schedulerData={viewModel.data}
                                prevClick={prevClick}
                                nextClick={nextClick}
                                onSelectDate={selectDate}
                                onViewChange={viewChange}
                                eventItemClick={eventItemClick}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                newEvent={addingEvent}
                                eventItemPopoverTemplateResolver={customPopover}
                            />
                        </div>
                        {selectedEvent && selectData && (
                            <InformationContainer
                                data={selectData}
                                interview={selectedEvent as ScheduleInterviewEvent}
                                view={view}
                                role={role}
                                isEditing={isEditing}
                                eventEditing={eventAdding!}
                                onEditEvent={editingEvent}
                                onSignUp={signUpHandler}
                            />
                        )}
                    </div>
                </div>
                <WaitPopup isOpen={changePending} />
                <PopupError
                    isOpen={Boolean(changeError)}
                    title={"Что-то пошло не так..."}
                    errorCode={changeError}
                    onCancel={() => dispatch(closeErrorWindowAction())}
                />
                <InfoPopup
                    isOpen={isOpenInfo}
                    title={"Внимание!"}
                    text={infoText}
                    onCancel={() => setIsOpenInfo(false)}
                />
                {selectedFreeWorkTimeForAddNewWorkTime && (
                    <AddWorkTimePopup
                        title="Назначить рабочее время"
                        isOpen={selectedFreeWorkTimeForAddNewWorkTime !== null}
                        selectedFreeWorkTime={selectedFreeWorkTimeForAddNewWorkTime}
                        min={currentInformation!.start}
                        max={currentInformation!.end}
                        onSubmit={addWorkTimeFromFreeWorkTime}
                        onCancel={cancelSetWorkTimeFromFreeWorkTime}
                    />
                )}
                {worktimeWeek && (
                    <AddWorkTimePopup
                        title="Назначить рабочее время"
                        isOpen={worktimeWeek !== null}
                        selectedFreeWorkTime={worktimeWeek}
                        min={getHour(getTime(worktimeWeek.start))}
                        max={getHour(getTime(worktimeWeek.end))}
                        onSubmit={addWorkTimeFromWeek}
                        onCancel={cancelSetWorkTimeFromWeek}
                    />
                )}
                <PopUp
                    isOpen={isOpen}
                    event={eventAdding!}
                    isAdding={isAdding}
                    recruiterName={resources.filter(r => r.id === eventAdding?.resourceId)[0]?.name}
                    onEventSubmit={eventSubmit}
                    onCancel={() => setIsOpen(false)}
                />
            </>
        );
    }
};
export default widthDragDropContext(memo(ReactBigCalendar));
