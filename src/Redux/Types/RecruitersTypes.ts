import { ActionTypes } from "../ActionTypes";

export interface AddRecruiterWorkTimeRequestPayload {
    start: Date;
    end: Date;
    recruiterId: number;
    eventId: number;
}

export interface RecruiterWorkTimePayload {
    start: Date;
    end: Date;
    recruiterId: number;
    workTimeId: number;
    eventId: number;
}

export interface RemoveRecruiterRequestPayload {
    recruiterId: number;
    workTimeId: number;
    eventId: number;
}

export interface FailurePayload {
    error: string;
}

export type AddRecruiterWorkTimeRequest = {
    type: ActionTypes.ADD_RECRUITER_EVENT_REQUEST;
    payload: AddRecruiterWorkTimeRequestPayload;
};

export type AddRecruiterWorkTimeSuccess = {
    type: ActionTypes.ADD_RECRUITER_EVENT_SUCCESS;
    payload: RecruiterWorkTimePayload;
};

export type AddRecruiterWorkTimeFailure = {
    type: ActionTypes.ADD_RECRUITER_EVENT_FAILURE;
    payload: FailurePayload;
};

export type EditRecruiterWorkTimeRequest = {
    type: ActionTypes.EDIT_RECRUITER_EVENT_REQUEST;
    payload: RecruiterWorkTimePayload;
};

export type EditRecruiterWorkTimeSuccess = {
    type: ActionTypes.EDIT_RECRUITER_EVENT_SUCCESS;
    payload: RecruiterWorkTimePayload;
};

export type EditRecruiterWorkTimeFailure = {
    type: ActionTypes.EDIT_RECRUITER_EVENT_FAILURE;
    payload: FailurePayload;
};

export type RemoveRecruiterWorkTimeRequest = {
    type: ActionTypes.REMOVE_RECRUITER_EVENT_REQUEST;
    payload: RemoveRecruiterRequestPayload;
};

export type RemoveRecruiterWorkTimeSuccess = {
    type: ActionTypes.REMOVE_RECRUITER_EVENT_SUCCESS;
    payload: number;
};

export type RemoveRecruiterWorkTimeFailure = {
    type: ActionTypes.REMOVE_RECRUITER_EVENT_FAILURE;
    payload: FailurePayload;
};

export type RecruitersTypes =
    | AddRecruiterWorkTimeRequest
    | AddRecruiterWorkTimeSuccess
    | AddRecruiterWorkTimeFailure
    | EditRecruiterWorkTimeRequest
    | EditRecruiterWorkTimeSuccess
    | EditRecruiterWorkTimeFailure
    | RemoveRecruiterWorkTimeRequest
    | RemoveRecruiterWorkTimeSuccess
    | RemoveRecruiterWorkTimeFailure;
