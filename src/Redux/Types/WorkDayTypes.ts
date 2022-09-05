import { ActionTypes } from "../ActionTypes";

export interface FailurePayload {
    error: string;
}

export type GetStartDayRequest = {
    type: ActionTypes.GET_START_DAY_REQUEST;
};

export type GetStartDaySuccess = {
    type: ActionTypes.GET_START_DAY_SUCCESS;
    payload: number | "";
};

export type GetStartDayFailure = {
    type: ActionTypes.GET_START_DAY_FAILURE;
    payload: FailurePayload;
};

export type GetEndDayRequest = {
    type: ActionTypes.GET_END_DAY_REQUEST;
};

export type GetEndDaySuccess = {
    type: ActionTypes.GET_END_DAY_SUCCESS;
    payload: number | "";
};

export type GetEndDayFailure = {
    type: ActionTypes.GET_END_DAY_FAILURE;
    payload: FailurePayload;
};

export type ChangeStartDayRequest = {
    type: ActionTypes.CHANGE_START_DAY_REQUEST;
    payload: number;
};

export type ChangeStartDaySuccess = {
    type: ActionTypes.CHANGE_START_DAY_SUCCESS;
    payload: number;
};

export type ChangeStartDayFailure = {
    type: ActionTypes.CHANGE_START_DAY_FAILURE;
    payload: FailurePayload;
};

export type ChangeEndDayRequest = {
    type: ActionTypes.CHANGE_END_DAY_REQUEST;
    payload: number;
};

export type ChangeEndDaySuccess = {
    type: ActionTypes.CHANGE_END_DAY_SUCCESS;
    payload: number;
};

export type ChangeEndDayFailure = {
    type: ActionTypes.CHANGE_END_DAY_FAILURE;
    payload: FailurePayload;
};

export type WorkDayTypes =
    | GetStartDayRequest
    | GetStartDaySuccess
    | GetStartDayFailure
    | GetEndDayRequest
    | GetEndDaySuccess
    | GetEndDayFailure
    | ChangeStartDayRequest
    | ChangeStartDaySuccess
    | ChangeStartDayFailure
    | ChangeEndDayRequest
    | ChangeEndDaySuccess
    | ChangeEndDayFailure;
