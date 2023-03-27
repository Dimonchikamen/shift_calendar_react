import { ScheduleEvent } from "../../../Types/ScheduleEvent";
import { ScheduleInterviewEvent } from "../../../Types/ScheduleInterviewEvent";
import { SetSelectedEvent } from "../../Types/MainReducerTypes";
import { ActionTypes } from "../../ActionTypes";

export const setSelectedEvent = (payload: ScheduleEvent | ScheduleInterviewEvent | null): SetSelectedEvent => ({
    type: ActionTypes.SET_SELECTED_EVENT,
    payload,
});
