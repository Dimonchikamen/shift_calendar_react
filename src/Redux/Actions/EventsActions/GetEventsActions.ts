import { ActionTypes } from "../../ActionTypes";
import { GetEventsFailure, GetEventsRequest, GetEventsSuccess, FailurePayload } from "../../Types/EventsTypes";

export const getEventsRequest = (): GetEventsRequest => ({
    type: ActionTypes.GET_EVENTS_REQUEST,
});

export const getEventsSuccess = (payload: string[]): GetEventsSuccess => ({
    type: ActionTypes.GET_EVENTS_SUCCESS,
    payload,
});

export const getEventsFailure = (payload: FailurePayload): GetEventsFailure => ({
    type: ActionTypes.GET_EVENTS_FAILURE,
    payload,
});
