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
import { CircularProgress } from "@mui/material";
import { closeErrorWindowAction } from "../../Redux/Actions/CloseErrorWindowAction";
import { FullDateTime } from "../../Types/FullDateTime";
import {
    addRecruiterWorkTimeRequest,
    editRecruiterWorkTimeRequest,
    removeRecruiterWorkTimeRequest,
} from "../../Redux/Actions/RecruitersActions/RecruiterWorkTimesActions";
import { Time } from "../../Types/Time";
import { getDate, getHour, getMinutes } from "../../Helpers/DateTimeHelpers";
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
        () => createResourcesAndEvents(recruiters, currentEvent.id, role, state.isWidget, currentInterviewDuration),
        [recruiters, currentEvent]
    );
    const dispatch = useAppDispatch();
    const events = state.events;

    const [isOpen, setIsOpen] = useState<boolean>(false);
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
        setSelectedEvent(null);
        dispatch(setViewAction(view));
    };

    const changeMainEvent = () => {
        setSelectedEvent(null);
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
        //if ((role !== "admin" && role !== "coord") || view === "interview") return;
        let canAddEvent = true;
        const ev = createSchedulerEvent(start, end, slotId);
        scheduleEvents
            .filter(event => event.resourceId === ev.resourceId)
            .forEach(elem => {
                if (hasOverlap(elem, ev)) {
                    canAddEvent = false;
                }
            });
        if (canAddEvent) {
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
        event.isFree = false;
        event.bgColor = "#D9EDF7";
        eventItemClick(schedulerData, event);
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
                    errorCode={error}
                    onCancel={() => dispatch(closeErrorWindowAction())}
                />
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
