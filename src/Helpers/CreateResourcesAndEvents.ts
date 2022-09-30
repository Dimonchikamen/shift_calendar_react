import { Recruiter } from "../Types/Recruiter";
import { ScheduleEvent } from "../Types/ScheduleEvent";
import { createTitle } from "./CreateTitle";
import { Resource } from "react-big-scheduler";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../Components/ReactBigCalendar/ReactBigCalendar2";
import { compareFullDateTime } from "./Compare";
import { FullDateTime } from "../Types/FullDateTime";

export const createResourcesAndEvents = (
    recruiters: Recruiter[]
): [resources: Resource[], interviews: ScheduleEvent[]] => {
    const resources: Resource[] = [];
    const ints: ScheduleEvent[] = [];
    recruiters.forEach(r => {
        resources.push({ id: String(r.id), name: r.name });
        r.workedTimes.forEach(workedTime => {
            workedTime.interviews.forEach(interview => {
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
        });
    });

    const interviews = ints.sort((a, b) => compareFullDateTime(a.start, b.start));
    return [resources, interviews];
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
