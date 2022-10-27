import { ActionTypes } from "../ActionTypes";
import { SetIsWidget } from "../Types/MainReducerTypes";

export const setIsWidgetAction = (payload: boolean): SetIsWidget => ({
    type: ActionTypes.SET_IS_WIDGET,
    payload,
});
