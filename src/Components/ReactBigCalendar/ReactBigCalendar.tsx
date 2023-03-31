import { CSSProperties, FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import Scheduler, { Resource, SchedulerData } from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import "moment/locale/ru";
import s from "./ReactBigCalendar.module.css";
import CalendarHeader from "./Components/CalendarHeader/CalendarHeader";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import InformationContainer from "./Components/InformationContainer/InformationContainer";
import { RecruiterInfo } from "../../Types/RecruiterInfo";
import { getAvailableTimes, getFreeDates } from "../../Helpers/GetAvailableTimes";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { changeCalendarViewTypeAction } from "../../Redux/Actions/ChangeCalendarViewTypeAction";
import PopUp from "../../UiKit/Popup/AlertDialog/AlertDialog";
import { createSchedulerEvent, createResourcesAndEvents } from "../../Helpers/CreateResourcesAndEvents";
import { resizeAction } from "../../Redux/Actions/ResizeAction";
import Popover from "./Components/Popover/Popover";
import { hasOverlap } from "../../Helpers/HasOverlap";
import PopupError from "../../UiKit/Popup/ErrorPopup/ErrorPopup";
import InfoPopup from "../../UiKit/Popup/InfoPopup/InfoPopup";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
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
import {
    DATE_FORMAT,
    DATE_TIME_FORMAT,
    EVENT_BG_DEFAULT,
    EVENT_BG_GRAY,
    EVENT_BG_SELECTED,
    widthDragDropContext,
} from "../../Constants";
import { getInformationRequest } from "../../Redux/Actions/GetInformationActions";
import { getStartAndEndOfWeek } from "../../Helpers/GetStartAndEndOfWeek";
import { changeCurrentDateAction } from "../../Redux/Actions/ChangeCurrentDateActions";
import { getEventsRequest } from "../../Redux/Actions/EventsActions/GetEventsActions";
import { ScheduleInterviewEvent } from "../../Types/ScheduleInterviewEvent";
import { signUpVolunteerRequest } from "../../Redux/Actions/SignUpVolunteerActions";
import { ViewTypeWorktime } from "../../Types/ViewTypeWorktime";
import { setViewAction } from "../../Redux/Actions/SetActions/SetViewAction";
import AddWorkTimePopup from "../../UiKit/Popup/AddWorkTimePopup/AddWorkTimePopup";
import { findLastInterval } from "../../Helpers/FindLastInterval";
import { isInterviewEvent, isScheduleEvent } from "../../Helpers/instanceHelpers";
import CellHeaderTemplate from "./Components/CellHeaderTemplate/CellHeaderTemplate";
import { createTitle } from "../../Helpers/CreateTitle";
import { Recruiter } from "../../Types/Recruiter";
import ChangeRecruiterForInterviewPopup from "./Components/ChangeRecruiterForInterviewPopup/ChangeRecruiterForInterviewPopup";
import { changeRecruiterForInterviewRequest } from "../../Redux/Actions/ChangeRecruiterForInterviewActions";
import ModalForm from "./Components/ModalForm/ModalForm";
import { Interview } from "../../Types/Interview";
import { closeSnackBar } from "../../Redux/Reducers/SnackBarReducer/Actions";
import { setInterviewRoleAction } from "../../Redux/Actions/SetActions/SetInterviewRoleAction";
import ReplaceInterviewTimeModal from "./Components/ReplaceInterviewTimeModal/ReplaceInterviewTimeModal";
import { replaceInterviewTimeRequest } from "../../Redux/Actions/InterviewTimeActions/ReplaceInterviewTimeActions";
import { setSelectedEvent } from "../../Redux/Actions/SetActions/SetSelectedEvent";
import { setSelectedData } from "../../Redux/Actions/SetActions/SetSelectedData";

moment.locale("ru-ru");

const ReactBigCalendar: FC = () => {
    const { snackBarOpen } = useAppSelector(state => state.snackBarState);
    const { getInformationPending, allEventsPending, changePending, state, error, changeError } = useAppSelector(
        state => state.workDayState
    );
    const calendarViewType = state.calendarViewType;
    const recruiters = state.recruiters;
    const behaviours = state.behaviours;

    const selectedEvent = state.selectedEvent;
    const selectedData = state.selectedData;
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
    const isWidget = state.isWidget;
    const [resources, scheduleEvents, interviews] = useMemo(
        () =>
            createResourcesAndEvents(
                recruiters,
                currentEvent.id,
                role,
                state.isWidget,
                viewType,
                currentInterviewDuration,
                selectedEvent?.id
            ),
        [recruiters, currentEvent, viewType, selectedEvent?.id]
    );
    const dispatch = useAppDispatch();
    const events = state.events;
    const interviewRole = state.interviewRole;
    const userInfo = state.userInfo;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [isOpenWidgetModal, setIsOpenWidgetModal] = useState<boolean>(false);
    const [infoText, setInfoText] = useState<string>("");
    const [selectedFreeWorkTimeForAddNewWorkTime, setSelectedFreeWorkTimeForAddNewWorkTime] =
        useState<ScheduleEvent | null>(null);
    const [changeRecruiterForInterviewOpen, setChangeRecruiterForInterviewOpen] = useState<boolean>(false);
    const [changeInterviewTimeModalOpen, setChangeInterviewTimeModalOpen] = useState<boolean>(false);
    const [availableRecruitersForInterview, setAvailableRecruitersForInterview] = useState<Recruiter[]>([]);
    const [availableRecruiterWorkTimesForChangeInterview, setavailableRecruiterWorkTimesForChangeInterview] = useState<
        ScheduleEvent[]
    >([]);
    const [worktimeWeek, setWorktimeWeek] = useState<ScheduleEvent | null>(null);
    const [eventAdding, setEventAdding] = useState<ScheduleEvent | null>(null);
    const [isAdding, setIsAdding] = useState<boolean>(true);
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
        if (di && role !== "admin" && role !== "coord" && role !== "recruiter" && currentDate <= a) {
            di.style.display = "none";
        } else if (di) {
            di.style.display = "inline";
        }
    };

    useEffect(() => {
        dispatch(getEventsRequest(new Date(currentDate)));
        removePrevClick();
    }, []);

    useEffect(() => {
        dispatch(setInterviewRoleAction(document.getElementById("root")?.getAttribute("data-role-name") ?? ""));
    }, [isOpenWidgetModal]);

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

    const unselectEvent = () => {
        if (selectedEvent) {
            selectedEvent.bgColor = EVENT_BG_DEFAULT;
            dispatch(setSelectedEvent(null));
            dispatch(setSelectedData(null));
        }
    };

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
        unselectEvent();
        dispatch(setViewAction(view));
    };

    const changeMainEvent = () => {
        unselectEvent();
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
        unselectEvent();
        dispatch(changeCalendarViewTypeAction(view.viewType));
    };

    const eventItemClick = (schedulerData: SchedulerData, event: ScheduleEvent | ScheduleInterviewEvent) => {
        if (event.bgColor === EVENT_BG_GRAY || (event as ScheduleEvent).isFree) return;
        dispatch(setSelectedData(createData(schedulerData, event)));
        event.bgColor = EVENT_BG_SELECTED;
        if (selectedEvent && event !== selectedEvent) selectedEvent.bgColor = EVENT_BG_DEFAULT;
        setIsEditing(false);
        dispatch(setSelectedEvent(event));
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
        dispatch(setSelectedEvent(event));
    };

    const setEvent = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setSelectedFreeWorkTimeForAddNewWorkTime(event);
    };

    const editEvent = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        dispatch(setSelectedData(createData(schedulerData, event)));
        dispatch(setSelectedEvent(event));
        setEventAdding(event);
        eventItemClick(schedulerData, event);
        setIsEditing(true);
    };

    const signUpHandler = (interviewEvent: ScheduleInterviewEvent, info: Interview) => {
        const roleId = Number((document.querySelector("#root") as HTMLDivElement).dataset.roleId);
        dispatch(
            signUpVolunteerRequest({
                currentInterviewId: interviewEvent.id,
                workTimeId: interviewEvent.workTimeId,
                roleId,
                start: interviewEvent.start,
                end: interviewEvent.end,
                phone: info.phone,
                contacts: info.contacts,
            })
        );
        setIsOpenWidgetModal(false);
        unselectEvent();
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
        eventEditing.bgColor = EVENT_BG_DEFAULT;
        dispatch(setSelectedEvent(null));
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
        const toDelete: ScheduleEvent[] = [];
        const even = createSchedulerEvent(
            moment(newStart).format(DATE_TIME_FORMAT),
            moment(newEnd).format(DATE_TIME_FORMAT),
            ev.resourceId
        );
        scheduleEvents
            .filter(event => event.resourceId === even.resourceId)
            .forEach(elem => {
                if (hasOverlap(elem, even)) {
                    toDelete.push(elem);
                }
            });

        if (toDelete.length) {
            const evs = toDelete.map(e => getTime(e.start) + " - " + getTime(e.end));
            setInfoText(`Пересечение со сменами: ${evs.join(", ")}`);
            setIsOpenInfo(true);
        } else {
            setSelectedFreeWorkTimeForAddNewWorkTime(null);
            dispatch(addRecruiterWorkTimeRequest(newStart, newEnd, Number(ev.resourceId), currentEvent.id));
        }
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

    const changeInterviewRecruiterHandler = (event: ScheduleInterviewEvent) => {
        const availableWorkTimes: ScheduleEvent[] = [];
        recruiters.forEach(r => {
            if (r.id !== Number(event.resourceId)) {
                scheduleEvents.forEach(e => {
                    if (
                        r.id === Number(e.resourceId) &&
                        getDate(e.start).getTime() === getDate(event.start).getTime() &&
                        getAvailableTimes(e, e.interviews, currentInterviewDuration).some(
                            t => t === createTitle(event.start, event.end)
                        )
                    ) {
                        availableWorkTimes.push(e);
                    }
                });
            }
        });
        const resultRecruiters = recruiters.filter(r => {
            return (
                r.id !== Number(event.resourceId) &&
                scheduleEvents.some(e => {
                    return (
                        r.id === Number(e.resourceId) &&
                        getDate(e.start).getTime() === getDate(event.start).getTime() &&
                        getAvailableTimes(e, e.interviews, currentInterviewDuration).some(
                            t => t === createTitle(event.start, event.end)
                        )
                    );
                })
            );
        });
        dispatch(setSelectedEvent(event));
        setAvailableRecruitersForInterview(resultRecruiters);
        setavailableRecruiterWorkTimesForChangeInterview(availableWorkTimes);
        setChangeRecruiterForInterviewOpen(true);
    };

    const cancelChangeRecruiterForInterviewHandler = () => {
        setChangeRecruiterForInterviewOpen(false);
        setAvailableRecruitersForInterview([]);
        dispatch(setSelectedEvent(null));
    };

    const submitChangeRecruiterForInterviewHandler = (recruiter: Recruiter) => {
        setChangeRecruiterForInterviewOpen(false);
        dispatch(setSelectedEvent(null));
        const index = availableRecruiterWorkTimesForChangeInterview.findIndex(
            e => Number(e.resourceId) === recruiter.id
        );
        const workTime = availableRecruiterWorkTimesForChangeInterview[index];
        const oldWorkTimeIndex = scheduleEvents.findIndex(e => e.interviews.some(i => i.id === selectedEvent!.id));
        const oldWorkTimeId = scheduleEvents[oldWorkTimeIndex].id;
        const oldRecruiterId = Number(scheduleEvents[oldWorkTimeIndex].resourceId);
        dispatch(
            changeRecruiterForInterviewRequest({
                workTimeId: workTime.id,
                interviewId: selectedEvent!.id,
                newRecruiterId: recruiter.id,
                oldWorkTimeId,
                oldRecruiterId,
            })
        );
    };

    const replaceInterviewTimeHandler = useCallback(
        (interviewId: number, workTimeId: number, newInterviewTime: FullDateTime) => {
            dispatch(replaceInterviewTimeRequest(interviewId, workTimeId, newInterviewTime));
            setChangeInterviewTimeModalOpen(false);
        },
        []
    );

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
                onChangeInterviewRecruiter={changeInterviewRecruiterHandler}
            />
        );
    };

    const customHeader = (schedulerData: SchedulerData, item: any, formattedDateItems: any, style: CSSProperties) => {
        return (
            <CellHeaderTemplate
                schedulerData={schedulerData}
                item={item}
                formattedDateItems={formattedDateItems}
                style={style}
            />
        );
    };

    const closeErrorPopup = () => {
        dispatch(closeErrorWindowAction());
        if (isWidget) {
            const [start, end] = getStartAndEndOfWeek(new Date(currentDate));
            dispatch(getInformationRequest(start, end));
        }
    };

    const closeSnackBarHandler = () => {
        dispatch(closeSnackBar());
    };

    if (getInformationPending || allEventsPending) {
        return <CircularProgress />;
    } else if (error) {
        return <Alert severity="error">{error}</Alert>;
    } else {
        return (
            <>
                <div className={`${isWidget ? "widget" : ""}`}>
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
                                nonAgendaCellHeaderTemplateResolver={customHeader}
                            />
                        </div>
                        {selectedEvent && selectedData && (
                            <InformationContainer
                                data={selectedData}
                                interview={selectedEvent as ScheduleInterviewEvent}
                                view={view}
                                role={role}
                                isEditing={isEditing}
                                eventEditing={eventAdding!}
                                onEditEvent={editingEvent}
                                onSignUp={() => setIsOpenWidgetModal(true)}
                                onClickChangeInterviewTime={() => setChangeInterviewTimeModalOpen(true)}
                            />
                        )}
                    </div>
                </div>
                <WaitPopup isOpen={changePending} />
                <PopupError
                    isOpen={Boolean(changeError)}
                    title={"Что-то пошло не так..."}
                    text={changeError}
                    onCancel={closeErrorPopup}
                />
                <InfoPopup
                    isOpen={isOpenInfo}
                    title={"Внимание!"}
                    text={infoText}
                    onCancel={() => setIsOpenInfo(false)}
                />
                {isWidget && userInfo && (
                    <ModalForm
                        isOpen={isOpenWidgetModal}
                        interview={selectedEvent as ScheduleInterviewEvent}
                        userInfo={userInfo}
                        interviewRole={interviewRole}
                        onSubmitSignUp={signUpHandler}
                        onCancel={() => setIsOpenWidgetModal(false)}
                    />
                )}
                {!isWidget &&
                    selectedEvent &&
                    isInterviewEvent(selectedEvent) &&
                    selectedData &&
                    changeInterviewTimeModalOpen && (
                        <ReplaceInterviewTimeModal
                            isOpen={changeInterviewTimeModalOpen}
                            recruiterInfo={selectedData}
                            interview={selectedEvent}
                            availableTimes={getFreeDates(
                                recruiters.filter(r => r.workedTimes?.some(w => w.id === selectedEvent.workTimeId))[0],
                                currentInterviewDuration,
                                currentEvent.id
                            )}
                            onSubmitReplaceInterviewTime={replaceInterviewTimeHandler}
                            onCancel={() => setChangeInterviewTimeModalOpen(false)}
                        />
                    )}
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
                <ChangeRecruiterForInterviewPopup
                    isOpen={changeRecruiterForInterviewOpen}
                    availableRecruiters={availableRecruitersForInterview}
                    onSubmit={submitChangeRecruiterForInterviewHandler}
                    onCancel={cancelChangeRecruiterForInterviewHandler}
                />
                <PopUp
                    isOpen={isOpen}
                    event={eventAdding!}
                    isAdding={isAdding}
                    recruiterName={resources.filter(r => r.id === eventAdding?.resourceId)[0]?.name}
                    onEventSubmit={eventSubmit}
                    onCancel={() => setIsOpen(false)}
                />
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={snackBarOpen}
                    autoHideDuration={3000}
                    onClose={closeSnackBarHandler}
                    message="Запись была выполнена успешно!"
                >
                    <Alert
                        onClose={closeSnackBarHandler}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Запись была выполнена успешно!
                    </Alert>
                </Snackbar>
            </>
        );
    }
};
export default widthDragDropContext(memo(ReactBigCalendar));
