import { ActionTypes } from "../ActionTypes";
import { CloseErrorWindow } from "../Types/MainReducerTypes";

export const closeErrorWindowAction = (): CloseErrorWindow => ({
    type: ActionTypes.CLOSE_ERROR_WINDOW,
});
