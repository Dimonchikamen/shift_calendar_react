import { ActionTypes } from "../ActionTypes";
import { CloseErrorWindow } from "../Types/MainReducerTypes";
import { RecruitersTypes } from "../Types/RecruitersTypes";
import { GlobalState } from "../../Types/GlobalState";
import { compareFullDateTime } from "../../Helpers/Compare";

const defaultState: GlobalState = {
    recruitersPending: false,
    changePending: false,
    workTimes: [],
    error: null,
    changeError: null,
};

const WorkDayReducer = (state = defaultState, action: CloseErrorWindow | RecruitersTypes): GlobalState => {
    if (action.type === ActionTypes.GET_RECRUITER_WORK_TIMES_REQUEST) {
        return { ...state, recruitersPending: true };
    } else if (action.type === ActionTypes.GET_RECRUITER_WORK_TIMES_SUCCESS) {
        return {
            ...state,
            workTimes: action.payload,
            recruitersPending: false,
            error: null,
            changeError: null,
        };
    } else if (action.type === ActionTypes.GET_RECRUITER_WORK_TIMES_FAILURE) {
        return {
            ...state,
            recruitersPending: false,
            error: action.payload.error,
            changeError: action.payload.error,
        };
    } else if (
        action.type === ActionTypes.ADD_RECRUITER_WORK_TIME_REQUEST ||
        action.type === ActionTypes.EDIT_RECRUITER_WORK_TIME_REQUEST ||
        action.type === ActionTypes.REMOVE_RECRUITER_WORK_TIME_REQUEST
    ) {
        return {
            ...state,
            changePending: true,
        };
    } else if (action.type === ActionTypes.ADD_RECRUITER_WORK_TIME_SUCCESS) {
        const workTimes = JSON.parse(JSON.stringify(state.workTimes));
        workTimes.push(action.payload);
        workTimes.sort(compareFullDateTime);
        return {
            ...state,
            workTimes: workTimes,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.EDIT_RECRUITER_WORK_TIME_SUCCESS) {
        const workTimes = JSON.parse(JSON.stringify(state.workTimes)).filter(
            (item: any) => item.id !== action.payload.id
        );
        workTimes.push(action.payload);
        workTimes.sort(compareFullDateTime);
        return {
            ...state,
            workTimes: workTimes,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.REMOVE_RECRUITER_WORK_TIME_SUCCESS) {
        const workTimes = JSON.parse(JSON.stringify(state.workTimes)).filter((item: any) => item.id !== action.payload);
        return {
            ...state,
            workTimes: workTimes,
            changePending: false,
            changeError: null,
        };
    } else if (
        action.type === ActionTypes.ADD_RECRUITER_WORK_TIME_FAILURE ||
        action.type === ActionTypes.EDIT_RECRUITER_WORK_TIME_FAILURE ||
        action.type === ActionTypes.REMOVE_RECRUITER_WORK_TIME_FAILURE
    ) {
        return { ...state, changePending: false, changeError: action.payload.error };
    } else if (action.type === ActionTypes.CLOSE_ERROR_WINDOW) {
        return { ...state, changeError: null };
    } else {
        return state;
    }
};

export default WorkDayReducer;
