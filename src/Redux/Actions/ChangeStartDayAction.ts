import { ActionTypes } from "../ActionTypes";
import { ChangeStartDay } from "../Types/MainReducerTypes";

export const changeStartDayAction = (newDayStart: number): ChangeStartDay => ({
    type: ActionTypes.CHANGE_START_DAY_SUCCESS,
    payload: newDayStart,
});
