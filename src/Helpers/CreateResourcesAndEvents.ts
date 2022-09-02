import { Recruiter } from "../Types/Recruiter";
import { ScheduleEvent } from "../Types/ScheduleEvent";
import { createTitle } from "./CreateTitle";
import { Resource } from "react-big-scheduler";
import moment from "moment";
import { DATE_FORMAT } from "../Components/ReactBigCalendar/ReactBigCalendar";
import { compareFullDateTime } from "./Compare";

export const createResourcesAndEvents = (
    recruiters: Recruiter[],
    role?: string
): [resources: Resource[], events: ScheduleEvent[], interviews: ScheduleEvent[]] => {
    const resources: Resource[] = [];
    const events: ScheduleEvent[] = [];
    const ints: ScheduleEvent[] = [];
    recruiters.forEach(r => {
        resources.push({ id: String(r.id), name: r.name });
        r.workedTimes.forEach(workedTime => {
            workedTime.interviews.forEach(interview => {
                const intStart = workedTime.start.slice(0, 11) + interview.start;
                const intEnd = workedTime.end.slice(0, 11) + interview.end;
                const formattedStart = moment(intStart).format(DATE_FORMAT);
                const formattedEnd = moment(intEnd).format(DATE_FORMAT);
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
    const interviews = ints.sort((a, b) => compareFullDateTime(a.start, b.start));
    return [resources, res, interviews];
};
