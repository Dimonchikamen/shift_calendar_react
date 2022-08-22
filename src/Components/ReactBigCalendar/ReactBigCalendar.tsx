import { FC, useEffect, useMemo, useRef, useState } from "react";
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

const resources: Resource[] = [
    { id: "1", name: "Попов Николай" },
    { id: "2", name: "Мальцева Кристина" },
];

const events: ScheduleEvent[] = [
    {
        id: 1,
        start: "2022-08-19 09:00",
        end: "2022-08-19 11:00",
        resourceId: "1",
        title: createTitle("2022-08-19 09:00", "2022-08-19 11:00"),
        resizable: false,
        bgColor: "#D9EDF7",
        bookedTimes: [
            { name: "Ольшанский Кирилл", start: "2022-08-19 10:00", end: "2022-08-19 10:30" },
            { name: "Денежный чел", start: "2022-08-19 10:30", end: "2022-08-19 11:00" },
        ],
    },
    {
        id: 2,
        start: "2022-08-19 12:00",
        end: "2022-08-19 15:00",
        resourceId: "2",
        title: createTitle("2022-08-19 12:00", "2022-08-19 15:00"),
        resizable: false,
        bgColor: "#D9EDF7",
        bookedTimes: [],
    },
];

const config = {
    dayCellWidth: 100,
    dayResourceTableWidth: 300,
    schedulerWidth: 1000,
    startResizable: true,
    endResizable: true,
    movable: false,
    resourceName: "Рекрутеры:",
    eventItemPopoverDateFormat: "D/MM",
    nonAgendaDayCellHeaderFormat: "H:mm",
    dayStartFrom: 9,
    dayStopTo: 19,
    minuteStep: 30,
    views: [
        { viewName: "День", viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false },
        { viewName: "Неделя", viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false },
    ],
};

const behaviours = {
    isNonWorkingTimeFunc: () => false,
};

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

const getWidth = () => {
    return config.schedulerWidth - config.dayResourceTableWidth;
};

const getDiff = (min: string, max: string) => getHour(max) - getHour(min) + 1;

const resizeCells = (min: string, max: string, minuteStep: string) => {
    config.dayCellWidth = getWidth() / (getDiff(min, max) * (60 / getHour(minuteStep)));
};

interface IReactBigCalendarProps {
    config: object;
    onChangeConfig: (newConfig: object) => void;
}

const ReactBigCalendar: FC<IReactBigCalendarProps> = ({ config, onChangeConfig }) => {
    const options = useMemo(() => getOptions(0, 23), []);
    const optionsInterviewTime = useMemo(() => ["10:00", "12:00", "15:00", "20:00", "30:00", "60:00"], []);
    const eventOptions = useMemo(() => ["Ночь Музеев", "Ночь Музыки"], []);
    const [event, setEvent] = useState(eventOptions[0]);
    const [min, setMin] = useState(options[9]);
    const [max, setMax] = useState(options[19]);
    const [interviewTime, setInterviewTime] = useState(optionsInterviewTime[4]);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [selectData, setData] = useState<RequiterInfo | null>(null);
    resizeCells(min, max, interviewTime);

    const [viewModel, setView] = useState<{ data: SchedulerData }>(() => {
        const data = new SchedulerData(
            moment().format(DATE_FORMAT),
            ViewTypes.Day,
            false,
            false,
            { ...config, dayStartFrom: getHour(min), dayStopTo: getHour(max), minuteStep: getHour(interviewTime) },
            behaviours
        );
        data.setResources(resources);
        data.setEvents(events);
        return { data };
    });

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

    const changeInterviewTime = (newTime: string) => {
        setInterviewTime(newTime);
        setSelectedEvent(null);
        setData(null);
        onChangeConfig({ ...config, minuteStep: getHour(newTime) });
        resizeCells(min, max, interviewTime);
        setView(() => {
            const data = new SchedulerData(
                moment().format(DATE_FORMAT),
                ViewTypes.Day,
                false,
                false,
                { ...config },
                behaviours
            );
            data.setResources(resources);
            data.setEvents(events);
            return { data };
        });
    };

    const changeMax = (max: string) => {
        setMax(max);
        onChangeConfig({ ...config, dayStopTo: getHour(max) });
        //config.dayStopTo = getHour(max);
        resizeCells(min, max, interviewTime);
        setView(() => {
            const data = new SchedulerData(
                moment().format(DATE_FORMAT),
                ViewTypes.Day,
                false,
                false,
                { ...config },
                behaviours
            );
            data.setResources(resources);
            data.setEvents(events);
            return { data };
        });
    };

    const changeMin = (min: string) => {
        setMin(min);
        onChangeConfig({ ...config, dayStartFrom: getHour(min) });
        //config.dayStartFrom = getHour(min);
        resizeCells(min, max, interviewTime);
        setView(() => {
            const data = new SchedulerData(
                moment().format(DATE_FORMAT),
                ViewTypes.Day,
                false,
                false,
                { ...config },
                behaviours
            );
            data.setResources(resources);
            data.setEvents(events);
            return { data };
        });
    };

    const prevClick = (schedulerData: SchedulerData) => {
        schedulerData.prev();
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);
        setView({ data: schedulerData });
    };
    const nextClick = (schedulerData: SchedulerData) => {
        schedulerData.next();
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);
        setView({ data: schedulerData });
    };
    const selectDate = (schedulerData: SchedulerData, date: string) => {
        schedulerData.setDate(date);
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);
        setView({ data: schedulerData });
    };

    const viewChange = (schedulerData: SchedulerData, view: any) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setResources(resources);
        schedulerData.setEvents(events);
        setView({ data: schedulerData });
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
