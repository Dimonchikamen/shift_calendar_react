import { ActionTypes } from "../ActionTypes";
import { ResizeAction } from "../Types/MainReducerTypes";

export const resizeAction = (): ResizeAction => ({
    type: ActionTypes.RESIZE,
});
