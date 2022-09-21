import { ActionTypes } from "../../ActionTypes";
import {
    GetRecruiterWorkTimesRequest,
    FailurePayload,
    GetRecruiterWorkTimesSuccess,
    GetRecruiterWorkTimesFailure,
} from "../../Types/RecruitersTypes";
import { WorkTime } from "../../../Types/WorkTime";

export const getRecruiterWorkTimesRequest = (year: number, month: number): GetRecruiterWorkTimesRequest => ({
    type: ActionTypes.GET_RECRUITER_WORK_TIMES_REQUEST,
    payload: { year, month },
});

export const getRecruiterWorkTimesSuccess = (payload: WorkTime[]): GetRecruiterWorkTimesSuccess => ({
    type: ActionTypes.GET_RECRUITER_WORK_TIMES_SUCCESS,
    payload,
});

export const getRecruiterWorkTimesFailure = (payload: FailurePayload): GetRecruiterWorkTimesFailure => ({
    type: ActionTypes.GET_RECRUITER_WORK_TIMES_FAILURE,
    payload,
});
