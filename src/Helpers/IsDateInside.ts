import { ScheduleEvent } from "../Types/ScheduleEvent";

export const IsDateInside = (outerDate: ScheduleEvent, innerDate: ScheduleEvent) => {
    const start1 = outerDate.start;
    const start2 = innerDate.start;
    const end1 = outerDate.end;
    const end2 = innerDate.end;
    if ((start1 === start2 && end1 === end2) || (start1 <= start2 && end1 >= end2)) {
        return true;
    }
    return false;
};
