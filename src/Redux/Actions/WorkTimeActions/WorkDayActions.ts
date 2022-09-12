import {
    ChangeWorkTimeFailure,
    ChangeWorkTimeRequest,
    ChangeWorkTimeSuccess,
    FailurePayload,
    GetWorkTimeFailure,
    GetWorkTimeRequest,
    GetWorkTimeSuccess,
    GetWorkTimeSuccessPayload,
    ChangeWorkTimePayload,
} from "../../Types/WorkTimeTypes";
import { ActionTypes } from "../../ActionTypes";

export const getWorkTimeRequest = (date: Date, eventId: number): GetWorkTimeRequest => ({
    type: ActionTypes.GET_WORK_TIME_REQUEST,
    payload: { date, eventId },
});

export const getWorkTimeSuccess = (payload: GetWorkTimeSuccessPayload | ""): GetWorkTimeSuccess => ({
    type: ActionTypes.GET_WORK_TIME_SUCCESS,
    payload,
});

export const getWorkTimeFailure = (payload: FailurePayload): GetWorkTimeFailure => ({
    type: ActionTypes.GET_WORK_TIME_FAILURE,
    payload,
});

export const changeWorkTimeRequest = (
    eventId: number,
    date: Date,
    start: number,
    end: number
): ChangeWorkTimeRequest => ({
    type: ActionTypes.CHANGE_WORK_TIME_REQUEST,
    payload: { eventId, date, start, end },
});

export const changeWorkTimeSuccess = (payload: ChangeWorkTimePayload): ChangeWorkTimeSuccess => ({
    type: ActionTypes.CHANGE_WORK_TIME_SUCCESS,
    payload,
});

export const changeWorkTimeFailure = (payload: FailurePayload): ChangeWorkTimeFailure => ({
    type: ActionTypes.CHANGE_WORK_TIME_FAILURE,
    payload,
});
