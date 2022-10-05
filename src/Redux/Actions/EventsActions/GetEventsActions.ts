import { ActionTypes } from "../../ActionTypes";
import { Event } from "../../../Types/Event";
import { GetEventsFailure, GetEventsRequest, GetEventsSuccess, FailurePayload } from "../../Types/EventsTypes";

export const getEventsRequest = (): GetEventsRequest => ({
    type: ActionTypes.GET_EVENTS_REQUEST,
});

export const getEventsSuccess = (payload: Event[]): GetEventsSuccess => ({
    type: ActionTypes.GET_EVENTS_SUCCESS,
    payload,
});

export const getEventsFailure = (payload: FailurePayload): GetEventsFailure => ({
    type: ActionTypes.GET_EVENTS_FAILURE,
    payload,
});