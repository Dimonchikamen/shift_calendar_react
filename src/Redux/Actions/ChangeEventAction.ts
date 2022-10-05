import { ActionTypes } from "../ActionTypes";
import { ChangeEvent } from "../Types/EventsTypes";
import { Event } from "../../Types/Event";

export const changeEventAction = (newEvent: Event): ChangeEvent => ({
    type: ActionTypes.CHANGE_EVENT_SUCCESS,
    payload: newEvent,
});
