import { ActionTypes } from "../ActionTypes";
import { ViewTypes } from "react-big-scheduler";

export type ChangeEvent = {
    type: ActionTypes.CHANGE_EVENT_SUCCESS;
    payload: string;
};

export type ChangeInterviewTime = {
    type: ActionTypes.CHANGE_INTERVIEW_TIME_SUCCESS;
    payload: number;
};

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

export type MainActions = ChangeEvent | ChangeInterviewTime | ChangeViewType | ResizeAction | CloseErrorWindow;
