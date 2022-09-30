import "./App.css";
import { FC, memo, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactBigCalendar2 from "./Components/ReactBigCalendar/ReactBigCalendar2";
import { useAppDispatch } from "./Redux/Hooks";
import { setRoleAction } from "./Redux/Actions/SetRoleAction";

interface IAppProps {
    role: string;
}

const App: FC<IAppProps> = ({ role }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRoleAction(role));
    });

    return (
        <div className="app">
            <ReactBigCalendar2 />
        </div>
    );
};

export default memo(App);
