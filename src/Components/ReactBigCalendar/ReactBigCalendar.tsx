import { FC, useEffect, useState } from "react";
import Scheduler, { Resource, SchedulerData, ViewTypes } from "react-big-scheduler";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import s from "./ReactBigCalendar.module.css";
import CalendarHeader from "./Components/CalendarHeader/CalendarHeader";
import { getOptions } from "../../Helpers/GetOptions";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import InformationContainer from "./Components/InformationContainer/InformationContainer";
import { RequiterInfo } from "../../Types/RequiterInfo";
import { getHour } from "../../Helpers/DateTimeHelpers";
import { Time } from "../../Types/Time";
import { getAvailableTimes } from "../../Helpers/GetAvailableTimes";
import { createTitle } from "../../Helpers/CreateTitle";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import { FullDateTime } from "../../Types/FullDateTime";

export const widthDragDropContext = DragDropContext(HTML5Backend);

export const DATE_FORMAT = "YYYY-MM-DD H:mm";
const hourOptions: Time[] = getOptions(0, 23);
const optionsInterviewTime: Time[] = ["10:00", "12:00", "15:00", "20:00", "30:00", "60:00"];
const eventOptions = ["Ночь Музеев", "Ночь Музыки"];
moment.locale("ru-ru");

interface IReactBigCalendarProps {
    config: object;
    resources: Resource[];
    events: ScheduleEvent[];
    behaviours: object;
    viewType: ViewTypes;
    onChangeViewType?: (newView: any) => void;
    onChangeConfig: (newConfig: object) => void;
    onAddEvent: (ev: ScheduleEvent) => void;
    onDeleteEvent: (ev: ScheduleEvent) => void;
    onEditEvent: (oldEvent: ScheduleEvent, newEvent: ScheduleEvent) => void;
}

const ReactBigCalendar: FC<IReactBigCalendarProps> = ({
    config,
    resources,
    events,
    behaviours,
    viewType,
    onChangeViewType,
    onChangeConfig,
    onAddEvent,
    onDeleteEvent,
    onEditEvent
}) => {
    const [event, setEvent] = useState(eventOptions[0]);
    const [min, setMin] = useState<Time>(hourOptions[9]);
    const [max, setMax] = useState<Time>(hourOptions[19]);
    const [interviewTime, setInterviewTime] = useState<Time>(optionsInterviewTime[4]);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [selectData, setData] = useState<RequiterInfo | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [viewModel, setView] = useState<{ data: SchedulerData }>(() => {
        moment.locale("ru");
        const data = new SchedulerData(moment().format(DATE_FORMAT), viewType, false, false, config, behaviours);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.setLocaleMoment(moment);
        data.setResources(resources);
        data.setEvents(events);
        return { data };
    });

    useEffect(() => {
        setView(() => {
            const data = new SchedulerData(moment().format(DATE_FORMAT), viewType, false, false, config, behaviours);
            data.setResources(resources);
            data.setEvents(events);
            return { data };
        });
    }, [config, resources, events, viewType, behaviours]);

    useEffect(() => {
        if(selectedEvent !== null){
            selectedEvent.bgColor = '#1890ff'
            setSelectedEvent(selectedEvent)
        }
        return () => {
            if(selectedEvent !== null){
                selectedEvent.bgColor = '#D9EDF7'
                setSelectedEvent(selectedEvent)
            }
        }
    }, [selectedEvent])

    const createData = (schedulerData: SchedulerData, event: ScheduleEvent): RequiterInfo => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const requiter = schedulerData.resources.find((r: Resource) => r.id === event.resourceId);
        const availableInterviewTimes = getAvailableTimes(event, event.interviews, interviewTime);
        return {
            name: requiter.name,
            workTimeTitle: event.title,
            availableInterviewTimes,
            interviews: event.interviews,
        };
    };

    const setSchedulerData = (schedulerData: SchedulerData) => {
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);
        setView({ data: schedulerData });
    };

    const changeInterviewTime = (newTime: string) => {
        setInterviewTime(newTime);
        setSelectedEvent(null);
        setData(null);
        onChangeConfig({ ...config, minuteStep: getHour(newTime) });
    };

    const changeMax = (max: string) => {
        setMax(max);
        onChangeConfig({ ...config, dayStopTo: getHour(max) });
    };

    const changeMin = (min: string) => {
        setMin(min);
        onChangeConfig({ ...config, dayStartFrom: getHour(min) });
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
        onChangeViewType?.(view.viewType);
    };

    const eventItemClick = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setData(createData(schedulerData, event));
        setSelectedEvent(event);
    };

    const addingEvent = (
        schedulerData: SchedulerData,
        slotId: string,
        slotName: string,
        start: string,
        end: string
    ) => {
        onAddEvent({
            id: Math.floor(Math.random() * 1000),
            start: start.substring(0, start.length - 3),
            end: end.substring(0, end.length - 3),
            resourceId: slotId,
            title: createTitle(start.substring(0, start.length - 3), end.substring(0, end.length - 3)),
            resizable: false,
            bgColor: "#D9EDF7",
            interviews: [],
        });
    };

    const deleteEvent = (event: ScheduleEvent) => {
        onDeleteEvent(event)
        setSelectedEvent(null)
    }

    const editEvent = (schedulerData: SchedulerData, event: ScheduleEvent) => {
        setData(createData(schedulerData, event))
        setSelectedEvent(event)
        setIsEditing(true)
    }
    const editingEvent = (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => {
        let newEvent = JSON.parse(JSON.stringify(eventEditing))
        const formatTime = (time: string) => {return time.length < 5 ? '0'+time : time}
        newEvent.start = newEvent.start.slice(0,11) + formatTime(dayStart)
        newEvent.end = newEvent.end.slice(0,11) + formatTime(dayEnd)
        newEvent.title = dayStart +' − ' + dayEnd
        onEditEvent(eventEditing, newEvent)
        setSelectedEvent(null)
        setIsEditing(false)
    }

    const customPopover = (
        schedulerData: SchedulerData,
        eventItem: ScheduleEvent,
        title: string,
        start: any,
        end: any,
        statusColor: string
    ) => {
        return(
            <div style={{width: '200px'}}>
                <span className="header2-text" title={title}>{start.format(DATE_FORMAT).slice(-5)} − {end.format(DATE_FORMAT).slice(-5)}</span>
                <Button style={{
                    border: '1px solid #1890ff', 
                    borderRadius: '4px', 
                    background: 'transparent', 
                    marginTop: '10px',
                    padding: '3px 12px',
                    color: '#1890ff'
                }} 
                onClick={()=>{deleteEvent(eventItem)}}>
                    Удалить
                </Button>
                <Button style={{
                    border: '1px solid #1890ff', 
                    borderRadius: '4px', 
                    background: 'transparent', 
                    marginTop: '10px',
                    padding: '3px 12px',
                    color: '#1890ff'
                }} 
                onClick={()=>{editEvent(schedulerData, eventItem)}}>
                    Редактировать
                </Button>
            </div>
        );
    };

    return (
        <div className={s.table_container}>
            <CalendarHeader
                event={event}
                max={max}
                min={min}
                interviewTime={interviewTime}
                options={hourOptions}
                eventOptions={eventOptions}
                interviewTimeOptions={optionsInterviewTime}
                data={viewModel.data}
                onChangeMin={changeMin}
                onChangeMax={changeMax}
                onChangeInterviewTime={changeInterviewTime}
                onChangeEvent={setEvent}
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
                    {selectedEvent && selectData && <InformationContainer 
                    data={selectData} 
                    isEditing={isEditing} 
                    eventEditing={selectedEvent}
                    min={min} 
                    max={max} 
                    options={getOptions(getHour(min), getHour(max))}
                    onEditEvent={editingEvent}
                     /> }
                </div>
        </div>
    );
};
export default widthDragDropContext(ReactBigCalendar);
