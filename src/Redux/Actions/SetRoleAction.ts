import { SetRoleAction } from "../Types/RoleTypes";
import { ActionTypes } from "../ActionTypes";

export const setRoleAction = (payload: string): SetRoleAction => ({
    type: ActionTypes.SET_ROLE,
    payload,
});
