import { combineReducers } from "redux";
import WorkDayReducer from "./WorkDayReducer";

const rootReducer = combineReducers({
    workDayState: WorkDayReducer,
});

export default rootReducer;
