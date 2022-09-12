import { ActionTypes } from "../../ActionTypes";
import { ChangeStartDay } from "../../Types/WorkTimeTypes";

export const changeDayStart = (newStart: number): ChangeStartDay => ({
    type: ActionTypes.CHANGE_START_DAY,
    payload: newStart,
});
