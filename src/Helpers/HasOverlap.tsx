import { ScheduleEvent } from "../Types/ScheduleEvent";
import { FullDateTime } from "../Types/FullDateTime";
import { Time } from "../Types/Time";
import { getHour, getMinutes, getTime } from "./DateTimeHelpers";

export const hasOverlap = (ev: ScheduleEvent, elem: ScheduleEvent) => {
    return hasOverlapDate(ev.start, ev.end, elem.start, elem.end) && ev.id !== elem.id && !ev.isFree;
};

export const hasOverlapDate = (start1: FullDateTime, end1: FullDateTime, start2: FullDateTime, end2: FullDateTime) => {
    const start_1 = getTime(start1);
    const end_1 = getTime(end1);
    const start_2 = getTime(start2);
    const end_2 = getTime(end2);
    return start1.slice(0, 10) === start2.slice(0, 10) ? hasOverlapTime(start_1, end_1, start_2, end_2) : false;
};

export const hasOverlapTime = (start1: Time, end1: Time, start2: Time, end2: Time) => {
    const start_1 = new Date(1, 1, 1, getHour(start1), getMinutes(start1));
    const end_1 = new Date(1, 1, 1, getHour(end1), getMinutes(end1));
    const start_2 = new Date(1, 1, 1, getHour(start2), getMinutes(start2));
    const end_2 = new Date(1, 1, 1, getHour(end2), getMinutes(end2));
    return (
        (start_1 < end_2 && start_1 > start_2) ||
        (end_1 < end_2 && end_1 > start_2) ||
        (start_1 <= start_2 && end_2 <= end_1) ||
        (start_2 <= start_1 && end_1 <= end_2)
    );
};
