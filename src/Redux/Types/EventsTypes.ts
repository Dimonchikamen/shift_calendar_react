import { ActionTypes } from "../ActionTypes";
import { Recruiter } from "../../Types/Recruiter";

export interface FailurePayload {
    error: string;
}

export interface ChangeEventRequestPayload {
    recruiters: Recruiter[];
    event: string;
}

export type GetEventsRequest = {
    type: ActionTypes.GET_EVENTS_REQUEST;
};

export type GetEventsSuccess = {
    type: ActionTypes.GET_EVENTS_SUCCESS;
    payload: string[];
};

export type GetEventsFailure = {
    type: ActionTypes.GET_EVENTS_FAILURE;
    payload: FailurePayload;
};

export type ChangeEventRequest = {
    type: ActionTypes.CHANGE_EVENT_REQUEST;
    payload: ChangeEventRequestPayload;
};

export type ChangeEventSuccess = {
    type: ActionTypes.CHANGE_EVENT_SUCCESS;
    payload: string;
};

export type ChangeEventFailure = {
    type: ActionTypes.CHANGE_EVENT_FAILURE;
    payload: FailurePayload;
};

export type EventsTypes =
    | GetEventsRequest
    | GetEventsSuccess
    | GetEventsFailure
    | ChangeEventRequest
    | ChangeEventSuccess
    | ChangeEventFailure;
