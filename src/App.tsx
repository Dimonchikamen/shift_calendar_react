import "./App.css";
import { FC, memo, useEffect } from "react";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { useAppDispatch } from "./Redux/Hooks";
import { setRoleAction } from "./Redux/Actions/SetRoleAction";
import { setViewAction } from "./Redux/Actions/SetViewAction";
import { ViewTypeWorktime } from "./Types/ViewTypeWorktime";

interface IAppProps {
    role: string;
    view: ViewTypeWorktime;
}

const App: FC<IAppProps> = ({ role, view }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRoleAction(role));
        dispatch(setViewAction(view));
    });

    return (
        <div className="app">
            <ReactBigCalendar />
        </div>
    );
};

export default memo(App);
