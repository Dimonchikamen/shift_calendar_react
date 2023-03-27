import { ActionTypes } from "../ActionTypes";
import { ViewTypes } from "react-big-scheduler";
import { ViewType } from "../../Types/ViewType";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import { ScheduleInterviewEvent } from "../../Types/ScheduleInterviewEvent";
import { RecruiterInfo } from "../../Types/RecruiterInfo";

export type SetSelectedEvent = {
    type: ActionTypes.SET_SELECTED_EVENT;
    payload: ScheduleEvent | ScheduleInterviewEvent | null;
};

export type SetSelectedData = {
    type: ActionTypes.SET_SELECTED_DATA;
    payload: RecruiterInfo | null;
};

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

export type SetIsWidget = {
    type: ActionTypes.SET_IS_WIDGET;
    payload: boolean;
};

export type ResizeAction = {
    type: ActionTypes.RESIZE;
};

export type CloseErrorWindow = {
    type: ActionTypes.CLOSE_ERROR_WINDOW;
};

export type MainActions =
    | SetSelectedEvent
    | SetSelectedData
    | ChangeDate
    | ChangeViewType
    | ChangeCalendarViewType
    | SetIsWidget
    | ResizeAction
    | CloseErrorWindow;
