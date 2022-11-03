import { ActionTypes } from "../ActionTypes";
import { FullDateTime } from "../../Types/FullDateTime";

export interface SignUpVolunteerRequestPayload {
    workTimeId: number;
    roleId: number;
    start: FullDateTime;
    end: FullDateTime;
}

export interface SignVolunteerResponsePayload extends SignUpVolunteerRequestPayload {
    interviewId: number;
}

export interface SignUpVolunteerPayload extends SignUpVolunteerRequestPayload {
    currentInterviewId: number;
}

export interface SignVolunteerSuccessPayload extends SignUpVolunteerRequestPayload {
    interviewId: number;
    currentInterviewId: number;
}

export interface FailurePayload {
    error: string;
}

export type SignUpVolunteerRequest = {
    type: ActionTypes.SIGN_UP_VOLUNTEER_REQUEST;
    payload: SignUpVolunteerPayload;
};

export type SignUpVolunteerSuccess = {
    type: ActionTypes.SIGN_UP_VOLUNTEER_SUCCESS;
    payload: SignVolunteerSuccessPayload;
};

export type SignUpVolunteerFailure = {
    type: ActionTypes.SIGN_UP_VOLUNTEER_FAILURE;
    payload: FailurePayload;
};

export type SignUpVolunteerTypes = SignUpVolunteerRequest | SignUpVolunteerSuccess | SignUpVolunteerFailure;
