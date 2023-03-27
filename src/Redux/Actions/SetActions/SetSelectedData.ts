import { RecruiterInfo } from "../../../Types/RecruiterInfo";
import { SetSelectedData } from "../../Types/MainReducerTypes";
import { ActionTypes } from "../../ActionTypes";

export const setSelectedData = (payload: RecruiterInfo | null): SetSelectedData => ({
    type: ActionTypes.SET_SELECTED_DATA,
    payload,
});
