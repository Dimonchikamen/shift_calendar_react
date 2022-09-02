import {
    AddRecruiterWorkTimeFailure,
    AddRecruiterWorkTimeRequest,
    AddRecruiterWorkTimeSuccess,
    EditRecruiterRequestPayload,
    EditRecruiterWorkTimeFailure,
    EditRecruiterWorkTimeRequest,
    EditRecruiterWorkTimeSuccess,
    FailurePayload,
    RemoveRecruiterWorkTimeFailure,
    RemoveRecruiterWorkTimeRequest,
    RemoveRecruiterWorkTimeSuccess,
} from "../../Types/RecruitersTypes";
import { ActionTypes } from "../../ActionTypes";
import { Recruiter } from "../../../Types/Recruiter";

export const addRecruiterWorkTimeRequest = (
    start: Date,
    end: Date,
    recruiterId: number,
    event: string
): AddRecruiterWorkTimeRequest => ({
    type: ActionTypes.ADD_RECRUITER_EVENT_REQUEST,
    payload: { start, end, recruiterId, event },
});

export const addRecruiterWorkTimeSuccess = (payload: Recruiter): AddRecruiterWorkTimeSuccess => ({
    type: ActionTypes.ADD_RECRUITER_EVENT_SUCCESS,
    payload,
});

export const addRecruiterWorkTimeFailure = (payload: FailurePayload): AddRecruiterWorkTimeFailure => ({
    type: ActionTypes.ADD_RECRUITER_EVENT_FAILURE,
    payload,
});

export const editRecruiterWorkTimeRequest = (
    start: Date,
    end: Date,
    recruiterId: number,
    workTimeId: number
): EditRecruiterWorkTimeRequest => ({
    type: ActionTypes.EDIT_RECRUITER_EVENT_REQUEST,
    payload: { start, end, recruiterId, workTimeId },
});

export const editRecruiterWorkTimeSuccess = (payload: Recruiter): EditRecruiterWorkTimeSuccess => ({
    type: ActionTypes.EDIT_RECRUITER_EVENT_SUCCESS,
    payload,
});

export const editRecruiterWorkTimeFailure = (payload: FailurePayload): EditRecruiterWorkTimeFailure => ({
    type: ActionTypes.EDIT_RECRUITER_EVENT_FAILURE,
    payload,
});

export const removeRecruiterWorkTimeRequest = (
    recruiterId: number,
    workTimeId: number
): RemoveRecruiterWorkTimeRequest => ({
    type: ActionTypes.REMOVE_RECRUITER_EVENT_REQUEST,
    payload: { recruiterId, workTimeId },
});

export const removeRecruiterWorkTimeSuccess = (payload: Recruiter): RemoveRecruiterWorkTimeSuccess => ({
    type: ActionTypes.REMOVE_RECRUITER_EVENT_SUCCESS,
    payload,
});

export const removeRecruiterWorkTimeFailure = (payload: FailurePayload): RemoveRecruiterWorkTimeFailure => ({
    type: ActionTypes.REMOVE_RECRUITER_EVENT_FAILURE,
    payload,
});
