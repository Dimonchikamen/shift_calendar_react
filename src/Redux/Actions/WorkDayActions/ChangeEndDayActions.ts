import {
    ChangeEndDayFailure,
    ChangeEndDayRequest,
    ChangeEndDaySuccess,
    FailurePayload,
} from "../../Types/WorkDayTypes";
import { ActionTypes } from "../../ActionTypes";

export const changeEndDayRequest = (newStart: number): ChangeEndDayRequest => ({
    type: ActionTypes.CHANGE_END_DAY_REQUEST,
    payload: newStart,
});

export const changeEndDaySuccess = (payload: number): ChangeEndDaySuccess => ({
    type: ActionTypes.CHANGE_END_DAY_SUCCESS,
    payload,
});

export const changeEndDayFailure = (payload: FailurePayload): ChangeEndDayFailure => ({
    type: ActionTypes.CHANGE_END_DAY_FAILURE,
    payload,
});
