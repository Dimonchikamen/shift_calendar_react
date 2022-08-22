import "./App.css";
import { FC, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { ViewTypes } from "react-big-scheduler";
import { getHour } from "./Helpers/GetHour";

const App: FC = () => {
    const [config, setConfig] = useState<any>({
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
    });

    const getWidth = () => {
        return config.schedulerWidth - config.dayResourceTableWidth;
    };

    const getDiff = (min: string, max: string) => getHour(max) - getHour(min) + 1;

    const resizeCells = (min: string, max: string, minuteStep: string) => {
        config.dayCellWidth = getWidth() / (getDiff(min, max) * (60 / getHour(minuteStep)));
    };

    useEffect(() => {
        console.log("asd");
    }, [window.innerWidth]);

    const changeConfig = (newConfig: object) => {
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
