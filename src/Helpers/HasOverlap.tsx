import { ScheduleEvent } from "../Types/ScheduleEvent";
import { FullDateTime } from "../Types/FullDateTime";

export const hasOverlap = (ev: ScheduleEvent, elem: ScheduleEvent) => {
    if (hasOverlapDate(ev.start, ev.end, elem.start, elem.end)) {
        if (ev.id != elem.id) {
            return true;
        }
    }
    return false;
};

export const hasOverlapDate = (start1: FullDateTime, end1: FullDateTime, start2: FullDateTime, end2: FullDateTime) => {
    if (start1.slice(0, 10) === start2.slice(0, 10)) {
        if (
            (start1 < end2 && start1 > start2) ||
            (end1 < end2 && end1 > start2) ||
            (start1 == start2 && end1 == end2) ||
            (start1 <= start2 && end1 >= end2)
        ) {
            return true;
        }
    }
    return false;
};
