import { ActionTypes } from "../ActionTypes";
import { FullDateTime } from "../../Types/FullDateTime";
import { Recruiter } from "../../Types/Recruiter";

export interface SignUpVolunteerRequestPayload {
    recruiterWorkTimeId: number;
    roleId: number;
    start: FullDateTime;
    end: FullDateTime;
}

export interface FailurePayload {
    error: string;
}

export type SignUpVolunteerRequest = {
    type: ActionTypes.SIGN_UP_VOLUNTEER_REQUEST;
    payload: SignUpVolunteerRequestPayload;
};

export type SignUpVolunteerSuccess = {
    type: ActionTypes.SIGN_UP_VOLUNTEER_SUCCESS;
    payload: Recruiter;
};

export type SignUpVolunteerFailure = {
    type: ActionTypes.SIGN_UP_VOLUNTEER_FAILURE;
    payload: FailurePayload;
};

export type SignUpVolunteerTypes = SignUpVolunteerRequest | SignUpVolunteerSuccess | SignUpVolunteerFailure;
