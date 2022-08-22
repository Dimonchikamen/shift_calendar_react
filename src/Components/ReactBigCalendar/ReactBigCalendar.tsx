import { FC, useEffect, useMemo, useState } from "react";
import Scheduler, { Resource, SchedulerData, ViewTypes } from "react-big-scheduler";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import s from "./ReactBigCalendar.module.css";
import CalendarHeader from "./Components/CalendarHeader/CalendarHeader";
import { getOptions } from "../../Helpers/GetOptions";
import { getHour } from "../../Helpers/GetHour";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import InformationContainer from "./Components/InformationContainer/InformationContainer";
import { RequiterInfo } from "../../Types/RequiterInfo";
import { InterviewInfo } from "../../Types/InterviewInfo";

const createTitle = (start: string, end: string) => {
    return `${start.split(" ")[1]} - ${end.split(" ")[1]}`;
};

const createTitleFromHours = (start: string, end: string) => {
    return `${start} - ${end}`;
};

const widthDragDropContext = DragDropContext(HTML5Backend);

const DATE_FORMAT = "YYYY-MM-DD HH:mm";

const getHoursInAllDateTime = (dateTime: string) => dateTime.split(" ")[1].split(":")[0];

const getMinutesInAllDateTime = (dateTime: string) => dateTime.split(" ")[1].split(":")[1];

const getInterviewInfos = (event: ScheduleEvent) => {
    const allInterviewInfo: InterviewInfo[] = [];
    event.bookedTimes.forEach(b => {
        const index = allInterviewInfo.findIndex(e => e.name === b.name);
        if (index === -1) {
            allInterviewInfo.push({
                name: b.name,
                bookedTimeTitles: [createTitle(b.start, b.end)],
            });
        } else {
            allInterviewInfo[index].bookedTimeTitles.push(createTitle(b.start, b.end));
        }
    });
    return allInterviewInfo;
};

interface IReactBigCalendarProps {
    config: object;
    resources: Resource[];
    events: ScheduleEvent[];
    behaviours: object;
    onChangeConfig: (newConfig: object) => void;
}

const ReactBigCalendar: FC<IReactBigCalendarProps> = ({ config, resources, events, behaviours, onChangeConfig }) => {
    const options = useMemo(() => getOptions(0, 23), []);
    const optionsInterviewTime = useMemo(() => ["10:00", "12:00", "15:00", "20:00", "30:00", "60:00"], []);
    const eventOptions = useMemo(() => ["Ночь Музеев", "Ночь Музыки"], []);
    const [event, setEvent] = useState(eventOptions[0]);
    const [min, setMin] = useState(options[9]);
    const [max, setMax] = useState(options[19]);
    const [interviewTime, setInterviewTime] = useState(optionsInterviewTime[4]);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [selectData, setData] = useState<RequiterInfo | null>(null);
    const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.Day);

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

    const getIntervals = (eventInfo: ScheduleEvent) => {
        const minutes = ["00"];
        for (let i = 1; i < 60 / getHour(interviewTime); i++) {
            minutes.push(`${i * getHour(interviewTime)}`);
        }
        const hours = [];
        const diff = Number(getHoursInAllDateTime(eventInfo.end)) - Number(getHoursInAllDateTime(eventInfo.start)) + 1;
        for (let i = 0; i < diff; i++) {
            hours.push(`${Number(getHoursInAllDateTime(eventInfo.start)) + i}`);
        }

        const res = [];
        for (let i = 0; i < hours.length - 1; i++) {
            for (let j = 0; j < minutes.length; j++) {
                const start = `${hours[i]}:${minutes[j]}`;
                const end =
                    j === minutes.length - 1 ? `${hours[i + 1]}:${minutes[0]}` : `${hours[i]}:${minutes[j + 1]}`;
                res.push(createTitleFromHours(start, end));
            }
        }
        return res;
    };

    const getAvailableTimes = (eventInfo: ScheduleEvent, interviews: InterviewInfo[]) => {
        const res = getIntervals(eventInfo);
        interviews.forEach(interview => {
            interview.bookedTimeTitles.forEach(t => {
                const index = res.findIndex(r => r === t);
                if (index !== -1) {
                    res.splice(index, 1);
                }
            });
        });
        return res;
    };

    const createData = (schedulerData: SchedulerData, event: ScheduleEvent): RequiterInfo => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const requiter = schedulerData.resources.find((r: Resource) => r.id === event.resourceId);
        const interviews = getInterviewInfos(event);
        const availableInterviewTimes = getAvailableTimes(event, interviews);
        return { name: requiter.name, workTime: event.title, availableInterviewTimes, interviews };
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

    return (
        <div className={s.table_container}>
            <CalendarHeader
                event={event}
                max={max}
                min={min}
                interviewTime={interviewTime}
                options={options}
                eventOptions={eventOptions}
                interviewTimeOptions={optionsInterviewTime}
                data={viewModel.data}
                onChangeMin={changeMin}
                onChangeMax={changeMax}
                onChangeInterviewTime={changeInterviewTime}
                onChangeEvent={e => setEvent(e)}
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
                    />
                </div>
                {selectedEvent && selectData && <InformationContainer data={selectData} />}
            </div>
        </div>
    );
};
export default widthDragDropContext(ReactBigCalendar);
