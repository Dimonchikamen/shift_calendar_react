import { ActionTypes } from "../ActionTypes";
import { Event } from "../../Types/Event";

export interface FailurePayload {
    error: string;
}

export type GetEventsRequest = {
    type: ActionTypes.GET_EVENTS_REQUEST;
    payload: Date;
};

export type GetEventsSuccess = {
    type: ActionTypes.GET_EVENTS_SUCCESS;
    payload: Event[];
};

export type GetEventsFailure = {
    type: ActionTypes.GET_EVENTS_FAILURE;
    payload: FailurePayload;
};

export type ChangeEvent = {
    type: ActionTypes.CHANGE_EVENT;
    payload: Event;
};

export type EventsTypes = GetEventsRequest | GetEventsSuccess | GetEventsFailure | ChangeEvent;
