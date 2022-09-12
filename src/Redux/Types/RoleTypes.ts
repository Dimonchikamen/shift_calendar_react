import { ActionTypes } from "../ActionTypes";

export type SetRoleAction = {
    type: ActionTypes.SET_ROLE;
    payload: string;
};

export type RoleTypes = SetRoleAction;
