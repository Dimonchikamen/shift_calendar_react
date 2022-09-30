import { ActionTypes } from "../ActionTypes";
import { ViewTypes } from "react-big-scheduler";

export type ChangeViewType = {
    type: ActionTypes.CHANGE_VIEW_TYPE;
    payload: ViewTypes;
};

export type ResizeAction = {
    type: ActionTypes.RESIZE;
};

export type CloseErrorWindow = {
    type: ActionTypes.CLOSE_ERROR_WINDOW;
};

export type MainActions = ChangeViewType | ResizeAction | CloseErrorWindow;
