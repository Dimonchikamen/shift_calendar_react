import { ActionTypes } from "../ActionTypes";
import { ViewTypeWorktime } from "../../Types/ViewTypeWorktime";

export type SetViewAction = {
    type: ActionTypes.SET_VIEW;
    payload: ViewTypeWorktime;
};

export type ViewType = SetViewAction;
