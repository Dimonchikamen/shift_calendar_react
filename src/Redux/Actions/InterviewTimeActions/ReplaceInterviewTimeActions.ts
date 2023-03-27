import { FullDateTime } from "../../../Types/FullDateTime";
import {
    ReplaceInterviewTimeFailure,
    ReplaceInterviewTimeRequest,
    ReplaceInterviewTimeSuccess,
} from "../../Types/InterviewTimeTypes";
import { ActionTypes } from "../../ActionTypes";

export const replaceInterviewTimeRequest = (
    interviewId: number,
    workTimeId: number,
    newDate: FullDateTime
): ReplaceInterviewTimeRequest => ({
    type: ActionTypes.REPLACE_INTERVIEW_TIME_REQUEST,
    payload: { interviewId, workTimeId, newDate },
});

export const replaceInterviewTimeSuccess = (payload: any): ReplaceInterviewTimeSuccess => ({
    type: ActionTypes.REPLACE_INTERVIEW_TIME_SUCCESS,
    payload,
});

export const replaceInterviewTimeFailure = (payload: { error: string }): ReplaceInterviewTimeFailure => ({
    type: ActionTypes.REPLACE_INTERVIEW_TIME_FAILURE,
    payload,
});
