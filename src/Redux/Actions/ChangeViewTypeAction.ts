import { ChangeViewType } from "../Types/MainReducerTypes";
import { ActionTypes } from "../ActionTypes";
import { ViewType } from "../../Types/ViewType";

export const changeViewTypeAction = (payload: ViewType): ChangeViewType => ({
    type: ActionTypes.CHANGE_VIEW_TYPE,
    payload,
});
