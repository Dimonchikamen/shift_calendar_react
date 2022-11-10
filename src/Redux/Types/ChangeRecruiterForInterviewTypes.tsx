import { ActionTypes } from "../ActionTypes";

export interface ChangeRecruiterForInterviewPayload {
    oldRecruiterId: number;
    oldWorkTimeId: number;
    newRecruiterId: number;
    workTimeId: number;
    interviewId: number;
}

export interface ChangeRecruiterForInterviewResponse {
    workTimeId: number | string;
    interviewId: number | string;
}

export interface FailurePayload {
    error: string;
}

export type ChangeRecruiterForInterviewRequest = {
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_REQUEST;
    payload: ChangeRecruiterForInterviewPayload;
};

export type ChangeRecruiterForInterviewSuccess = {
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_SUCCESS;
    payload: ChangeRecruiterForInterviewPayload;
};

export type ChangeRecruiterForInterviewFailure = {
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_FAILURE;
    payload: FailurePayload;
};

export type ChangeRecruiterForInterviewTypes =
    | ChangeRecruiterForInterviewRequest
    | ChangeRecruiterForInterviewSuccess
    | ChangeRecruiterForInterviewFailure;
