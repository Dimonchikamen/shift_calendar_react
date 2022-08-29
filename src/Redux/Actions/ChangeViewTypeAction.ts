import { ViewTypes } from "react-big-scheduler";
import { ActionTypes } from "../ActionTypes";
import { ChangeViewType } from "../Types/MainReducerTypes";

export const changeViewTypeAction = (newViewType: ViewTypes): ChangeViewType => ({
    type: ActionTypes.CHANGE_VIEW_TYPE,
    payload: newViewType,
});
