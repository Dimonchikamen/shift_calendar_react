import "./App.css";
import { FC, memo } from "react";
import MonthCalendar from "./Components/MonthCalendar/MonthCalendar";

const App: FC = () => {
    return (
        <div className="app">
            <MonthCalendar />
        </div>
    );
};

export default memo(App);
