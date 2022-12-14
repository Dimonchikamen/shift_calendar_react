import {
    FailurePayload,
    GetInterviewTimeFailure,
    GetInterviewTimeRequest,
    GetInterviewTimeSuccess,
} from "../../Types/InterviewTimeTypes";
import { ActionTypes } from "../../ActionTypes";

export const getInterviewTimeRequest = (): GetInterviewTimeRequest => ({
    type: ActionTypes.GET_INTERVIEW_TIME_REQUEST,
});

export const getInterviewTimeSuccess = (payload: number | ""): GetInterviewTimeSuccess => ({
    type: ActionTypes.GET_INTERVIEW_TIME_SUCCESS,
    payload,
});

export const getInterviewTimeFailure = (payload: FailurePayload): GetInterviewTimeFailure => ({
    type: ActionTypes.GET_INTERVIEW_TIME_FAILURE,
    payload,
});
