import "./App.css";
import { FC, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { Resource, ViewTypes } from "react-big-scheduler";
import { ScheduleEvent } from "./Types/ScheduleEvent";

const getDiff = (min: number, max: number) => max - min + 1;

const createTitle = (start: string, end: string) => {
    return `${start.split(" ")[1]} - ${end.split(" ")[1]}`;
};

const App: FC = () => {
    const [config, setConfig] = useState<any>({
        dayCellWidth: 50,
        weekCellWidth: 1100 / 7,
        dayResourceTableWidth: 300,
        weekResourceTableWidth: 300,
        schedulerWidth: 1100,
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
    });

    const [events, setEvents] = useState<ScheduleEvent[]>([
        {
            id: 1,
            start: "2022-08-22 09:00",
            end: "2022-08-22 11:00",
            resourceId: "1",
            title: createTitle("2022-08-22 09:00", "2022-08-22 11:00"),
            resizable: false,
            bgColor: "#D9EDF7",
            bookedTimes: [
                { name: "Ольшанский Кирилл", start: "2022-08-22 10:00", end: "2022-08-22 10:30" },
                { name: "Денежный чел", start: "2022-08-22 10:30", end: "2022-08-22 11:00" },
            ],
        },
        {
            id: 2,
            start: "2022-08-22 12:00",
            end: "2022-08-22 15:00",
            resourceId: "2",
            title: createTitle("2022-08-22 12:00", "2022-08-22 15:00"),
            resizable: false,
            bgColor: "#D9EDF7",
            bookedTimes: [],
        },
    ]);

    const [resources, setResources] = useState<Resource[]>([
        { id: "1", name: "Попов Николай" },
        { id: "2", name: "Мальцева Кристина" },
    ]);

    const behaviours = {
        isNonWorkingTimeFunc: () => false,
    };

    const resize = () => {
        const newWidth = window.innerWidth * 0.75;
        let newResourceTableWidth = config.dayResourceTableWidth;
        if (window.innerWidth < 1200) {
            newResourceTableWidth = 200;
        }
        const min = config.dayStartFrom;
        const max = config.dayStopTo;
        const minuteStep = config.minuteStep;
        const timeWidth = newWidth - newResourceTableWidth;
        const newDayCellWidth = timeWidth / (getDiff(min, max) * (60 / minuteStep));
        const newWeekCellWidth = timeWidth / 7;
        setConfig({
            ...config,
            dayResourceTableWidth: newResourceTableWidth,
            weekResourceTableWidth: newResourceTableWidth,
            schedulerWidth: newWidth,
            dayCellWidth: newDayCellWidth,
            weekCellWidth: newWeekCellWidth,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        resize();
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    useEffect(() => {
        resize();
    }, [config.dayStartFrom, config.dayStopTo, config.minuteStep]);

    const changeConfig = (newConfig: object) => {
        setConfig(newConfig);
    };

    const addingEvent = (ev: ScheduleEvent) => {
        setEvents([...events, ev]);
    };


    return (
        <div className="app">
            <ReactBigCalendar
                config={config}
                resources={resources}
                events={events}
                behaviours={behaviours}
                onChangeConfig={changeConfig}
                onAddEvent={addingEvent}
            />
        </div>
    );
};

export default App;
