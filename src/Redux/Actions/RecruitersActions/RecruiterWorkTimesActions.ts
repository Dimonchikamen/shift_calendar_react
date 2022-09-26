import {
    AddRecruiterWorkTimeFailure,
    AddRecruiterWorkTimeRequest,
    AddRecruiterWorkTimeSuccess,
    EditRecruiterWorkTimeFailure,
    EditRecruiterWorkTimeRequest,
    EditRecruiterWorkTimeSuccess,
    FailurePayload,
    RemoveRecruiterWorkTimeFailure,
    RemoveRecruiterWorkTimeRequest,
    RemoveRecruiterWorkTimeSuccess,
} from "../../Types/RecruitersTypes";
import { ActionTypes } from "../../ActionTypes";
import { WorkTimeResponse } from "../../../Types/WorkTimeResponse";

export const addRecruiterWorkTimeRequest = (start: Date, end: Date): AddRecruiterWorkTimeRequest => ({
    type: ActionTypes.ADD_RECRUITER_WORK_TIME_REQUEST,
    payload: { start, end },
});

export const addRecruiterWorkTimeSuccess = (payload: WorkTimeResponse): AddRecruiterWorkTimeSuccess => ({
    type: ActionTypes.ADD_RECRUITER_WORK_TIME_SUCCESS,
    payload,
});

export const addRecruiterWorkTimeFailure = (payload: FailurePayload): AddRecruiterWorkTimeFailure => ({
    type: ActionTypes.ADD_RECRUITER_WORK_TIME_FAILURE,
    payload,
});

export const editRecruiterWorkTimeRequest = (
    start: Date,
    end: Date,
    workTimeId: number
): EditRecruiterWorkTimeRequest => ({
    type: ActionTypes.EDIT_RECRUITER_WORK_TIME_REQUEST,
    payload: { start, end, workTimeId },
});

export const editRecruiterWorkTimeSuccess = (payload: WorkTimeResponse): EditRecruiterWorkTimeSuccess => ({
    type: ActionTypes.EDIT_RECRUITER_WORK_TIME_SUCCESS,
    payload,
});

export const editRecruiterWorkTimeFailure = (payload: FailurePayload): EditRecruiterWorkTimeFailure => ({
    type: ActionTypes.EDIT_RECRUITER_WORK_TIME_FAILURE,
    payload,
});

export const removeRecruiterWorkTimeRequest = (workTimeId: number): RemoveRecruiterWorkTimeRequest => ({
    type: ActionTypes.REMOVE_RECRUITER_WORK_TIME_REQUEST,
    payload: { workTimeId },
});

export const removeRecruiterWorkTimeSuccess = (payload: number): RemoveRecruiterWorkTimeSuccess => ({
    type: ActionTypes.REMOVE_RECRUITER_WORK_TIME_SUCCESS,
    payload,
});

export const removeRecruiterWorkTimeFailure = (payload: FailurePayload): RemoveRecruiterWorkTimeFailure => ({
    type: ActionTypes.REMOVE_RECRUITER_WORK_TIME_FAILURE,
    payload,
});
