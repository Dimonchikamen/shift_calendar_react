import { ActionTypes } from "../ActionTypes";
import { ChangeDate } from "../Types/MainReducerTypes";

export const changeCurrentDateAction = (newDate: Date): ChangeDate => ({
    type: ActionTypes.CHANGE_DATE,
    payload: newDate,
});
