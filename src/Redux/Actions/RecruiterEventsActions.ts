import { ActionTypes } from "../ActionTypes";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import { AddRecruiterEvent, EditRecruiterEvent, RemoveRecruiterEvent } from "../Types/MainReducerTypes";

export const addRecruiterEventAction = (event: ScheduleEvent): AddRecruiterEvent => ({
    type: ActionTypes.ADD_RECRUITER_EVENT,
    payload: event,
});

export const removeRecruiterEventAction = (event: ScheduleEvent): RemoveRecruiterEvent => ({
    type: ActionTypes.REMOVE_RECRUITER_EVENT,
    payload: event,
});

export const editRecruiterEventAction = (event: ScheduleEvent): EditRecruiterEvent => ({
    type: ActionTypes.EDIT_RECRUITER_EVENT,
    payload: event,
});
