import { combineReducers } from "redux";
import WorkDayReducer from "./WorkDayReducer";
import SnackBarReducer from "./SnackBarReducer/SnackBarReducer";

const rootReducer = combineReducers({
    workDayState: WorkDayReducer,
    snackBarState: SnackBarReducer,
});

export default rootReducer;
