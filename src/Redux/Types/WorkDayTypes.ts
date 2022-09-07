import { ActionTypes } from "../ActionTypes";

export interface GetWorkDayPayload {
    start: number;
    end: number;
}

export interface ChangeWorkDayPayload {
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

export type GetWorkDayRequest = {
    type: ActionTypes.GET_WORK_DAY_REQUEST;
    payload: Date;
};

export type GetWorkDaySuccess = {
    type: ActionTypes.GET_WORK_DAY_SUCCESS;
    payload: GetWorkDayPayload | "";
};

export type GetWorkDayFailure = {
    type: ActionTypes.GET_WORK_DAY_FAILURE;
    payload: FailurePayload;
};

export type ChangeWorkDayRequest = {
    type: ActionTypes.CHANGE_WORK_DAY_REQUEST;
    payload: ChangeWorkDayPayload;
};

export type ChangeWorkDaySuccess = {
    type: ActionTypes.CHANGE_WORK_DAY_SUCCESS;
    payload: ChangeWorkDayPayload;
};

export type ChangeWorkDayFailure = {
    type: ActionTypes.CHANGE_WORK_DAY_FAILURE;
    payload: FailurePayload;
};

export type WorkDayTypes =
    | ChangeStartDay
    | ChangeEndDay
    | GetWorkDayRequest
    | GetWorkDaySuccess
    | GetWorkDayFailure
    | ChangeWorkDayRequest
    | ChangeWorkDaySuccess
    | ChangeWorkDayFailure;
