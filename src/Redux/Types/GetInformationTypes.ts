import { ActionTypes } from "../ActionTypes";
import { GetInformationResponse } from "../../Types/GetInformationResponse";

export interface GetInformationRequestPayload {
    start: Date;
    end: Date;
}

export interface FailurePayload {
    error: string;
}

export type GetInformationRequest = {
    type: ActionTypes.GET_INFORMATION_REQUEST;
    payload: GetInformationRequestPayload;
};

export type GetInformationSuccess = {
    type: ActionTypes.GET_INFORMATION_SUCCESS;
    payload: GetInformationResponse;
};

export type GetInformationFailure = {
    type: ActionTypes.GET_INFORMATION_FAILURE;
    payload: FailurePayload;
};

export type GetInformationTypes = GetInformationRequest | GetInformationSuccess | GetInformationFailure;
