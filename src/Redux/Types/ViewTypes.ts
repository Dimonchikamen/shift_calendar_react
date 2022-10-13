import { ActionTypes } from "../ActionTypes";

export type SetViewAction = {
    type: ActionTypes.SET_VIEW;
    payload: string;
};

export type ViewType = SetViewAction;
