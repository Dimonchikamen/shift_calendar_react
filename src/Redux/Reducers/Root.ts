import { combineReducers } from "redux";
import mainReducer from "./MainReducer";
import WorkDayReducer from "./WorkDayReducer";

const rootReducer = combineReducers({
    //main: mainReducer,
    workDayState: WorkDayReducer,
});

export default rootReducer;
