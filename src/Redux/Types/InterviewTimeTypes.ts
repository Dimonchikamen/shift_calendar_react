import { ActionTypes } from "../ActionTypes";
import { FullDateTime } from "../../Types/FullDateTime";

export interface ChangeInterviewTimeRequestPayload {
    eventId: number;
    newTime: number;
    currentDate: Date;
}

export interface FailurePayload {
    error: string | null;
}

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

export type ReplaceInterviewTimePayload = {
    interviewId: number;
    workTimeId: number;
    newDate: FullDateTime;
};

export type ReplaceInterviewTimeRequest = {
    type: ActionTypes.REPLACE_INTERVIEW_TIME_REQUEST;
    payload: ReplaceInterviewTimePayload;
};

export type ReplaceInterviewTimeSuccess = {
    type: ActionTypes.REPLACE_INTERVIEW_TIME_SUCCESS;
    payload: ReplaceInterviewTimePayload;
};

export type ReplaceInterviewTimeFailure = {
    type: ActionTypes.REPLACE_INTERVIEW_TIME_FAILURE;
    payload: { error: string };
};

export type InterviewTimeTypes =
    | ChangeInterviewTimeRequest
    | ChangeInterviewTimeSuccess
    | ChangeInterviewTimeFailure
    | ReplaceInterviewTimeRequest
    | ReplaceInterviewTimeSuccess
    | ReplaceInterviewTimeFailure;
