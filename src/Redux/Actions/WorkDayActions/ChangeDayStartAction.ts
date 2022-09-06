import { ActionTypes } from "../../ActionTypes";
import { ChangeStartDay } from "../../Types/WorkDayTypes";

export const changeDayStart = (newStart: number): ChangeStartDay => ({
    type: ActionTypes.CHANGE_START_DAY,
    payload: newStart,
});
