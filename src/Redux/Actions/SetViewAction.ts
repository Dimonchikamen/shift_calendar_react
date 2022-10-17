import { SetViewAction } from "../Types/ViewTypes";
import { ActionTypes } from "../ActionTypes";
import { ViewTypeWorktime } from "../../Types/ViewTypeWorktime";

export const setViewAction = (payload: ViewTypeWorktime): SetViewAction => ({
    type: ActionTypes.SET_VIEW,
    payload,
});
