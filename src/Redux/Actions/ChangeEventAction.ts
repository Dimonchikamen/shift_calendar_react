import { ActionTypes } from "../ActionTypes";
import { ChangeEventSuccess } from "../Types/EventsTypes";

export const changeEventAction = (newEvent: string): ChangeEventSuccess => ({
    type: ActionTypes.CHANGE_EVENT_SUCCESS,
    payload: newEvent,
});
