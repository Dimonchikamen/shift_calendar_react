import { Recruiter } from "../Types/Recruiter";
import { ScheduleEvent } from "../Types/ScheduleEvent";
import { createTitle } from "./CreateTitle";
import { Resource } from "react-big-scheduler";
import moment from "moment";
import { compareFullDateTime } from "./Compare";
import { FullDateTime } from "../Types/FullDateTime";
import { DATE_TIME_FORMAT } from "../Constants";

export const createResourcesAndEvents = (
    recruiters: Recruiter[],
    currentEventId?: number
): [resources: Resource[], events: ScheduleEvent[], interviews: ScheduleEvent[]] => {
    const resources: Resource[] = [];
    const events: ScheduleEvent[] = [];
    const ints: ScheduleEvent[] = [];
    recruiters.forEach(r => {
        resources.push({ id: String(r.id), name: r.name });
        r.workedTimes?.forEach(workedTime => {
            workedTime.interviews?.forEach(interview => {
                const intStart = workedTime.start.slice(0, 11) + interview.start;
                const intEnd = workedTime.end.slice(0, 11) + interview.end;
                const formattedStart = moment(intStart).format(DATE_TIME_FORMAT);
                const formattedEnd = moment(intEnd).format(DATE_TIME_FORMAT);
                ints.push({
                    id: interview.id,
                    start: formattedStart,
                    end: formattedEnd,
                    resourceId: String(r.id),
                    title: interview.start,
                    resizable: false,
                    bgColor: "#D9EDF7",
                    interviews: [interview],
                });
            });

            const formattedStart = moment(workedTime.start).format(DATE_TIME_FORMAT);
            const formattedEnd = moment(workedTime.end).format(DATE_TIME_FORMAT);
            const eventColor = currentEventId === workedTime.eventId || currentEventId === -1 ? "#D9EDF7" : "#EEE";
            events.push({
                id: workedTime.id,
                start: formattedStart,
                end: formattedEnd,
                resourceId: String(r.id),
                title: createTitle(formattedStart, formattedEnd),
                resizable: false,
                bgColor: eventColor,
                interviews: workedTime.interviews,
            });
        });
        r.freeWorkedTimes?.forEach(w => {
            events.push({
                id: w.id,
                start: w.start,
                end: w.end,
                resourceId: String(r.id),
                title: createTitle(w.start, w.end),
                resizable: false,
                bgColor: "#EEE",
                interviews: [],
            });
        });
    });

    const res = events.sort((a, b) => compareFullDateTime(a.start, b.start));
    const interviews = ints.sort((a, b) => compareFullDateTime(a.start, b.start));
    return [resources, res, interviews];
};

export const createSchedulerEvent = (start: FullDateTime, end: FullDateTime, resourceId: string): ScheduleEvent => {
    const eventStart = moment(start).format(DATE_TIME_FORMAT);
    const eventEnd = moment(end).format(DATE_TIME_FORMAT);
    return {
        id: Math.floor(Math.random() * 1000),
        start: eventStart,
        end: eventEnd,
        resourceId,
        title: createTitle(eventStart, eventEnd),
        resizable: false,
        bgColor: "#D9EDF7",
        interviews: [],
    };
};
