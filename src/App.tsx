import "./App.css";
import { FC, memo, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
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
            <ReactBigCalendar />
        </div>
    );
};

export default memo(App);
