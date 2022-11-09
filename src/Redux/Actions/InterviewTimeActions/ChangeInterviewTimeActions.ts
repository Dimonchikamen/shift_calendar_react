import {
    FailurePayload,
    ChangeInterviewTimeRequest,
    ChangeInterviewTimeSuccess,
    ChangeInterviewTimeFailure,
} from "../../Types/InterviewTimeTypes";
import { ActionTypes } from "../../ActionTypes";

export const changeInterviewTimeRequest = (
    eventId: number,
    newTime: number,
    currentDate: Date
): ChangeInterviewTimeRequest => ({
    type: ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST,
    payload: { eventId, newTime, currentDate },
});

export const changeInterviewTimeSuccess = (payload: number): ChangeInterviewTimeSuccess => ({
    type: ActionTypes.CHANGE_INTERVIEW_TIME_SUCCESS,
    payload,
});

export const changeInterviewTimeFailure = (payload: FailurePayload): ChangeInterviewTimeFailure => ({
    type: ActionTypes.CHANGE_INTERVIEW_TIME_FAILURE,
    payload,
});
