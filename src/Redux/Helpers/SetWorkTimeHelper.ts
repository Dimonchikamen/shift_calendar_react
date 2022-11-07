import { CalendarState } from "../../Types/CalendarState";
import moment from "moment";
import { DATE_FORMAT } from "../../Constants";
import { WorkTime } from "../../Types/WorkTime";
import { getHour } from "../../Helpers/DateTimeHelpers";
import { resize } from "./ResizeHelper";

export const setWorkTimeHelper = (calendarState: CalendarState): void => {
    const a = calendarState.currentEventInformation.workTimes.get(
        moment(calendarState.currentDate).format(DATE_FORMAT)
    ) as WorkTime;
    calendarState.currentInformation = a ? { start: getHour(a.start), end: getHour(a.end) } : { start: 8, end: 22 };
    calendarState.config.dayStartFrom = calendarState.currentInformation?.start;
    calendarState.config.dayStopTo = calendarState.currentInformation?.end - 1;
    calendarState.config = resize(calendarState.config, !calendarState.isWidget);
};
