import { FailurePayload, GetRoleFailure, GetRoleRequest, GetRoleSuccess } from "../Types/RoleTypes";
import { ActionTypes } from "../ActionTypes";

export const getRoleRequest = (): GetRoleRequest => ({
    type: ActionTypes.GET_ROLE_REQUEST,
});

export const getRoleSuccess = (payload: string): GetRoleSuccess => ({
    type: ActionTypes.GET_ROLE_SUCCESS,
    payload,
});

export const getRoleFailure = (payload: FailurePayload): GetRoleFailure => ({
    type: ActionTypes.GET_ROLE_FAILURE,
    payload,
});
