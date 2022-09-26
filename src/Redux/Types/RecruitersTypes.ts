import { ActionTypes } from "../ActionTypes";
import { WorkTime } from "../../Types/WorkTime";
import { WorkTimeResponse } from "../../Types/WorkTimeResponse";

export interface GetRecruiterWorkTimesRequestPayload {
    year: number;
    month: number;
}

export interface AddRecruiterRequestPayload {
    start: Date;
    end: Date;
}

export interface EditRecruiterRequestPayload {
    start: Date;
    end: Date;
    workTimeId: number;
}

export interface RemoveRecruiterRequestPayload {
    workTimeId: number;
}

export interface FailurePayload {
    error: string;
}

export type GetRecruiterWorkTimesRequest = {
    type: ActionTypes.GET_RECRUITER_WORK_TIMES_REQUEST;
    payload: GetRecruiterWorkTimesRequestPayload;
};

export type GetRecruiterWorkTimesSuccess = {
    type: ActionTypes.GET_RECRUITER_WORK_TIMES_SUCCESS;
    payload: WorkTime[];
};

export type GetRecruiterWorkTimesFailure = {
    type: ActionTypes.GET_RECRUITER_WORK_TIMES_FAILURE;
    payload: FailurePayload;
};

export type AddRecruiterWorkTimeRequest = {
    type: ActionTypes.ADD_RECRUITER_WORK_TIME_REQUEST;
    payload: AddRecruiterRequestPayload;
};

export type AddRecruiterWorkTimeSuccess = {
    type: ActionTypes.ADD_RECRUITER_WORK_TIME_SUCCESS;
    payload: WorkTimeResponse;
};

export type AddRecruiterWorkTimeFailure = {
    type: ActionTypes.ADD_RECRUITER_WORK_TIME_FAILURE;
    payload: FailurePayload;
};

export type EditRecruiterWorkTimeRequest = {
    type: ActionTypes.EDIT_RECRUITER_WORK_TIME_REQUEST;
    payload: EditRecruiterRequestPayload;
};

export type EditRecruiterWorkTimeSuccess = {
    type: ActionTypes.EDIT_RECRUITER_WORK_TIME_SUCCESS;
    payload: WorkTimeResponse;
};

export type EditRecruiterWorkTimeFailure = {
    type: ActionTypes.EDIT_RECRUITER_WORK_TIME_FAILURE;
    payload: FailurePayload;
};

export type RemoveRecruiterWorkTimeRequest = {
    type: ActionTypes.REMOVE_RECRUITER_WORK_TIME_REQUEST;
    payload: RemoveRecruiterRequestPayload;
};

export type RemoveRecruiterWorkTimeSuccess = {
    type: ActionTypes.REMOVE_RECRUITER_WORK_TIME_SUCCESS;
    payload: number;
};

export type RemoveRecruiterWorkTimeFailure = {
    type: ActionTypes.REMOVE_RECRUITER_WORK_TIME_FAILURE;
    payload: FailurePayload;
};

export type RecruitersTypes =
    | GetRecruiterWorkTimesRequest
    | GetRecruiterWorkTimesSuccess
    | GetRecruiterWorkTimesFailure
    | AddRecruiterWorkTimeRequest
    | AddRecruiterWorkTimeSuccess
    | AddRecruiterWorkTimeFailure
    | EditRecruiterWorkTimeRequest
    | EditRecruiterWorkTimeSuccess
    | EditRecruiterWorkTimeFailure
    | RemoveRecruiterWorkTimeRequest
    | RemoveRecruiterWorkTimeSuccess
    | RemoveRecruiterWorkTimeFailure;
