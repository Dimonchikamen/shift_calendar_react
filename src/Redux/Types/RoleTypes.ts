import { ActionTypes } from "../ActionTypes";

export interface FailurePayload {
    error: string;
}

export type GetRoleRequest = {
    type: ActionTypes.GET_ROLE_REQUEST;
};

export type GetRoleSuccess = {
    type: ActionTypes.GET_ROLE_SUCCESS;
    payload: string;
};

export type GetRoleFailure = {
    type: ActionTypes.GET_ROLE_FAILURE;
    payload: FailurePayload;
};

export type RoleTypes = GetRoleRequest | GetRoleSuccess | GetRoleFailure;
