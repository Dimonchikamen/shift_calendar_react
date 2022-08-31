import { ActionTypes } from "../ActionTypes";

export const changeEventAction = (newEvent: string) => ({
    type: ActionTypes.CHANGE_EVENT_SUCCESS,
    payload: newEvent,
});
