import {
    FailurePayload,
    SignUpVolunteerRequest,
    SignUpVolunteerRequestPayload,
    SignUpVolunteerSuccess,
} from "../Types/SignUpVolunteerTypes";
import { ActionTypes } from "../ActionTypes";
import { FullDateTime } from "../../Types/FullDateTime";
import { Recruiter } from "../../Types/Recruiter";

export const signUpVolunteerRequest = (
    recruiterWorkTimeId: number,
    roleId: number,
    start: FullDateTime,
    end: FullDateTime
): SignUpVolunteerRequest => ({
    type: ActionTypes.SIGN_UP_VOLUNTEER_REQUEST,
    payload: { recruiterWorkTimeId, roleId, start, end },
});

export const signUpVolunteerSuccess = (payload: SignUpVolunteerRequestPayload): SignUpVolunteerSuccess => ({
    type: ActionTypes.SIGN_UP_VOLUNTEER_SUCCESS,
    payload,
});

export const signUpVolunteerFailure = (payload: FailurePayload) => ({
    type: ActionTypes.SIGN_UP_VOLUNTEER_FAILURE,
    payload,
});
