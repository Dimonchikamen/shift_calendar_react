import { WorkDayTypes } from "../Types/WorkDayTypes";
import { ActionTypes } from "../ActionTypes";
import { SchedulerDataConfig, ViewTypes } from "react-big-scheduler";
import { MainActions } from "../Types/MainReducerTypes";
import { getCopy } from "../Helpers/CopyHelper";
import { InterviewTimeTypes } from "../Types/InterviewTimeTypes";
import { Recruiter } from "../../Types/Recruiter";
import { EventsTypes } from "../Types/EventsTypes";
import { RecruitersTypes } from "../Types/RecruitersTypes";
import { filterRecruiters } from "../../Helpers/Filters";
import { RoleTypes } from "../Types/RoleTypes";

export type littleState = {
    role: string;
    events: string[];
    currentEvent: string;
    currentInterviewTime: number | "";
    currentDayStart: number | "";
    currentDayEnd: number | "";
    config: SchedulerDataConfig;
    viewType: ViewTypes;
    behaviours: object;
    recruiters: Recruiter[];
    currentRecruiters: Recruiter[];
};

export type STate = {
    rolePending: boolean;
    allEventsPending: boolean;
    recruitersPending: boolean;
    workTimePending: boolean;
    dayStartPending: boolean;
    dayEndPending: boolean;
    interviewTimePending: boolean;
    changePending: boolean;
    state: littleState;
    error: string | null;
    changeError: string | null;
};

const defaultState: STate = {
    rolePending: false,
    allEventsPending: false,
    recruitersPending: false,
    workTimePending: false,
    dayStartPending: false,
    dayEndPending: false,
    interviewTimePending: false,
    changePending: false,
    state: {
        role: "user",
        events: ["Все мероприятия", "Ночь Музеев", "Ночь Музыки"],
        currentEvent: "Все мероприятия",
        currentInterviewTime: "",
        currentDayStart: "",
        currentDayEnd: "",
        config: {
            dayCellWidth: 50,
            weekCellWidth: 1100 / 7,
            dayResourceTableWidth: 300,
            weekResourceTableWidth: 300,
            schedulerWidth: 1100,
            startResizable: true,
            endResizable: true,
            movable: false,
            resourceName: "Рекрутеры:",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            eventItemPopoverDateFormat: "D/MM",
            nonAgendaDayCellHeaderFormat: "H:mm",
            dayStartFrom: 9,
            dayStopTo: 19,
            minuteStep: 30,
            views: [
                { viewName: "День", viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false },
                { viewName: "Неделя", viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false },
            ],
        },
        viewType: ViewTypes.Day,
        behaviours: {
            isNonWorkingTimeFunc: () => false,
        },
        recruiters: [],
        currentRecruiters: [],
    },
    error: null,
    changeError: null,
};

const getDiff = (min: number, max: number) => max - min + 1;

const resize = (config: SchedulerDataConfig) => {
    const newWidth = window.innerWidth * 0.75;
    let newResourceTableWidth = config.dayResourceTableWidth;
    if (window.innerWidth < 1200) {
        newResourceTableWidth = 200;
    }
    const min = config.dayStartFrom;
    const max = config.dayStopTo;
    const minuteStep = config.minuteStep;
    const timeWidth = newWidth - newResourceTableWidth!;
    const newDayCellWidth = timeWidth / (getDiff(min!, max!) * (60 / minuteStep!));
    const newWeekCellWidth = timeWidth / 7;
    return {
        ...config,
        dayResourceTableWidth: newResourceTableWidth,
        weekResourceTableWidth: newResourceTableWidth,
        schedulerWidth: newWidth,
        dayCellWidth: newDayCellWidth,
        weekCellWidth: newWeekCellWidth,
    };
};

const WorkDayReducer = (
    state = defaultState,
    action: MainActions | WorkDayTypes | InterviewTimeTypes | EventsTypes | RecruitersTypes | RoleTypes
): typeof defaultState => {
    if (action.type === ActionTypes.GET_INTERVIEW_TIME_REQUEST) {
        return { ...state, interviewTimePending: true };
    } else if (action.type === ActionTypes.GET_EVENTS_REQUEST) {
        return { ...state, allEventsPending: true };
    } else if (action.type === ActionTypes.GET_RECRUITERS_REQUEST) {
        return { ...state, recruitersPending: true };
    } else if (action.type === ActionTypes.GET_ROLE_REQUEST) {
        return { ...state, rolePending: true };
    } else if (action.type === ActionTypes.GET_WORK_DAY_REQUEST) {
        return { ...state, workTimePending: true };
    } else if (
        action.type === ActionTypes.CHANGE_WORK_DAY_REQUEST ||
        action.type === ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST ||
        action.type === ActionTypes.CHANGE_EVENT_REQUEST
    ) {
        return { ...state, changePending: true };
    } else if (action.type === ActionTypes.GET_ROLE_SUCCESS) {
        const copy = getCopy(state.state);
        copy.role = action.payload;
        return { ...state, rolePending: false, state: copy };
    } else if (action.type === ActionTypes.CHANGE_START_DAY) {
        const copy = getCopy(state.state, true);
        copy.currentDayStart = action.payload;
        copy.config.dayStartFrom = action.payload;
        copy.config = resize(copy.config);
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.CHANGE_END_DAY) {
        const copy = getCopy(state.state, true);
        copy.currentDayEnd = action.payload;
        copy.config.dayStopTo = action.payload;
        copy.config = resize(copy.config);
        return { ...state, state: copy };
    } else if (
        action.type === ActionTypes.GET_WORK_DAY_SUCCESS ||
        action.type === ActionTypes.CHANGE_WORK_DAY_SUCCESS
    ) {
        const copy = getCopy(state.state, true);
        if (action.payload === "") {
            copy.currentDayStart = action.payload;
            copy.config.dayStartFrom = 0;
            copy.currentDayEnd = action.payload;
            copy.config.dayStopTo = 23;
        } else {
            copy.currentDayStart = action.payload.start;
            copy.currentDayEnd = action.payload.end;
            copy.config.dayStartFrom = action.payload.start;
            copy.config.dayStopTo = action.payload.end;
        }
        copy.config = resize(copy.config);
        const workTimePending = action.type === ActionTypes.GET_WORK_DAY_SUCCESS ? false : state.workTimePending;
        const changePending = action.type === ActionTypes.CHANGE_WORK_DAY_SUCCESS ? false : state.changePending;
        return {
            ...state,
            workTimePending,
            changePending,
            state: copy,
            error: null,
            changeError: null,
        };
    } else if (
        action.type === ActionTypes.GET_INTERVIEW_TIME_SUCCESS ||
        action.type === ActionTypes.CHANGE_INTERVIEW_TIME_SUCCESS
    ) {
        const copy = getCopy(state.state, true);
        copy.currentInterviewTime = action.payload;
        const interviewTimePending =
            action.type === ActionTypes.GET_INTERVIEW_TIME_SUCCESS ? false : state.interviewTimePending;
        const changePending = action.type === ActionTypes.CHANGE_INTERVIEW_TIME_SUCCESS ? false : state.changePending;
        return {
            ...state,
            state: copy,
            interviewTimePending,
            changePending,
            changeError: null,
        };
    } else if (action.type === ActionTypes.GET_EVENTS_SUCCESS) {
        const copy = getCopy(state.state);
        copy.events = action.payload;
        return {
            ...state,
            allEventsPending: false,
            error: null,
        };
    } else if (action.type === ActionTypes.CHANGE_EVENT_SUCCESS) {
        const copy = getCopy(state.state);
        copy.currentEvent = action.payload;
        return {
            ...state,
            state: copy,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.GET_RECRUITERS_SUCCESS) {
        const copy = getCopy(state.state);
        copy.recruiters = action.payload;
        copy.currentRecruiters = action.payload;
        return {
            ...state,
            state: copy,
            recruitersPending: false,
            error: null,
        };
    } else if (action.type === ActionTypes.FILTER_RECRUITERS) {
        const copy = getCopy(state.state, false, true, true);
        copy.currentRecruiters = filterRecruiters(copy.recruiters, action.payload);
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.GET_ROLE_FAILURE) {
        return { ...state, rolePending: false, error: action.payload.error };
    } else if (
        action.type === ActionTypes.GET_WORK_DAY_FAILURE ||
        action.type === ActionTypes.GET_INTERVIEW_TIME_FAILURE ||
        action.type === ActionTypes.GET_EVENTS_FAILURE ||
        action.type === ActionTypes.GET_RECRUITERS_FAILURE
    ) {
        const workTimePending = action.type === ActionTypes.GET_WORK_DAY_FAILURE ? false : state.workTimePending;
        const interviewTimePending =
            action.type === ActionTypes.GET_INTERVIEW_TIME_FAILURE ? false : state.interviewTimePending;
        const allEventsPending = action.type === ActionTypes.GET_EVENTS_FAILURE ? false : state.allEventsPending;
        const recruitersPending = action.type === ActionTypes.GET_RECRUITERS_FAILURE ? false : state.recruitersPending;
        return {
            ...state,
            workTimePending,
            interviewTimePending,
            allEventsPending,
            recruitersPending,
            error: action.payload.error,
        };
    } else if (
        action.type === ActionTypes.CHANGE_WORK_DAY_FAILURE ||
        action.type === ActionTypes.CHANGE_INTERVIEW_TIME_FAILURE
    ) {
        return {
            ...state,
            changePending: false,
            changeError: action.payload.error,
        };
    } else if (action.type === ActionTypes.CHANGE_VIEW_TYPE) {
        const copy = getCopy(state.state);
        copy.viewType = action.payload;
        return {
            ...state,
            state: copy,
        };
    } else if (action.type === ActionTypes.RESIZE) {
        const copy = getCopy(state.state, true);
        copy.config = resize(copy.config);
        return {
            ...state,
            state: copy,
        };
    } else if (
        action.type === ActionTypes.ADD_RECRUITER_EVENT_REQUEST ||
        action.type === ActionTypes.EDIT_RECRUITER_EVENT_REQUEST ||
        action.type === ActionTypes.REMOVE_RECRUITER_EVENT_REQUEST
    ) {
        return {
            ...state,
            changePending: true,
        };
    } else if (action.type === ActionTypes.ADD_RECRUITER_EVENT_SUCCESS) {
        const copy = getCopy(state.state, false, true, true);
        const index = copy.recruiters.findIndex(r => r.id === action.payload.id);
        copy.recruiters[index] = action.payload;
        copy.currentRecruiters = filterRecruiters(copy.recruiters, state.state.currentEvent);
        return {
            ...state,
            state: copy,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.REMOVE_RECRUITER_EVENT_SUCCESS) {
        const copy = getCopy(state.state, false, true, true);
        const index = copy.recruiters.findIndex(r => r.id === action.payload.id);
        copy.recruiters[index] = action.payload;
        copy.currentRecruiters = filterRecruiters(copy.recruiters, state.state.currentEvent);
        return {
            ...state,
            state: copy,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.EDIT_RECRUITER_EVENT_SUCCESS) {
        const copy = getCopy(state.state, false, true, true);
        const index = copy.recruiters.findIndex(r => r.id === action.payload.id);
        copy.recruiters[index] = action.payload;
        copy.currentRecruiters = filterRecruiters(copy.recruiters, state.state.currentEvent);
        return {
            ...state,
            state: copy,
            changePending: false,
            changeError: null,
        };
    } else if (
        action.type === ActionTypes.ADD_RECRUITER_EVENT_FAILURE ||
        action.type === ActionTypes.EDIT_RECRUITER_EVENT_FAILURE ||
        action.type === ActionTypes.REMOVE_RECRUITER_EVENT_FAILURE
    ) {
        return { ...state, changePending: false, changeError: action.payload.error };
    } else if (action.type === ActionTypes.CLOSE_ERROR_WINDOW) {
        return { ...state, changeError: null };
    } else {
        return state;
    }
};

export default WorkDayReducer;
