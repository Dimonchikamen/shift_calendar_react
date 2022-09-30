import { FC, memo, useEffect, useMemo, useState } from "react";
import Scheduler, { Resource, SchedulerData } from "react-big-scheduler";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import "moment/locale/ru";
import s from "./ReactBigCalendar.module.css";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import InformationContainer from "./Components/InformationContainer/InformationContainer";
import { RequiterInfo } from "../../Types/RequiterInfo";
import { getAvailableTimes } from "../../Helpers/GetAvailableTimes";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { changeViewTypeAction } from "../../Redux/Actions/ChangeViewTypeAction";
import PopUp from "../../UiKit/Popup/AlertDialog/AlertDialog";
import { createResourcesAndEvents } from "../../Helpers/CreateResourcesAndEvents";
import { resizeAction } from "../../Redux/Actions/ResizeAction";
import Popover from "./Components/Popover/Popover";
import PopupError from "../../UiKit/Popup/ErrorPopup/ErrorPopup";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Alert from "@mui/material/Alert";
import { getEventsRequest } from "../../Redux/Actions/EventsActions/GetEventsActions";
import { closeErrorWindowAction } from "../../Redux/Actions/CloseErrorWindowAction";
import { getRecruitersRequest } from "../../Redux/Actions/RecruitersActions/GetRecruitersActions";
import { FullDateTime } from "../../Types/FullDateTime";
import {
    addRecruiterWorkTimeRequest,
    editRecruiterWorkTimeRequest,
    removeRecruiterWorkTimeRequest,
} from "../../Redux/Actions/RecruitersActions/RecruiterWorkTimesActions";
import { Time } from "../../Types/Time";
import { getDate, getHour, getMinutes } from "../../Helpers/DateTimeHelpers";
import WaitPopup from "../../UiKit/Popup/WaitPopup/WaitPopup";

export const widthDragDropContext = DragDropContext(HTML5Backend);

export const DATE_TIME_FORMAT = "YYYY-MM-DD H:mm";
export const DATE_FORMAT = "YYYY-MM-DD";

moment.locale("ru-ru");

const ReactBigCalendar: FC = () => {
    const {
        rolePending,
        allEventsPending,
        workTimePending,
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
    const currentEvent = state.currentEvent;
    const currentInterviewTime = state.currentInterviewTime === "" ? 30 : state.currentInterviewTime;

    const role = state.role;
    const [resources, interviews] = useMemo(() => createResourcesAndEvents(recruiters), [recruiters, currentEvent]);
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [eventAdding, setEventAdding] = useState<ScheduleEvent | null>(null);
    const [isAdding, setIsAdding] = useState<boolean>(true);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [selectData, setData] = useState<RequiterInfo | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<FullDateTime>(moment().format(DATE_TIME_FORMAT));
    const [viewModel, setView] = useState<{ data: SchedulerData }>(() => {
        moment.locale("ru");
        const data = new SchedulerData(currentDate, viewType, false, false, config, behaviours);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.setLocaleMoment(moment);
        data.setResources(resources);
        data.setEvents(interviews);
        return { data };
    });

    useEffect(() => {
        dispatch(getEventsRequest());
        dispatch(getRecruitersRequest());
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
            data.setEvents(interviews);
            return { data };
        });
    }, [config, resources, interviews, viewType, behaviours]);

    const createData = (schedulerData: SchedulerData, event: ScheduleEvent): RequiterInfo => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const recruiter = schedulerData.resources.find((r: Resource) => r.id === event.resourceId);
        const availableInterviewTimes = getAvailableTimes(event, event.interviews, currentInterviewTime);
        return {
            name: recruiter.name,
            workTimeTitle: event.title,
            availableInterviewTimes,
            interviews: event.interviews,
        };
    };

    const setSchedulerData = (schedulerData: SchedulerData) => {
        schedulerData.setResources(resources);
        schedulerData.setEvents(interviews);
        setCurrentDate(schedulerData.startDate);
        setView({ data: schedulerData });
    };

    const prevClick = (schedulerData: SchedulerData) => {
        schedulerData.prev();
        setSchedulerData(schedulerData);
        // dispatch(getWorkDayRequest(new Date(schedulerData.startDate)));
    };

    const nextClick = (schedulerData: SchedulerData) => {
        schedulerData.next();
        setSchedulerData(schedulerData);
        // dispatch(getWorkDayRequest(new Date(schedulerData.startDate)));
    };

    const selectDate = (schedulerData: SchedulerData, date: string) => {
        schedulerData.setDate(date);
        setSchedulerData(schedulerData);
        //dispatch(getWorkDayRequest(new Date(date)));
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

    const editingEvent = (eventEditing: ScheduleEvent, newEventStart: Time, newEventEnd: Time) => {
        const date = getDate(currentDate);
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
        dispatch(editRecruiterWorkTimeRequest(start, end, Number(eventEditing.resourceId), eventEditing.id));
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
                        eventAdding.id
                    )
                );
                setIsEditing(false);
            } else if (isAdding) {
                dispatch(
                    addRecruiterWorkTimeRequest(
                        new Date(eventAdding.start),
                        new Date(eventAdding.end),
                        Number(eventAdding.resourceId),
                        currentEvent
                    )
                );
            } else {
                dispatch(removeRecruiterWorkTimeRequest(Number(eventAdding.resourceId), eventAdding.id));
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
                deleteEvent={deleteEvent}
                editEvent={editEvent}
            />
        );
    };

    if (rolePending || allEventsPending || workTimePending || interviewTimePending || recruitersPending) {
        return <CircularProgress />;
    } else if (error) {
        return <Alert severity="error">Возникла ошибка при получении запроса с сервера.</Alert>;
    } else {
        return (
            <>
                <div className={s.table_container}>
                    <div className={s.scheduler_container}>
                        <div>
                            <Scheduler
                                schedulerData={viewModel.data}
                                prevClick={prevClick}
                                nextClick={nextClick}
                                onSelectDate={selectDate}
                                onViewChange={viewChange}
                                eventItemClick={eventItemClick}
                                eventItemPopoverTemplateResolver={customPopover}
                            />
                        </div>
                        {selectedEvent && selectData && (
                            <InformationContainer
                                data={selectData}
                                isEditing={isEditing}
                                eventEditing={eventAdding!}
                                onEditEvent={editingEvent}
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
