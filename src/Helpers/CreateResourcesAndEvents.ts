import { Recruiter } from "../Types/Recruiter";
import { ScheduleEvent } from "../Types/ScheduleEvent";
import { createTitle } from "./CreateTitle";
import { Resource } from "react-big-scheduler";
import moment from "moment";
import { DATE_FORMAT } from "../Components/ReactBigCalendar/ReactBigCalendar";

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
    return [resources, events];
};
