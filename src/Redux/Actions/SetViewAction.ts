import { SetViewAction } from "../Types/ViewTypes";
import { ActionTypes } from "../ActionTypes";

export const setViewAction = (payload: string): SetViewAction => ({
    type: ActionTypes.SET_VIEW,
    payload,
});
