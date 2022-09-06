import { ChangeEndDay } from "../../Types/WorkDayTypes";
import { ActionTypes } from "../../ActionTypes";

export const changeDayEnd = (newEnd: number): ChangeEndDay => ({
    type: ActionTypes.CHANGE_END_DAY,
    payload: newEnd,
});
