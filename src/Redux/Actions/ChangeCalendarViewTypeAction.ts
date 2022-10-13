import { ViewTypes } from "react-big-scheduler";
import { ActionTypes } from "../ActionTypes";
import { ChangeCalendarViewType } from "../Types/MainReducerTypes";

export const changeCalendarViewTypeAction = (newViewType: ViewTypes): ChangeCalendarViewType => ({
    type: ActionTypes.CHANGE_CALENDAR_VIEW_TYPE,
    payload: newViewType,
});
