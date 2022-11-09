import { ActionTypes } from "../ActionTypes";

export type ChangeRecruiterForInterviewRequest = {
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_REQUEST;
    payload: any;
};

export type ChangeRecruiterForInterviewSuccess = {
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_SUCCESS;
    payload: any;
};

export type ChangeRecruiterForInterviewFailure = {
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_FAILURE;
    payload: string;
};

export type ChangeRecruiterForInterviewTypes =
    | ChangeRecruiterForInterviewRequest
    | ChangeRecruiterForInterviewSuccess
    | ChangeRecruiterForInterviewFailure;
