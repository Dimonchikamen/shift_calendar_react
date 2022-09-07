import {
    ChangeWorkDayFailure,
    ChangeWorkDayRequest,
    ChangeWorkDaySuccess,
    FailurePayload,
    GetWorkDayFailure,
    GetWorkDayRequest,
    GetWorkDaySuccess,
    GetWorkDayPayload,
    ChangeWorkDayPayload,
} from "../../Types/WorkDayTypes";
import { ActionTypes } from "../../ActionTypes";

export const getWorkDayRequest = (date: Date): GetWorkDayRequest => ({
    type: ActionTypes.GET_WORK_DAY_REQUEST,
    payload: date,
});

export const getWorkDaySuccess = (payload: GetWorkDayPayload | ""): GetWorkDaySuccess => ({
    type: ActionTypes.GET_WORK_DAY_SUCCESS,
    payload,
});

export const getWorkDayFailure = (payload: FailurePayload): GetWorkDayFailure => ({
    type: ActionTypes.GET_WORK_DAY_FAILURE,
    payload,
});

export const changeWorkDayRequest = (start: number, end: number): ChangeWorkDayRequest => ({
    type: ActionTypes.CHANGE_WORK_DAY_REQUEST,
    payload: { start, end },
});

export const changeWorkDaySuccess = (payload: ChangeWorkDayPayload): ChangeWorkDaySuccess => ({
    type: ActionTypes.CHANGE_WORK_DAY_SUCCESS,
    payload,
});

export const changeWorkDayFailure = (payload: FailurePayload): ChangeWorkDayFailure => ({
    type: ActionTypes.CHANGE_WORK_DAY_FAILURE,
    payload,
});
