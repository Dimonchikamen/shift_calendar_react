import { ActionTypes } from "../ActionTypes";

export type SetInterviewRoleAction = {
    type: ActionTypes.SET_INTERVIEW_ROLE;
    payload: string;
};

export type InterviewRoleTypes = SetInterviewRoleAction;
