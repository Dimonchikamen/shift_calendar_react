import {
    FailurePayload,
    GetInformationFailure,
    GetInformationRequest,
    GetInformationSuccess,
} from "../Types/GetInformationTypes";
import { ActionTypes } from "../ActionTypes";
import { GetInformationResponse } from "../../Types/GetInformationResponse";

export const getInformationRequest = (start: Date, end: Date): GetInformationRequest => ({
    type: ActionTypes.GET_INFORMATION_REQUEST,
    payload: { start, end },
});

export const getInformationSuccess = (payload: GetInformationResponse): GetInformationSuccess => ({
    type: ActionTypes.GET_INFORMATION_SUCCESS,
    payload,
});

export const getInformationFailure = (payload: FailurePayload): GetInformationFailure => ({
    type: ActionTypes.GET_INFORMATION_FAILURE,
    payload,
});
