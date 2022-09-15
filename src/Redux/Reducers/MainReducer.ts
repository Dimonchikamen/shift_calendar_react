import { ViewTypes } from "react-big-scheduler";
import { MainActions } from "../Types/MainReducerTypes";
import { ActionTypes } from "../ActionTypes";
import { getCopy } from "../Helpers/CopyHelper";
import { WorkTimeTypes } from "../Types/WorkTimeTypes";

const initialState = {
    role: "user",
    events: ["Ночь музеев", "Ночь музыки"],
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
    recruiters: [
        {
            id: 1,
            name: "Попов Николай",
            workedTimes: [
                {
                    id: 11,
                    events: ["Ночь музеев"],
                    start: "2022-08-26 09:00",
                    end: "2022-08-26 11:00",
                    interviews: [
                        {
                            id: 111,
                            name: "Ольшанский Кирилл",
                            event: "Ночь музеев",
                            role: "Тимлидер",
                            phone: "+7999999999",
                            contacts: ["Telegram"],
                            start: "9:00",
                            end: "9:30",
                        },
                    ],
                },
                {
                    id: 12,
                    events: ["Ночь музыки"],
                    start: "2022-08-26 15:00",
                    end: "2022-08-26 16:30",
                    interviews: [],
                },
                {
                    id: 171,
                    events: ["Ночь музыки"],
                    start: "2022-08-26 12:00",
                    end: "2022-08-26 13:30",
                    interviews: [
                        {
                            id: 11121,
                            name: "Ольшанский Кирилл",
                            event: "Ночь музыки",
                            role: "Тимлидер",
                            phone: "+7999999999",
                            contacts: ["Telegram"],
                            start: "12:00",
                            end: "12:30",
                        },
                        {
                            id: 11122,
                            name: "Ольшанский Кирилл",
                            event: "Ночь музыки",
                            role: "Тимлидер",
                            phone: "+7999999999",
                            contacts: ["Telegram"],
                            start: "13:00",
                            end: "13:30",
                        },
                    ],
                },
            ],
        },
        {
            id: 3,
            name: "Иванов Иван",
            workedTimes: [
                {
                    id: 32,
                    events: ["Ночь музеев"],
                    start: "2022-08-26 12:00",
                    end: "2022-08-26 16:00",
                    interviews: [
                        {
                            id: 321,
                            name: "Денежный человек",
                            event: "Ночь музеев",
                            role: "Тимлидер",
                            phone: "+7999999999",
                            contacts: ["Telegram"],
                            start: "12:30",
                            end: "13:00",
                        },
                        {
                            id: 322,
                            name: "Денежный человек",
                            event: "Ночь музеев",
                            role: "Тимлидер",
                            phone: "+7999999999",
                            contacts: ["Telegram"],
                            start: "13:30",
                            end: "14:00",
                        },
                        {
                            id: 323,
                            name: "Кирилл Ольшанский",
                            event: "Ночь музеев",
                            role: "Тимлидер",
                            phone: "+7999999999",
                            contacts: ["Telegram"],
                            start: "15:00",
                            end: "15:30",
                        },
                    ],
                },
            ],
        },
        {
            id: 9,
            name: "Пустой человек",
            workedTimes: [],
        },
    ],
    interviews: [],
};

export type STATE = typeof initialState;

const getDiff = (min: number, max: number) => max - min + 1;

const resize = (config: typeof initialState.config) => {
    const newWidth = window.innerWidth * 0.75;
    let newResourceTableWidth = config.dayResourceTableWidth;
    if (window.innerWidth < 1200) {
        newResourceTableWidth = 200;
    }
    const min = config.dayStartFrom;
    const max = config.dayStopTo;
    const minuteStep = config.minuteStep;
    const timeWidth = newWidth - newResourceTableWidth;
    const newDayCellWidth = timeWidth / (getDiff(min, max) * (60 / minuteStep));
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

const mainReducer = (state = initialState, action: MainActions) => {
    // if (action.type === ActionTypes.CHANGE_EVENT_SUCCESS) {
    //     return state;
    // } else if (action.type === ActionTypes.CHANGE_END_DAY_SUCCESS) {
    //     const copy = getCopy(state, true);
    //     copy.config.dayStopTo = action.payload;
    //     //copy.config = resize(copy.config);
    //     return copy;
    // } else if (action.type === ActionTypes.CHANGE_START_DAY_SUCCESS) {
    //     const copy = getCopy(state, true);
    //     copy.config.dayStartFrom = action.payload;
    //     //copy.config = resize(copy.config);
    //     return copy;
    // } else if (action.type === ActionTypes.CHANGE_INTERVIEW_TIME_SUCCESS) {
    //     const copy = getCopy(state, true);
    //     copy.config.minuteStep = action.payload;
    //     //copy.config = resize(copy.config);
    //     return copy;
    // } else if (action.type === ActionTypes.CHANGE_VIEW_TYPE) {
    //     const copy = getCopy(state);
    //     copy.viewType = action.payload;
    //     return copy;
    // } else if (action.type === ActionTypes.RESIZE) {
    //     const copy = getCopy(state, true);
    //     //copy.config = resize(copy.config);
    //     return copy;
    // } else if (action.type === ActionTypes.ADD_RECRUITER_EVENT_SUCCESS) {
    //     const copy = getCopy(state, false, true, true);
    //     copy.recruiters
    //         .find(r => r.id === Number(action.payload.resourceId))
    //         ?.workedTimes.push({
    //             id: action.payload.id,
    //             events: copy.events,
    //             start: action.payload.start,
    //             end: action.payload.end,
    //             interviews: [],
    //         });
    //     return copy;
    // } else if (action.type === ActionTypes.REMOVE_RECRUITER_EVENT_SUCCESS) {
    //     const copy = getCopy(state, false, true, true);
    //     const recruiter = copy.recruiters.find(r => r.id === Number(action.payload.resourceId));
    //     const index = recruiter?.workedTimes.findIndex(e => e.id === action.payload.id);
    //     if (index !== undefined) {
    //         recruiter?.workedTimes.splice(index, 1);
    //         return copy;
    //     }
    //     return state;
    // } else if (action.type === ActionTypes.EDIT_RECRUITER_EVENT_SUCCESS) {
    //     const copy = getCopy(state, false, true, true);
    //     const recruiter = copy.recruiters.find(r => r.id === Number(action.payload.resourceId));
    //     const index = recruiter?.workedTimes.findIndex(e => e.id === action.payload.id);
    //     if (recruiter && index !== undefined) {
    //         recruiter.workedTimes[index] = {
    //             ...recruiter.workedTimes[index],
    //             start: action.payload.start,
    //             end: action.payload.end,
    //             interviews: [...action.payload.interviews],
    //         };
    //         return copy;
    //     }
    //     return state;
    // } else {
    //     return state;
    // }
};

export default mainReducer;
