import { ChangeEndDay } from "../../Types/WorkTimeTypes";
import { ActionTypes } from "../../ActionTypes";

export const changeDayEnd = (newEnd: number): ChangeEndDay => ({
    type: ActionTypes.CHANGE_END_DAY,
    payload: newEnd,
});
