import { ViewTypes } from "react-big-scheduler";

const initialState = {
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
};

const configReducer = (state = initialState, action: any) => {
    const copy = { ...state };
};

export default configReducer;
