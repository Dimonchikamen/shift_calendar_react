import { ActionTypes } from "../ActionTypes";
import { ViewTypes } from "react-big-scheduler";
import { ViewType } from "../../Types/ViewType";

export type ChangeDate = {
    type: ActionTypes.CHANGE_DATE;
    payload: Date;
};

export type ChangeViewType = {
    type: ActionTypes.CHANGE_VIEW_TYPE;
    payload: ViewType;
};

export type ChangeCalendarViewType = {
    type: ActionTypes.CHANGE_CALENDAR_VIEW_TYPE;
    payload: ViewTypes;
};

export type ResizeAction = {
    type: ActionTypes.RESIZE;
};

export type CloseErrorWindow = {
    type: ActionTypes.CLOSE_ERROR_WINDOW;
};

export type MainActions = ChangeDate | ChangeViewType | ChangeCalendarViewType | ResizeAction | CloseErrorWindow;
