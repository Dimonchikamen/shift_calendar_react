import { ActionTypes } from "../../ActionTypes";
import { SnackBarActionTypes } from "./SnackBarActionTypes";

type SnackBarState = {
    snackBarOpen: boolean;
};

const defaultState: SnackBarState = {
    snackBarOpen: false,
};

const SnackBarReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case SnackBarActionTypes.OPEN_SNACKBAR:
            return { ...state, snackBarOpen: true };
        case SnackBarActionTypes.CLOSE_SNACKBAR:
            return { ...state, snackBarOpen: false };
        default:
            return { ...state };
    }
};

export default SnackBarReducer;
