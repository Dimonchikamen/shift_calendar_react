import { ScheduleEvent } from "../Types/ScheduleEvent";

export const hasOverlap = (ev: ScheduleEvent, elem: ScheduleEvent) => {
    if (elem.start.slice(0, 10) === ev.start.slice(0, 10)) {
        if (
            (ev.start < elem.end && ev.start > elem.start) ||
            (ev.end < elem.end && ev.end > elem.start) ||
            (ev.start == elem.start && ev.end == elem.end) ||
            (ev.start <= elem.start && ev.end >= elem.end)
        ) {
            if (ev.id != elem.id) {
                return true;
            }
        }
    }
    return false;
};
