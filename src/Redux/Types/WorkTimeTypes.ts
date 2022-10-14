import { ActionTypes } from "../ActionTypes";

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

export type WorkTimeTypes = ChangeWorkTimeRequest | ChangeWorkTimeSuccess | ChangeWorkTimeFailure;
