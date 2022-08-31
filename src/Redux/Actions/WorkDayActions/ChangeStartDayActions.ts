import {
    ChangeStartDayFailure,
    ChangeStartDayRequest,
    ChangeStartDaySuccess,
    FailurePayload,
} from "../../Types/WorkDayTypes";
import { ActionTypes } from "../../ActionTypes";

export const changeStartDayRequest = (newStart: number): ChangeStartDayRequest => ({
    type: ActionTypes.CHANGE_START_DAY_REQUEST,
    payload: newStart,
});

export const changeStartDaySuccess = (payload: number): ChangeStartDaySuccess => ({
    type: ActionTypes.CHANGE_START_DAY_SUCCESS,
    payload,
});

export const changeStartDayFailure = (payload: FailurePayload): ChangeStartDayFailure => ({
    type: ActionTypes.CHANGE_START_DAY_FAILURE,
    payload,
});
