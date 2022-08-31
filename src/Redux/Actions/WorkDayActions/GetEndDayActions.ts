import { FailurePayload, GetEndDayFailure, GetEndDayRequest, GetEndDaySuccess } from "../../Types/WorkDayTypes";
import { ActionTypes } from "../../ActionTypes";

export const getEndDayRequest = (): GetEndDayRequest => ({
    type: ActionTypes.GET_END_DAY_REQUEST,
});

export const getEndDaySuccess = (payload: number): GetEndDaySuccess => ({
    type: ActionTypes.GET_END_DAY_SUCCESS,
    payload,
});

export const getEndDayFailure = (payload: FailurePayload): GetEndDayFailure => ({
    type: ActionTypes.GET_END_DAY_FAILURE,
    payload,
});
