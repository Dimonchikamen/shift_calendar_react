import {
    FailurePayload,
    SignUpVolunteerPayload,
    SignUpVolunteerRequest,
    SignUpVolunteerSuccess,
    SignVolunteerSuccessPayload,
} from "../Types/SignUpVolunteerTypes";
import { ActionTypes } from "../ActionTypes";

export const signUpVolunteerRequest = (payload: SignUpVolunteerPayload): SignUpVolunteerRequest => ({
    type: ActionTypes.SIGN_UP_VOLUNTEER_REQUEST,
    payload,
});

export const signUpVolunteerSuccess = (payload: SignVolunteerSuccessPayload): SignUpVolunteerSuccess => ({
    type: ActionTypes.SIGN_UP_VOLUNTEER_SUCCESS,
    payload,
});

export const signUpVolunteerFailure = (payload: FailurePayload) => ({
    type: ActionTypes.SIGN_UP_VOLUNTEER_FAILURE,
    payload,
});
