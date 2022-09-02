import { ActionTypes } from "../ActionTypes";
import { Recruiter } from "../../Types/Recruiter";

export interface AddRecruiterRequestPayload {
    start: Date;
    end: Date;
    recruiterId: number;
    event: string;
}

export interface EditRecruiterRequestPayload {
    start: Date;
    end: Date;
    recruiterId: number;
    workTimeId: number;
}

export interface RemoveRecruiterRequestPayload {
    recruiterId: number;
    workTimeId: number;
}

export interface FailurePayload {
    error: string;
}

export type GetRecruitersRequest = {
    type: ActionTypes.GET_RECRUITERS_REQUEST;
    payload: { start?: Date; end?: Date };
};

export type GetRecruitersSuccess = {
    type: ActionTypes.GET_RECRUITERS_SUCCESS;
    payload: Recruiter[];
};

export type GetRecruitersFailure = {
    type: ActionTypes.GET_RECRUITERS_FAILURE;
    payload: FailurePayload;
};

export type AddRecruiterWorkTimeRequest = {
    type: ActionTypes.ADD_RECRUITER_EVENT_REQUEST;
    payload: AddRecruiterRequestPayload;
};

export type AddRecruiterWorkTimeSuccess = {
    type: ActionTypes.ADD_RECRUITER_EVENT_SUCCESS;
    payload: Recruiter;
};

export type AddRecruiterWorkTimeFailure = {
    type: ActionTypes.ADD_RECRUITER_EVENT_FAILURE;
    payload: FailurePayload;
};

export type EditRecruiterWorkTimeRequest = {
    type: ActionTypes.EDIT_RECRUITER_EVENT_REQUEST;
    payload: EditRecruiterRequestPayload;
};

export type EditRecruiterWorkTimeSuccess = {
    type: ActionTypes.EDIT_RECRUITER_EVENT_SUCCESS;
    payload: Recruiter;
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
    payload: Recruiter;
};

export type RemoveRecruiterWorkTimeFailure = {
    type: ActionTypes.REMOVE_RECRUITER_EVENT_FAILURE;
    payload: FailurePayload;
};

export type SortRecruiters = {
    type: ActionTypes.FILTER_RECRUITERS;
    payload: string;
};

export type RecruitersTypes =
    | GetRecruitersRequest
    | GetRecruitersSuccess
    | GetRecruitersFailure
    | AddRecruiterWorkTimeRequest
    | AddRecruiterWorkTimeSuccess
    | AddRecruiterWorkTimeFailure
    | EditRecruiterWorkTimeRequest
    | EditRecruiterWorkTimeSuccess
    | EditRecruiterWorkTimeFailure
    | RemoveRecruiterWorkTimeRequest
    | RemoveRecruiterWorkTimeSuccess
    | RemoveRecruiterWorkTimeFailure
    | SortRecruiters;
