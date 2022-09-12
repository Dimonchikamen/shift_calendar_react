import { ActionTypes } from "../ActionTypes";

export interface ChangeInterviewTimeRequestPayload {
    eventId: number;
    newTime: number;
}

export interface FailurePayload {
    error: string | null;
}

export type GetInterviewTimeRequest = {
    type: ActionTypes.GET_INTERVIEW_TIME_REQUEST;
    payload: number;
};

export type GetInterviewTimeSuccess = {
    type: ActionTypes.GET_INTERVIEW_TIME_SUCCESS;
    payload: number | "";
};

export type GetInterviewTimeFailure = {
    type: ActionTypes.GET_INTERVIEW_TIME_FAILURE;
    payload: FailurePayload;
};

export type ChangeInterviewTimeRequest = {
    type: ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST;
    payload: ChangeInterviewTimeRequestPayload;
};

export type ChangeInterviewTimeSuccess = {
    type: ActionTypes.CHANGE_INTERVIEW_TIME_SUCCESS;
    payload: number;
};

export type ChangeInterviewTimeFailure = {
    type: ActionTypes.CHANGE_INTERVIEW_TIME_FAILURE;
    payload: FailurePayload;
};

export type InterviewTimeTypes =
    | GetInterviewTimeRequest
    | GetInterviewTimeSuccess
    | GetInterviewTimeFailure
    | ChangeInterviewTimeRequest
    | ChangeInterviewTimeSuccess
    | ChangeInterviewTimeFailure;
