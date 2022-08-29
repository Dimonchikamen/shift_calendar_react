import { ActionTypes } from "../ActionTypes";
import { ViewTypes } from "react-big-scheduler";
import { ScheduleEvent } from "../../Types/ScheduleEvent";

export type ChangeEvent = {
    type: ActionTypes.CHANGE_EVENT;
    payload: string;
};

export type ChangeEndDay = {
    type: ActionTypes.CHANGE_END_DAY;
    payload: number;
};

export type ChangeStartDay = {
    type: ActionTypes.CHANGE_START_DAY;
    payload: number;
};

export type ChangeInterviewTime = {
    type: ActionTypes.CHANGE_INTERVIEW_TIME;
    payload: number;
};

export type ChangeViewType = {
    type: ActionTypes.CHANGE_VIEW_TYPE;
    payload: ViewTypes;
};

export type AddRecruiterEvent = {
    type: ActionTypes.ADD_RECRUITER_EVENT;
    payload: ScheduleEvent;
};

export type RemoveRecruiterEvent = {
    type: ActionTypes.REMOVE_RECRUITER_EVENT;
    payload: ScheduleEvent;
};

export type EditRecruiterEvent = {
    type: ActionTypes.EDIT_RECRUITER_EVENT;
    payload: ScheduleEvent;
};

export type ResizeAction = {
    type: ActionTypes.RESIZE;
};

export type MainActions =
    | ChangeEvent
    | ChangeStartDay
    | ChangeEndDay
    | ChangeInterviewTime
    | ChangeViewType
    | AddRecruiterEvent
    | RemoveRecruiterEvent
    | EditRecruiterEvent
    | ResizeAction;
