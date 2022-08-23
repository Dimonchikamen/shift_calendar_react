import "./App.css";
import { FC, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { Resource, ViewTypes } from "react-big-scheduler";
import { ScheduleEvent } from "./Types/ScheduleEvent";
import mockRecruiters from "./Mocks/Requiters.json";
import { createResourcesAndEvents } from "./Helpers/CreateResourcesAndEvents";
import { Recruiter } from "./Types/Recruiter";

const getDiff = (min: number, max: number) => max - min + 1;

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

    const [events, setEvents] = useState<ScheduleEvent[]>([]);

    const [resources, setResources] = useState<Resource[]>([]);

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
        const [resources, events] = createResourcesAndEvents(mockRecruiters as unknown as Recruiter[]);
        setEvents(events);
        setResources(resources);
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

    return (
        <div className="app">
            <ReactBigCalendar
                config={config}
                resources={resources}
                events={events}
                behaviours={behaviours}
                onChangeConfig={changeConfig}
            />
        </div>
    );
};

export default App;
