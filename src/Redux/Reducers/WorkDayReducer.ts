import { WorkTimeTypes } from "../Types/WorkTimeTypes";
import { ActionTypes } from "../ActionTypes";
import { ViewTypes } from "react-big-scheduler";
import { MainActions } from "../Types/MainReducerTypes";
import { getCopy } from "../Helpers/CopyHelper";
import { InterviewTimeTypes } from "../Types/InterviewTimeTypes";
import { EventsTypes } from "../Types/EventsTypes";
import { RecruitersTypes } from "../Types/RecruitersTypes";
import { RoleTypes } from "../Types/RoleTypes";
import { ViewType } from "../Types/ViewTypes";
import { resize } from "../Helpers/ResizeHelper";
import { GlobalState } from "../../Types/GlobalState";
import { GetInformationTypes } from "../Types/GetInformationTypes";
import { WorkTime } from "../../Types/WorkTime";
import { EventInformation } from "../../Types/EventInformation";
import { setWorkTimeHelper } from "../Helpers/SetWorkTimeHelper";
import { SignUpVolunteerTypes } from "../Types/SignUpVolunteerTypes";
import { DATE_TIME_FORMAT } from "../../Constants";
import moment from "moment";
import { getTime } from "../../Helpers/DateTimeHelpers";

const defaultState: GlobalState = {
    rolePending: false,
    getInformationPending: false,
    allEventsPending: false,
    recruitersPending: false,
    workTimePending: false,
    interviewTimePending: false,
    changePending: false,
    state: {
        role: "",
        viewType: "read",
        view: "worktime",
        isWidget: false,
        events: [{ id: -1, title: "Все мероприятия" }],
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
            weekCellWidth: 1000 / 7,
            dayResourceTableWidth: 180,
            weekResourceTableWidth: 260,
            eventItemLineHeight: 42,
            schedulerMaxHeight: 500,
            schedulerWidth: 1000,
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
            calendarPopoverEnabled: false,
        },
        calendarViewType: ViewTypes.Day,
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
        | SignUpVolunteerTypes
        | RoleTypes
        | ViewType
): GlobalState => {
    if (action.type === ActionTypes.GET_EVENTS_REQUEST) {
        return { ...state, allEventsPending: true };
    } else if (action.type === ActionTypes.GET_INFORMATION_REQUEST) {
        return { ...state, getInformationPending: true };
    } else if (
        action.type === ActionTypes.CHANGE_WORK_TIME_REQUEST ||
        action.type === ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST ||
        action.type === ActionTypes.SIGN_UP_VOLUNTEER_REQUEST
    ) {
        return { ...state, changePending: true };
    } else if (action.type === ActionTypes.CHANGE_WORK_TIME_SUCCESS) {
        const copy = getCopy(state.state, true);
        setWorkTimeHelper(copy);
        // copy.config.dayStartFrom = action.payload?.start ?? 9;
        // copy.config.dayStopTo = action.payload?.end ?? 19;
        // copy.currentInformation = { start: action.payload?.start, end: action.payload?.end };
        // copy.config = resize(copy.config);
        return {
            ...state,
            changePending: false,
            state: copy,
            error: null,
            changeError: null,
        };
    } else if (action.type === ActionTypes.CHANGE_INTERVIEW_TIME_SUCCESS) {
        const copy = getCopy(state.state, true);
        copy.currentEventInformation.interviewDuration = action.payload;
        copy.currentInterviewDuration = action.payload;
        copy.config.minuteStep = action.payload;
        copy.config = resize(copy.config);
        return {
            ...state,
            state: copy,
            changePending: false,
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
        //copy.currentEvent.id = action.payload.eventsWorkTimeInformations[0].eventId;
        copy.currentEventInformation = res.get(copy.currentEvent.id) as EventInformation;
        copy.currentInterviewDuration = Number(copy.currentEventInformation.interviewDuration);
        setWorkTimeHelper(copy);
        copy.recruiters = action.payload.recruiters;
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
    } else if (action.type === ActionTypes.SIGN_UP_VOLUNTEER_SUCCESS) {
        const copy = getCopy(state.state, false, true);
        const a = action.payload;
        const currentRecruiter = copy.recruiters[0];
        const oldWorkTimeIndex = currentRecruiter.workedTimes?.findIndex(w => w.interviews.some(i => i.isActive));
        const oldInterviewIndex = currentRecruiter.workedTimes![oldWorkTimeIndex!].interviews.findIndex(
            i => i.isActive
        );
        const oldInterview = currentRecruiter.workedTimes![oldWorkTimeIndex!].interviews[oldInterviewIndex];
        currentRecruiter.workedTimes![oldWorkTimeIndex!].interviews.splice(oldInterviewIndex, 1);
        const workTimeIndex = currentRecruiter.workedTimes?.findIndex(w => w.id === Number(a.workTimeId));
        currentRecruiter.workedTimes![workTimeIndex!].interviews.push({
            ...oldInterview,
            id: Number(a.interviewId),
            start: getTime(a.start),
            end: getTime(a.end),
            isActive: true,
        });
        return { ...state, state: copy, changePending: false, error: null };
    } else if (action.type === ActionTypes.GET_EVENTS_FAILURE) {
        return { ...state, allEventsPending: false, error: action.payload.error };
    } else if (action.type === ActionTypes.GET_INFORMATION_FAILURE) {
        return {
            ...state,
            getInformationPending: false,
            error: action.payload.error,
            changeError: action.payload.error,
        };
    } else if (
        action.type === ActionTypes.CHANGE_WORK_TIME_FAILURE ||
        action.type === ActionTypes.CHANGE_INTERVIEW_TIME_FAILURE ||
        action.type === ActionTypes.SIGN_UP_VOLUNTEER_FAILURE
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
        const index = copy.recruiters.findIndex(r => r.id === Number(action.payload.recruiterId));
        if (!copy.recruiters[index].workedTimes) copy.recruiters[index].workedTimes = [];
        copy.recruiters[index].workedTimes!.push({
            id: Number(action.payload.workTimeId),
            eventId: Number(action.payload.eventId),
            start: moment(action.payload.start).format(DATE_TIME_FORMAT),
            end: moment(action.payload.end).format(DATE_TIME_FORMAT),
            interviews: [],
        });
        return {
            ...state,
            state: copy,
            changePending: false,
            changeError: null,
        };
    } else if (action.type === ActionTypes.EDIT_RECRUITER_EVENT_SUCCESS) {
        const copy = getCopy(state.state, false, true, true);
        const index = copy.recruiters.findIndex(r => r.id === Number(action.payload.recruiterId));
        const workTimeIndex = copy.recruiters[index].workedTimes!.findIndex(
            w => w.id === Number(action.payload.workTimeId)
        );
        const currWorktime = copy.recruiters[index].workedTimes![workTimeIndex];
        copy.recruiters[index].workedTimes![workTimeIndex] = {
            id: Number(action.payload.workTimeId),
            eventId: Number(action.payload.eventId),
            start: moment(action.payload.start).format(DATE_TIME_FORMAT),
            end: moment(action.payload.end).format(DATE_TIME_FORMAT),
            interviews: currWorktime.interviews,
        };
        return { ...state, state: copy, changePending: false, changeError: null };
    } else if (action.type === ActionTypes.REMOVE_RECRUITER_EVENT_SUCCESS) {
        const copy = getCopy(state.state, false, true, true);
        const index = copy.recruiters.findIndex(r => r.id === Number(action.payload.recruiterId));
        const workTimeIndex = copy.recruiters[index].workedTimes!.findIndex(
            w => w.id === Number(action.payload.workTimeId)
        );
        copy.recruiters[index].workedTimes!.splice(workTimeIndex, 1);
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
    } else if (action.type === ActionTypes.CHANGE_EVENT) {
        const copy = getCopy(state.state, true);
        copy.currentEvent = action.payload;
        copy.currentEventInformation = copy.eventsInformation.get(action.payload.id) as EventInformation;
        copy.currentInterviewDuration = Number(copy.currentEventInformation.interviewDuration);
        copy.config.creatable = action.payload.id !== -1;
        setWorkTimeHelper(copy);
        return {
            ...state,
            state: copy,
        };
    } else if (action.type === ActionTypes.SET_ROLE) {
        const copy = getCopy(state.state);
        copy.role = action.payload;
        if (action.payload === "admin" || action.payload === "coord") {
            copy.viewType = "edit";
        } else if (action.payload === "recruiter") {
            copy.viewType = "read";
            copy.config.creatable = false;
        }
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.CHANGE_VIEW_TYPE) {
        const copy = getCopy(state.state, true);
        copy.config.creatable = copy.view === "worktime" && action.payload === "edit";
        copy.viewType = action.payload;
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.SET_VIEW) {
        const copy = getCopy(state.state, true);
        copy.config.creatable = copy.viewType === "edit" && action.payload === "worktime";
        copy.view = action.payload;
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.SET_IS_WIDGET) {
        const copy = getCopy(state.state);
        copy.isWidget = action.payload;
        if (copy.isWidget) {
            copy.role = "";
            copy.viewType = "read";
            copy.view = "interview";
            copy.config.creatable = false;
        }
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.CHANGE_CALENDAR_VIEW_TYPE) {
        const copy = getCopy(state.state);
        copy.calendarViewType = action.payload;
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
        setWorkTimeHelper(copy);
        return { ...state, state: copy };
    } else if (action.type === ActionTypes.CLOSE_ERROR_WINDOW) {
        return { ...state, changeError: null };
    } else {
        return state;
    }
};

export default WorkDayReducer;
