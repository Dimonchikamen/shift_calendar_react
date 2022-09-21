import { WorkTime } from "../Types/WorkTime";
import { ScheduleEvent } from "../Types/ScheduleEvent";
import { createTitle } from "./CreateTitle";

export const createEventsFromWorkTimes = (workTimes: WorkTime[]): ScheduleEvent[] => {
    return workTimes.map(w => ({
        id: w.id,
        start: w.start,
        end: w.end,
        title: createTitle(w.start, w.end),
    }));
};
