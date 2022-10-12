import { WorkTimeTypes } from "../Types/WorkTimeTypes";
import { ActionTypes } from "../ActionTypes";
import { ViewTypes } from "react-big-scheduler";
import { MainActions } from "../Types/MainReducerTypes";
import { getCopy } from "../Helpers/CopyHelper";
import { InterviewTimeTypes } from "../Types/InterviewTimeTypes";
import { EventsTypes } from "../Types/EventsTypes";
import { RecruitersTypes } from "../Types/RecruitersTypes";
import { filterRecruiters } from "../../Helpers/Filters";
import { RoleTypes } from "../Types/RoleTypes";
import { resize } from "../Helpers/ResizeHelper";
import { GlobalState } from "../../Types/GlobalState";
import { GetInformationTypes } from "../Types/GetInformationTypes";
import { WorkTime } from "../../Types/WorkTime";
import { EventInformation } from "../../Types/EventInformation";
import { DATE_FORMAT } from "../../Constants";
import moment from "moment";
import { getHour } from "../../Helpers/DateTimeHelpers";

const defaultState: GlobalState = {
    rolePending: false,
    getInformationPending: false,
    allEventsPending: false,
    recruitersPending: false,
    workTimePending: false,
    interviewTimePending: false,
    changePending: false,
    state: {
        role: "user",
        events: [
            { id: -1, title: "Все мероприятия" },
            { id: 1388, title: "Ночь музыки" },
            { id: 1234, title: "Ночь музеев" },
        ],
        eventsInformation: new Map<number, EventInformation>(),
        currentEventInformation: { interviewDuration: 30, workTimes: new Map<string, WorkTime>() },

        currentDate: new Date(),
        currentEvent: { id: -1, title: "Все мероприятия" },
        currentInformation: { start: 9, end: 19 },
        currentInterviewDuration: 30,

        currentWorkTime: { start: "9:00", end: "19:00" },
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
        interviews: [],
        currentInterviews: [],
    },
    error: null,
    changeError: null,
};

const WorkDayReducer = (
    state = defaultState,
    action:
        | MainActions
        | WorkTimeTypes
        | InterviewTimeTypes
        | EventsTypes
        | RecruitersTypes
        | GetInformationTypes
        | RoleTypes
): GlobalState => {
    if (action.type === ActionTypes.GET_INTERVIEW_TIME_REQUEST) {
        return { ...state, interviewTimePending: true };
    } else if (action.type === ActionTypes.GET_EVENTS_REQUEST) {
        return { ...state, allEventsPending: true };
    } else if (action.type === ActionTypes.GET_RECRUITERS_REQUEST) {
        return { ...state, recruitersPending: true };
    } else if (action.type === ActionTypes.GET_WORK_TIME_REQUEST) {
        return { ...state, workTimePending: true };
    } else if (action.type === ActionTypes.GET_INFORMATION_REQUEST) {
        return { ...state, getInformationPending: true };
    } else if (
        action.type === ActionTypes.CHANGE_WORK_TIME_REQUEST ||
        action.type === ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST
    ) {
        return { ...state, changePending: true };
    } else if (action.type === ActionTypes.SET_ROLE) {
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
        action.type === ActionTypes.GET_WORK_TIME_SUCCESS ||
        action.type === ActionTypes.CHANGE_WORK_TIME_SUCCESS
    ) {
        const copy = getCopy(state.state, true);
        copy.currentDayStart = action.payload?.start;
        copy.currentDayEnd = action.payload?.end;
        copy.config.dayStartFrom = action.payload?.start ?? 9;
        copy.config.dayStopTo = action.payload?.end ?? 19;
        copy.currentInformation = { start: action.payload?.start, end: action.payload?.end };
        copy.config = resize(copy.config);
        const workTimePending = action.type === ActionTypes.GET_WORK_TIME_SUCCESS ? false : state.workTimePending;
        const changePending = action.type === ActionTypes.CHANGE_WORK_TIME_SUCCESS ? false : state.changePending;
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
        copy.currentEventInformation.interviewDuration = action.payload;
        copy.currentInterviewTime = action.payload;
        copy.config.minuteStep = action.payload;
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
    } else if (action.type === ActionTypes.GET_INFORMATION_SUCCESS) {
        const copy = getCopy(state.state);
        const res = new Map<number, EventInformation>();
        res.set(-1, { interviewDuration: 30, workTimes: new Map<string, WorkTime>() });
        action.payload.eventsWorkTimeInformations.forEach(e => {
            const workTimes = new Map();
            e.workTimes.forEach(w => {
                workTimes.set(w.date, { start: w.beginTime, end: w.endTime });
            });
            res.set(e.eventId, { interviewDuration: Number(e.interviewDuration), workTimes });
        });
        copy.eventsInformation = res;
        copy.currentEvent.id = action.payload.eventsWorkTimeInformations[0].eventId;
        copy.currentEventInformation = res.get(copy.currentEvent.id) as EventInformation;
        copy.currentInterviewDuration = Number(copy.currentEventInformation.interviewDuration);
        const a = copy.currentEventInformation.workTimes.get(moment(copy.currentDate).format(DATE_FORMAT)) as WorkTime;
        copy.currentInformation = a ? { start: getHour(a.start), end: getHour(a.end) } : { start: 8, end: 22 };
        copy.config.dayStartFrom = copy.currentInformation?.start;
        copy.config.dayStopTo = copy.currentInformation?.end;
        copy.config = resize(copy.config);
        copy.recruiters = action.payload.recruiters;
        copy.currentRecruiters = action.payload.recruiters;
        return { ...state, state: copy, getInformationPending: false, error: null };
    } else if (action.type === ActionTypes.GET_EVENTS_SUCCESS) {
        const copy = getCopy(state.state);
        copy.events = [{ id: -1, title: "Все мероприятия" }];
        copy.events = copy.events.concat(action.payload);
        copy.currentEvent = action.payload[0];
        return {
            ...state,
            state: copy,
            allEventsPending: false,
            error: null,
        };
    } else if (action.type === ActionTypes.CHANGE_EVENT_SUCCESS) {
        const copy = getCopy(state.state);
        copy.currentEvent = action.payload;
        copy.currentEventInformation = copy.eventsInformation.get(action.payload.id) as EventInformation;
        copy.currentInterviewDuration = Number(copy.currentEventInformation.interviewDuration);
        const a = copy.currentEventInformation.workTimes.get(moment(copy.currentDate).format(DATE_FORMAT)) as WorkTime;
        copy.currentInformation = a ? { start: getHour(a.start), end: getHour(a.end) } : { start: 8, end: 22 };
        copy.config.dayStartFrom = copy.currentInformation?.start;
        copy.config.dayStopTo = copy.currentInformation?.end;
        copy.config = resize(copy.config);
        //TODO... сделать фильтрацию
        return {
            ...state,
            state: copy,
            allEventsPending: false,
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
        copy.currentRecruiters = filterRecruiters(copy.recruiters, action.payload.id);
        return { ...state, state: copy };
    } else if (
        action.type === ActionTypes.GET_EVENTS_FAILURE ||
        action.type === ActionTypes.GET_RECRUITERS_FAILURE ||
        action.type === ActionTypes.GET_INFORMATION_FAILURE
    ) {
        const getInformationPending =
            action.type === ActionTypes.GET_INFORMATION_FAILURE ? false : state.getInformationPending;
        const allEventsPending = action.type === ActionTypes.GET_EVENTS_FAILURE ? false : state.allEventsPending;
        const recruitersPending = action.type === ActionTypes.GET_RECRUITERS_FAILURE ? false : state.recruitersPending;
        return {
            ...state,
            getInformationPending,
            allEventsPending,
            recruitersPending,
            error: action.payload.error,
            changeError: action.payload.error,
        };
    } else if (
        action.type === ActionTypes.CHANGE_WORK_TIME_FAILURE ||
        action.type === ActionTypes.CHANGE_INTERVIEW_TIME_FAILURE
    ) {
        return {
            ...state,
            changePending: false,
            changeError: action.payload.error,
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
        copy.currentRecruiters = filterRecruiters(copy.recruiters, state.state.currentEvent.id);
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
        copy.currentRecruiters = filterRecruiters(copy.recruiters, state.state.currentEvent.id);
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
        copy.currentRecruiters = filterRecruiters(copy.recruiters, state.state.currentEvent.id);
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
    } else if (action.type === ActionTypes.CHANGE_DATE) {
        const copy = getCopy(state.state);
        copy.currentDate = action.payload;
        const a = copy.currentEventInformation.workTimes.get(moment(copy.currentDate).format(DATE_FORMAT)) as WorkTime;
        copy.currentInformation = a ? { start: getHour(a.start), end: getHour(a.end) } : undefined;
        copy.config.dayStartFrom = copy.currentInformation?.start ?? 9;
        copy.config.dayStopTo = copy.currentInformation?.end ?? 19;
        copy.config = resize(copy.config);
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.CLOSE_ERROR_WINDOW) {
        return { ...state, changeError: null };
    } else {
        return state;
    }
};

export default WorkDayReducer;
