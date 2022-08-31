import { FailurePayload, GetStartDayFailure, GetStartDayRequest, GetStartDaySuccess } from "../../Types/WorkDayTypes";
import { ActionTypes } from "../../ActionTypes";

export const getStartDayRequest = (): GetStartDayRequest => ({
    type: ActionTypes.GET_START_DAY_REQUEST,
});

export const getStartDaySuccess = (payload: number): GetStartDaySuccess => ({
    type: ActionTypes.GET_START_DAY_SUCCESS,
    payload,
});

export const getStartDayFailure = (payload: FailurePayload): GetStartDayFailure => ({
    type: ActionTypes.GET_START_DAY_FAILURE,
    payload,
});
