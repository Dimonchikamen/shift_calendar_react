import { ActionTypes } from "../../ActionTypes";
import { ChangeEventFailure, ChangeEventRequest, ChangeEventSuccess, FailurePayload } from "../../Types/EventsTypes";
import { Recruiter } from "../../../Types/Recruiter";

export const changeEventRequest = (recruiters: Recruiter[], event: string): ChangeEventRequest => ({
    type: ActionTypes.CHANGE_EVENT_REQUEST,
    payload: { recruiters, event },
});

export const changeEventSuccess = (payload: string): ChangeEventSuccess => ({
    type: ActionTypes.CHANGE_EVENT_SUCCESS,
    payload,
});

export const changeEventFailure = (payload: FailurePayload): ChangeEventFailure => ({
    type: ActionTypes.CHANGE_EVENT_FAILURE,
    payload,
});
