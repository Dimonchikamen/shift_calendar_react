import { combineReducers } from "redux";
import mainReducer from "./MainReducer";

const rootReducer = combineReducers({
    main: mainReducer,
});

export default rootReducer;
