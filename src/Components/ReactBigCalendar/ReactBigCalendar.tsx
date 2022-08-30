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
import PopUp from "./Components/PopUp/PopUp";
import {
    addRecruiterEventAction,
    editRecruiterEventAction,
    removeRecruiterEventAction,
} from "../../Redux/Actions/RecruiterEventsActions";
import { createResourcesAndEvents } from "../../Helpers/CreateResourcesAndEvents";
import { resizeAction } from "../../Redux/Actions/ResizeAction";
import Popover from "./Components/Popover/Popover";

export const widthDragDropContext = DragDropContext(HTML5Backend);

export const DATE_FORMAT = "YYYY-MM-DD H:mm";
moment.locale("ru-ru");

const hasOverlap = (ev: ScheduleEvent, elem: ScheduleEvent) => {
    if (elem.start.slice(0, 10) === ev.start.slice(0, 10)) {
        if (
            (ev.start < elem.end && ev.start > elem.start) ||
            (ev.end < elem.end && ev.end > elem.start) ||
            (ev.start == elem.start && ev.end == elem.end) ||
            (ev.start <= elem.start && ev.end >= elem.end)
        ) {
            if (ev.id != elem.id) {
                return true;
            }
        }
    }
    return false;
};

const ReactBigCalendar: FC = () => {
    const recruiters = useAppSelector(state => state.main.recruiters);
    const [resources, events] = useMemo(() => createResourcesAndEvents(recruiters), [recruiters]);
    const viewType = useAppSelector(state => state.main.viewType);
    const config = useAppSelector(state => state.main.config);
    const interviewDuration = config.minuteStep;
    const behaviours = useAppSelector(state => state.main.behaviours);
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [eventAdding, setEventAdding] = useState<ScheduleEvent>();
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
        data.setEvents(events);
        return { data };
    });

    const forceResize = () => {
        dispatch(resizeAction());
    };

    useEffect(() => {
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
            data.setEvents(events);
            return { data };
        });
    }, [config, resources, events, viewType, behaviours]);

    const createData = (schedulerData: SchedulerData, event: ScheduleEvent): RequiterInfo => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const recruiter = schedulerData.resources.find((r: Resource) => r.id === event.resourceId);
        const availableInterviewTimes = getAvailableTimes(event, event.interviews, interviewDuration);
        return {
            name: recruiter.name,
            workTimeTitle: event.title,
            availableInterviewTimes,
            interviews: event.interviews,
        };
    };

    const setSchedulerData = (schedulerData: SchedulerData) => {
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);
        setCurrentDate(schedulerData.startDate)
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
        setIsEditing(false)
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
        events
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
        setSelectedEvent(null)
    };

    const editEvent = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setData(createData(schedulerData, event));
        setSelectedEvent(event);
        setIsEditing(true);
    };

    const editingEvent = (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => {
        const newEvent = JSON.parse(JSON.stringify(eventEditing));
        const formatTime = (time: string) => {
            return time.length < 5 ? "0" + time : time;
        };
        newEvent.start = newEvent.start.slice(0, 11) + formatTime(dayStart);
        newEvent.end = newEvent.end.slice(0, 11) + formatTime(dayEnd);
        newEvent.title = dayStart + " - " + dayEnd;
        dispatch(editRecruiterEventAction(newEvent));
        setSelectedEvent(null);
        setIsEditing(false);
    };

    const eventSubmit = (submit: boolean, isAdding: boolean) => {
        setIsOpen(false);
        if (submit && eventAdding) {
            if (isAdding) {
                dispatch(addRecruiterEventAction(eventAdding));
            } else {
                dispatch(removeRecruiterEventAction(eventAdding));
            }
        }
    };

    const customPopover = (
        schedulerData: SchedulerData,
        eventItem: ScheduleEvent,
        title: string,
        start: any,
        end: any,
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

    return (
        <div className={s.table_container}>
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
                        eventEditing={eventAdding}
                        onEditEvent={editingEvent}
                    />
                )}
            </div>
            <PopUp
                isOpen={isOpen}
                onEventSubmit={eventSubmit}
                event={eventAdding!}
                isAdding={isAdding}
                recruiterName={resources.filter(r => r.id === eventAdding?.resourceId)[0]?.name}
            />
        </div>
    );
};
export default widthDragDropContext(ReactBigCalendar);
