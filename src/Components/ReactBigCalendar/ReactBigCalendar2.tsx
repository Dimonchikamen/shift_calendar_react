import { FC, useEffect, useMemo, useState } from "react";
import Scheduler, { Resource, SchedulerData } from "react-big-scheduler";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import "moment/locale/ru";
import s from "./ReactBigCalendar.module.css";
import CalendarHeader from "./Components/CalendarHeader/CalendarHeader";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import InformationContainer from "./Components/InformationContainer/InformationContainer";
import { RequiterInfo } from "../../Types/RequiterInfo";
import { getAvailableTimes } from "../../Helpers/GetAvailableTimes";
import { createTitle } from "../../Helpers/CreateTitle";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { changeViewTypeAction } from "../../Redux/Actions/ChangeViewTypeAction";
import PopUp from "../../UiKit/Popup/AlertDialog/AlertDialog";
import {
    addRecruiterWorkTimeRequest,
    editRecruiterWorkTimeRequest,
    removeRecruiterWorkTimeRequest,
} from "../../Redux/Actions/RecruitersActions/RecruiterWorkTimesActions";
import { createResourcesAndEvents } from "../../Helpers/CreateResourcesAndEvents";
import { resizeAction } from "../../Redux/Actions/ResizeAction";
import Popover from "./Components/Popover/Popover";
import { hasOverlap } from "../../Helpers/HasOverlap";
import PopupError from "../../UiKit/Popup/ErrorDialog/ErrorDialog";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import { getStartDayRequest } from "../../Redux/Actions/WorkDayActions/GetStartDayActions";
import { getEndDayRequest } from "../../Redux/Actions/WorkDayActions/GetEndDayActions";
import { getInterviewTimeRequest } from "../../Redux/Actions/InterviewTimeActions/GetInterviewTimeActions";
import { getEventsRequest } from "../../Redux/Actions/EventsActions/GetEventsActions";
import { closeErrorWindowAction } from "../../Redux/Actions/CloseErrorWindowAction";
import { filterEvents } from "../../Helpers/Filters";
import { getRecruitersRequest } from "../../Redux/Actions/RecruitersActions/GetRecruitersActions";

export const widthDragDropContext = DragDropContext(HTML5Backend);

export const DATE_FORMAT = "YYYY-MM-DD H:mm";
moment.locale("ru-ru");

const ReactBigCalendar: FC = () => {
    // const recruiters = useAppSelector(state => state.main.recruiters);
    const {
        rolePending,
        allEventsPending,
        dayStartPending,
        dayEndPending,
        interviewTimePending,
        recruitersPending,
        changePending,
        state,
        error,
        changeError,
    } = useAppSelector(state => state.workDayState);
    const viewType = state.viewType;
    const recruiters = state.currentRecruiters;
    const config = state.config;
    const behaviours = state.behaviours;
    const interviewDuration = config.minuteStep;
    const currentEvent = state.currentEvent;
    const [resources, scheduleEvents, interviews] = useMemo(
        () => createResourcesAndEvents(recruiters),
        [recruiters, currentEvent]
    ); //{
    //     const res = createResourcesAndEvents(recruiters);
    //     res[1] = filterEvents(res[1], currentEvent);
    //     return res;
    // }, [recruiters, currentEvent]);
    const dispatch = useAppDispatch();
    const [view, setCalendarView] = useState<"worktime" | "interview">("worktime");

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [eventAdding, setEventAdding] = useState<ScheduleEvent | null>(null);
    const [isAdding, setIsAdding] = useState<boolean>(true);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [selectData, setData] = useState<RequiterInfo | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<string>(moment().format(DATE_FORMAT));
    const [viewModel, setView] = useState<{ data: SchedulerData }>(() => {
        moment.locale("ru");
        const data = new SchedulerData(currentDate, viewType, false, false, config, behaviours);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.setLocaleMoment(moment);
        data.setResources(resources);
        data.setEvents(view === "interview" ? interviews : scheduleEvents);
        return { data };
    });

    useEffect(() => {
        dispatch(getRecruitersRequest());
        dispatch(getStartDayRequest());
        dispatch(getEndDayRequest());
        dispatch(getInterviewTimeRequest());
        dispatch(getEventsRequest());
    }, []);

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
            const data = new SchedulerData(currentDate, viewType, false, false, config, behaviours);
            data.setResources(resources);
            data.setEvents(view === "interview" ? interviews : scheduleEvents);
            return { data };
        });
    }, [config, resources, scheduleEvents, viewType, behaviours]);

    const createData = (schedulerData: SchedulerData, event: ScheduleEvent): RequiterInfo => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const recruiter = schedulerData.resources.find((r: Resource) => r.id === event.resourceId);
        const availableInterviewTimes = getAvailableTimes(event, event.interviews, interviewDuration!);
        return {
            name: recruiter.name,
            workTimeTitle: event.title,
            availableInterviewTimes,
            interviews: event.interviews,
        };
    };

    const setSchedulerData = (schedulerData: SchedulerData) => {
        schedulerData.setResources(resources);
        schedulerData.setEvents(view === "interview" ? interviews : scheduleEvents);
        setCurrentDate(schedulerData.startDate);
        setView({ data: schedulerData });
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
        dispatch(changeViewTypeAction(view.viewType));
    };

    const eventItemClick = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setData(createData(schedulerData, event));
        event.bgColor = "#1890ff";
        if (selectedEvent) selectedEvent.bgColor = "#D9EDF7";
        setIsEditing(false);
        setSelectedEvent(event);
    };

    const addingEvent = (
        schedulerData: SchedulerData,
        slotId: string,
        slotName: string,
        start: string,
        end: string
    ) => {
        let canAddEvent = true;
        const ev = {
            id: Math.floor(Math.random() * 1000),
            start: start.substring(0, start.length - 3),
            end: end.substring(0, end.length - 3),
            resourceId: slotId,
            title: createTitle(start.substring(0, start.length - 3), end.substring(0, end.length - 3)),
            resizable: false,
            bgColor: "#D9EDF7",
            interviews: [],
        };
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

    const editEvent = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setData(createData(schedulerData, event));
        setSelectedEvent(event);
        setEventAdding(event);
        eventItemClick(schedulerData, event);
        setIsEditing(true);
    };

    const editingEvent = (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => {
        const newEvent: ScheduleEvent = JSON.parse(JSON.stringify(eventEditing));
        const formatTime = (time: string) => {
            return time.length < 5 ? "0" + time : time;
        };
        newEvent.start = newEvent.start.slice(0, 11) + formatTime(dayStart);
        newEvent.end = newEvent.end.slice(0, 11) + formatTime(dayEnd);
        newEvent.title = createTitle(dayStart, dayEnd);
        //dispatch(editRecruiterWorkTimeRequest(newEvent));
        setSelectedEvent(null);
        setIsEditing(false);
    };

    const eventSubmit = () => {
        setIsOpen(false);
        if (isEditing) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(editRecruiterEventAction(eventAdding));
            setIsEditing(false);
            return;
        }
        if (eventAdding) {
            if (isAdding) {
                //dispatch(addRecruiterWorkTimeRequest(eventAdding));
            } else {
                // dispatch(removeRecruiterEventAction(eventAdding));
            }
        }
    };

    const customPopover = (
        schedulerData: SchedulerData,
        eventItem: ScheduleEvent,
        title: string,
        start: moment.Moment,
        end: moment.Moment,
        statusColor: string
    ) => {
        return (
            <Popover
                schedulerData={schedulerData}
                eventItem={eventItem}
                title={title}
                start={start}
                end={end}
                deleteEvent={deleteEvent}
                editEvent={editEvent}
            />
        );
    };

    if (
        rolePending ||
        allEventsPending ||
        dayStartPending ||
        dayEndPending ||
        interviewTimePending ||
        recruitersPending
    ) {
        return <CircularProgress />;
    } else if (error) {
        return <Alert severity="error">Возникла ошибка при получении запроса с сервера.</Alert>;
    } else {
        return (
            <div className={s.table_container}>
                <Backdrop
                    sx={{ zIndex: 999 }}
                    open={changePending}
                >
                    <div className={s.loader_container}>
                        <CircularProgress sx={{ margin: "8px 8px 0 8px" }} />
                    </div>
                </Backdrop>
                <PopupError
                    isOpen={Boolean(changeError)}
                    title={"Что-то пошло не так..."}
                    errorCode={502}
                    onCancel={() => dispatch(closeErrorWindowAction())}
                />
                <CalendarHeader />
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
                            isEditing={isEditing}
                            view={view}
                            eventEditing={eventAdding!}
                            onEditEvent={editingEvent}
                        />
                    )}
                </div>
                <PopUp
                    isOpen={isOpen}
                    event={eventAdding!}
                    isAdding={isAdding}
                    recruiterName={resources.filter(r => r.id === eventAdding?.resourceId)[0]?.name}
                    onEventSubmit={eventSubmit}
                    onCancel={() => setIsOpen(false)}
                />
            </div>
        );
    }
};
export default widthDragDropContext(ReactBigCalendar);
