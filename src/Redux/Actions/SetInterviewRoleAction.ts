import { SetInterviewRoleAction } from "../Types/InterviewRoleTypes";
import { ActionTypes } from "../ActionTypes";

export const setInterviewRoleAction = (payload: string): SetInterviewRoleAction => ({
    type: ActionTypes.SET_INTERVIEW_ROLE,
    payload,
});
