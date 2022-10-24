import { Recruiter } from "../Types/Recruiter";
import { ScheduleEvent } from "../Types/ScheduleEvent";
import { createTitle } from "./CreateTitle";
import { Resource } from "react-big-scheduler";
import moment from "moment";
import { compareFullDateTime } from "./Compare";
import { FullDateTime } from "../Types/FullDateTime";
import { DATE_TIME_FORMAT } from "../Constants";
import { getAvailableTimes } from "./GetAvailableTimes";
import { ScheduleInterviewEvent } from "../Types/ScheduleInterviewEvent";
import { getHoursInAllDateTime, getTime } from "./DateTimeHelpers";

const isDateEarlierThanNow = (date: string) => {
    const nowDate = moment(new Date()).format(DATE_TIME_FORMAT);
    const intDate = moment(date).format(DATE_TIME_FORMAT);
    const nowHours = Number(getHoursInAllDateTime(nowDate));
    const dateHours = Number(getHoursInAllDateTime(intDate));
    if (intDate.slice(0, 11) === nowDate.slice(0, 11)) return dateHours <= nowHours;
    else if (intDate.slice(0, 11) < nowDate.slice(0, 11)) return true;
};

export const createResourcesAndEvents = (
    recruiters: Recruiter[],
    currentEventId?: number,
    role?: string,
    interviewDuration?: number
): [resources: Resource[], events: ScheduleEvent[], interviews: ScheduleInterviewEvent[]] => {
    const resources: Resource[] = [];
    const events: ScheduleEvent[] = [];
    const ints: ScheduleInterviewEvent[] = [];
    if (recruiters.length === 0) return [[], [], []];
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
                    workTimeId: workedTime.id,
                });
            });

            const formattedStart = moment(workedTime.start).format(DATE_TIME_FORMAT);
            const formattedEnd = moment(workedTime.end).format(DATE_TIME_FORMAT);
            const eventColor = currentEventId === workedTime.eventId || currentEventId === -1 ? "#D9EDF7" : "#EEE";
            events.push({
                id: workedTime.id,
                start: formattedStart,
                end: formattedEnd,
                eventId: workedTime.eventId,
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
                bgColor: "#D9EDF7",
                interviews: [],
            });
        });
    });

    const res = events.sort((a, b) => compareFullDateTime(a.start, b.start));
    const interviews = ints.sort((a, b) => compareFullDateTime(a.start, b.start));

    const freeInts: ScheduleInterviewEvent[] = [];
    const availableTimes = res.map(ev => ({ event: ev, times: getAvailableTimes(ev, [], interviewDuration!) }));
    availableTimes.forEach(obj => {
        obj.times.forEach(time => {
            const intStart = obj.event.start.slice(0, 11) + time.split(" - ")[0];
            const intEnd = obj.event.end.slice(0, 11) + time.split(" - ")[1];
            const formattedStart = moment(intStart).format(DATE_TIME_FORMAT);
            const formattedEnd = moment(intEnd).format(DATE_TIME_FORMAT);
            if (
                !interviews.some(
                    ev =>
                        getTime(ev.start) === time.split(" - ")[0] &&
                        ev.start.slice(0, 11) === formattedStart.slice(0, 11) &&
                        ev.resourceId === obj.event.resourceId
                )
            ) {
                if (isDateEarlierThanNow(formattedStart)) return;
                const id = Math.floor(Math.random() * 1000);
                freeInts.push({
                    id,
                    start: formattedStart,
                    end: formattedEnd,
                    resourceId: obj.event.resourceId,
                    title: intStart.split(" ")[1],
                    resizable: false,
                    bgColor: "#D9EDF7",
                    workTimeId: obj.event.id,
                });
            }
        });
    });

    const freeInterviews = freeInts.sort((a, b) => compareFullDateTime(a.start, b.start));
    return [resources, res, role === "admin" || role === "coord" ? interviews : freeInterviews];
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
