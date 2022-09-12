import { ActionTypes } from "../ActionTypes";

export interface GetWorkTimeRequestPayload {
    date: Date;
    eventId: number;
}

export interface GetWorkTimeSuccessPayload {
    start: number;
    end: number;
}

export interface ChangeWorkTimeRequestPayload {
    eventId: number;
    date: Date;
    start: number;
    end: number;
}
export interface ChangeWorkTimePayload {
    start: number;
    end: number;
}

export interface FailurePayload {
    error: string;
}

export type ChangeStartDay = {
    type: ActionTypes.CHANGE_START_DAY;
    payload: number;
};

export type ChangeEndDay = {
    type: ActionTypes.CHANGE_END_DAY;
    payload: number;
};

export type GetWorkTimeRequest = {
    type: ActionTypes.GET_WORK_TIME_REQUEST;
    payload: GetWorkTimeRequestPayload;
};

export type GetWorkTimeSuccess = {
    type: ActionTypes.GET_WORK_TIME_SUCCESS;
    payload: GetWorkTimeSuccessPayload | "";
};

export type GetWorkTimeFailure = {
    type: ActionTypes.GET_WORK_TIME_FAILURE;
    payload: FailurePayload;
};

export type ChangeWorkTimeRequest = {
    type: ActionTypes.CHANGE_WORK_TIME_REQUEST;
    payload: ChangeWorkTimeRequestPayload;
};

export type ChangeWorkTimeSuccess = {
    type: ActionTypes.CHANGE_WORK_TIME_SUCCESS;
    payload: ChangeWorkTimePayload;
};

export type ChangeWorkTimeFailure = {
    type: ActionTypes.CHANGE_WORK_TIME_FAILURE;
    payload: FailurePayload;
};

export type WorkTimeTypes =
    | ChangeStartDay
    | ChangeEndDay
    | GetWorkTimeRequest
    | GetWorkTimeSuccess
    | GetWorkTimeFailure
    | ChangeWorkTimeRequest
    | ChangeWorkTimeSuccess
    | ChangeWorkTimeFailure;
