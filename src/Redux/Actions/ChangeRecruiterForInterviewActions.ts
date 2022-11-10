import {
    ChangeRecruiterForInterviewFailure,
    ChangeRecruiterForInterviewPayload,
    ChangeRecruiterForInterviewRequest,
    ChangeRecruiterForInterviewSuccess,
} from "../Types/ChangeRecruiterForInterviewTypes";
import { ActionTypes } from "../ActionTypes";

export const changeRecruiterForInterviewRequest = (
    payload: ChangeRecruiterForInterviewPayload
): ChangeRecruiterForInterviewRequest => ({
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_REQUEST,
    payload,
});

export const changeRecruiterForInterviewSuccess = (
    payload: ChangeRecruiterForInterviewPayload
): ChangeRecruiterForInterviewSuccess => ({
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_SUCCESS,
    payload,
});

export const changeRecruiterForInterviewFailure = (payload: string): ChangeRecruiterForInterviewFailure => ({
    type: ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_FAILURE,
    payload: { error: payload },
});
