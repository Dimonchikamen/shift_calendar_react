import { ActionTypes } from "../ActionTypes";
import { CloseErrorWindow } from "../Types/MainReducerTypes";
import { RecruitersTypes } from "../Types/RecruitersTypes";
import { GlobalState } from "../../Types/GlobalState";

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
        const copy = JSON.parse(JSON.stringify(state));
        // добавляем ворктайм
        copy.workTimes.push(action.payload);
        // сортируем
        copy.workTimes.sort((a: any, b: any) => {
            if (a.start > b.start) return 1;
            if (a.start < b.start) return -1;
            return 0;
        });
        return {
            ...copy,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.EDIT_RECRUITER_WORK_TIME_SUCCESS) {
        const copy = JSON.parse(JSON.stringify(state));
        // убираем вокртайм по id
        copy.workTimes = copy.workTimes.filter((item: any) => item.id !== action.payload.id);
        // вставляем новый вместо старого
        copy.workTimes.push(action.payload);
        // сортируем
        copy.workTimes.sort((a: any, b: any) => {
            if (a.start > b.start) return 1;
            if (a.start < b.start) return -1;
            return 0;
        });
        return {
            ...copy,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.REMOVE_RECRUITER_WORK_TIME_SUCCESS) {
        const copy = JSON.parse(JSON.stringify(state));
        // тут убираем по id
        copy.workTimes = copy.workTimes.filter((item: any) => item.id !== action.payload);
        return {
            ...copy,
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
