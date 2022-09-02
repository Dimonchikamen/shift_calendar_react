import { Recruiter } from "../Types/Recruiter";
import { ScheduleEvent } from "../Types/ScheduleEvent";
import { createTitle } from "./CreateTitle";
import { Resource } from "react-big-scheduler";
import moment from "moment";
import { DATE_FORMAT } from "../Components/ReactBigCalendar/ReactBigCalendar";
import { compareFullDateTime } from "./Compare";
import { FullDateTime } from "../Types/FullDateTime";

export const createResourcesAndEvents = (recruiters: Recruiter[]): [resources: Resource[], events: ScheduleEvent[]] => {
    const resources: Resource[] = [];
    const events: ScheduleEvent[] = [];
    recruiters.forEach(r => {
        resources.push({ id: String(r.id), name: r.name });
        r.workedTimes.forEach(workedTime => {
            const formattedStart = moment(workedTime.start).format(DATE_FORMAT);
            const formattedEnd = moment(workedTime.end).format(DATE_FORMAT);
            events.push({
                id: workedTime.id,
                start: formattedStart,
                end: formattedEnd,
                resourceId: String(r.id),
                title: createTitle(formattedStart, formattedEnd),
                resizable: false,
                bgColor: "#D9EDF7",
                interviews: workedTime.interviews,
            });
        });
    });
    const res = events.sort((a, b) => compareFullDateTime(a.start, b.start));
    return [resources, res];
};

export const createSchedulerEvent = (start: FullDateTime, end: FullDateTime, resourceId: string): ScheduleEvent => {
    const eventStart = moment(start).format(DATE_FORMAT);
    const eventEnd = moment(end).format(DATE_FORMAT);
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
