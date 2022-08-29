import { ActionTypes } from "../ActionTypes";
import { ChangeInterviewTime } from "../Types/MainReducerTypes";

export const changeInterviewTimeAction = (newInterviewTime: number): ChangeInterviewTime => ({
    type: ActionTypes.CHANGE_INTERVIEW_TIME,
    payload: newInterviewTime,
});
