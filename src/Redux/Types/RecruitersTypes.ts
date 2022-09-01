import { ActionTypes } from "../ActionTypes";
import { Recruiter } from "../../Types/Recruiter";

export interface FailurePayload {
    error: string;
}

export type GetRecruitersRequest = {
    type: ActionTypes.GET_RECRUITERS_REQUEST;
    payload: { start?: Date; end?: Date };
};

export type GetRecruitersSuccess = {
    type: ActionTypes.GET_RECRUITERS_SUCCESS;
    payload: Recruiter[];
};

export type GetRecruitersFailure = {
    type: ActionTypes.GET_RECRUITERS_FAILURE;
    payload: FailurePayload;
};

export type SortRecruiters = {
    type: ActionTypes.FILTER_RECRUITERS;
    payload: string;
};

export type RecruitersTypes = GetRecruitersRequest | GetRecruitersSuccess | GetRecruitersFailure | SortRecruiters;
