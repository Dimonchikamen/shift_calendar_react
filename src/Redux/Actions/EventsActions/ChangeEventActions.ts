import { ActionTypes } from "../../ActionTypes";
import { ChangeEventFailure, ChangeEventRequest, ChangeEventSuccess, FailurePayload } from "../../Types/EventsTypes";

export const changeEventRequest = (newEvent: string): ChangeEventRequest => ({
    type: ActionTypes.CHANGE_EVENT_REQUEST,
    payload: newEvent,
});

export const changeEventSuccess = (payload: string): ChangeEventSuccess => ({
    type: ActionTypes.CHANGE_EVENT_SUCCESS,
    payload,
});

export const changeEventFailure = (payload: FailurePayload): ChangeEventFailure => ({
    type: ActionTypes.CHANGE_EVENT_FAILURE,
    payload,
});
