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
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Button from 'antd/lib/button'

const widthDragDropContext = DragDropContext(HTML5Backend);

export const DATE_FORMAT = "YYYY-MM-DD H:mm";
const hourOptions: Time[] = getOptions(0, 23);
const optionsInterviewTime: Time[] = ["10:00", "12:00", "15:00", "20:00", "30:00", "60:00"];
const eventOptions = ["Ночь Музеев", "Ночь Музыки"];

interface IReactBigCalendarProps {
    config: object;
    resources: Resource[];
    events: ScheduleEvent[];
    behaviours: object;
    onChangeConfig: (newConfig: object) => void;
    onAddEvent: (ev: ScheduleEvent) => void;
    onDeleteEvent: (ev: ScheduleEvent) => void;
}

const ReactBigCalendar: FC<IReactBigCalendarProps> = ({
    config,
    resources,
    events,
    behaviours,
    onChangeConfig,
    onAddEvent,
    onDeleteEvent
}) => {
    const [event, setEvent] = useState(eventOptions[0]);
    const [min, setMin] = useState<Time>(hourOptions[9]);
    const [max, setMax] = useState<Time>(hourOptions[19]);
    const [interviewTime, setInterviewTime] = useState<Time>(optionsInterviewTime[4]);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [selectData, setData] = useState<RequiterInfo | null>(null);
    const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.Day);
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [viewModel, setView] = useState<{ data: SchedulerData }>(() => {
        const data = new SchedulerData(moment().format(DATE_FORMAT), viewType, false, false, config, behaviours);
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
    }, [config, resources, events, behaviours]);

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
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        setViewType(view.viewType);
        setSchedulerData(schedulerData);
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
            <div style={{width: '300px'}}>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className="status-dot" style={{backgroundColor: statusColor}} />
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={title}>{title}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <span className="header1-text">{start.format(DATE_FORMAT).slice(-5)} − {end.format(DATE_FORMAT).slice(-5)}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <Button onClick={()=>{deleteEvent(eventItem)}}>Delete</Button>
                    </Col>
                </Row>
            </div>
        )
    }

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
                {selectedEvent && selectData && <InformationContainer data={selectData} />}
            </div>
        </div>
    );
};
export default widthDragDropContext(ReactBigCalendar);
