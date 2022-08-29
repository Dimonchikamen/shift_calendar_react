import { ActionTypes } from "../ActionTypes";
import { ChangeEndDay } from "../Types/MainReducerTypes";

export const changeEndDayAction = (newEndDay: number): ChangeEndDay => ({
    type: ActionTypes.CHANGE_END_DAY,
    payload: newEndDay,
});
