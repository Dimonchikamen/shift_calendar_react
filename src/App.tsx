import "./App.css";
import { FC, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { ViewTypes } from "react-big-scheduler";
import { getHour } from "./Helpers/GetHour";

let config = {
    dayCellWidth: 50,
    dayResourceTableWidth: 300,
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
};

const getDiff = (min: number, max: number) => max - min + 1;

const resize = () => {
    console.log("RESIZE");
    const newWidth = window.innerWidth * 0.75;
    const min = config.dayStartFrom;
    const max = config.dayStopTo;
    const minuteStep = config.minuteStep;
    const timeWidth = newWidth - config.dayResourceTableWidth;
    const newDayCellWidth = timeWidth / (getDiff(min, max) * (60 / minuteStep));
    config = { ...config, schedulerWidth: newWidth, dayCellWidth: newDayCellWidth };
};

const App: FC = () => {
    const [config, setConfig] = useState<any>({
        dayCellWidth: 50,
        dayResourceTableWidth: 300,
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

    const resize = () => {
        console.log("RESIZE");
        const newWidth = window.innerWidth * 0.75;
        const min = config.dayStartFrom;
        const max = config.dayStopTo;
        const minuteStep = config.minuteStep;
        const timeWidth = newWidth - config.dayResourceTableWidth;
        const newDayCellWidth = timeWidth / (getDiff(min, max) * (60 / minuteStep));
        setConfig({ ...config, schedulerWidth: newWidth, dayCellWidth: newDayCellWidth });
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
        //config = { ...config, ...newConfig };
        setConfig(newConfig);
    };

    return (
        <div
            id="app"
            className="app"
        >
            <ReactBigCalendar
                config={config}
                onChangeConfig={changeConfig}
            />
        </div>
    );
};

export default App;
