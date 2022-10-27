import "./App.css";
import { FC, memo, useEffect } from "react";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { useAppDispatch } from "./Redux/Hooks";
import { setRoleAction } from "./Redux/Actions/SetRoleAction";
import { setViewAction } from "./Redux/Actions/SetViewAction";
import { ViewTypeWorktime } from "./Types/ViewTypeWorktime";
import { setIsWidgetAction } from "./Redux/Actions/SetIsWidgetAction";

interface IAppProps {
    role: string;
    view: ViewTypeWorktime;
    isWidget: boolean;
}

const App: FC<IAppProps> = ({ role, view, isWidget }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRoleAction(role));
        dispatch(setViewAction(view));
        dispatch(setIsWidgetAction(isWidget));
    });

    return (
        <div className="app">
            <ReactBigCalendar />
        </div>
    );
};

export default memo(App);
