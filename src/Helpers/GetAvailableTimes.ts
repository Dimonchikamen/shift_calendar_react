import { ScheduleEvent } from "../Types/ScheduleEvent";
import { Interview } from "../Types/Interview";
import { createTitleFromHours } from "./CreateTitle";
import {
    getDate,
    getHour,
    getHoursInAllDateTime,
    getMinutes,
    getMinutesInAllDateTime,
    getTime,
} from "./DateTimeHelpers";
import { Recruiter } from "../Types/Recruiter";
import { FullDateTime } from "../Types/FullDateTime";
import { IsDateInside } from "./IsDateInside";
import moment from "moment";
import { DATE_FORMAT } from "../Constants";

const getIntervals = <T extends { start: FullDateTime; end: FullDateTime }>(
    eventInfo: T,
    interviewDuration: number
) => {
    const minutes = ["00"];
    for (let i = 1; i < 60 / interviewDuration; i++) {
        minutes.push(`${i * interviewDuration}`);
    }
    const hours = [];
    const diff = Number(getHoursInAllDateTime(eventInfo.end)) - Number(getHoursInAllDateTime(eventInfo.start)) + 1;
    for (let i = 0; i < diff; i++) {
        hours.push(`${Number(getHoursInAllDateTime(eventInfo.start)) + i}`);
    }

    const res: string[] = [];
    let startMinutesIndex = minutes.findIndex(e => e === getMinutesInAllDateTime(eventInfo.start));
    for (let i = 0; i < hours.length; i++) {
        for (let j = startMinutesIndex; j < minutes.length; j++) {
            const start = `${hours[i]}:${minutes[j]}`;
            if (getTime(eventInfo.end) === start) break;
            let end;
            if (j === minutes.length - 1) {
                if (i !== hours.length - 1) {
                    end = `${hours[i + 1]}:${minutes[0]}`;
                } else {
                    continue;
                }
            } else {
                end = `${hours[i]}:${minutes[j + 1]}`;
            }
            res.push(createTitleFromHours(start, end));
        }
        startMinutesIndex = 0;
    }
    return res;
};

export const getAvailableTimes = <T extends { start: FullDateTime; end: FullDateTime }>(
    eventInfo: T,
    interviews: Interview[],
    interviewDuration: number
) => {
    const res = getIntervals(eventInfo, interviewDuration);
    interviews.forEach(interview => {
        const title = createTitleFromHours(interview.start, interview.end);
        const index = res.findIndex(r => r === title);
        if (index !== -1) {
            res.splice(index, 1);
        }
    });
    return res;
};

export const getFreeDates = (recruiter: Recruiter, interviewDuration: number, eventId: number): string[] => {
    const currentDate = new Date();
    const res: string[][] | undefined = recruiter.workedTimes
        ?.filter(w => w.eventId === eventId)
        ?.filter(w => {
            const end = getDate(w.end);
            return currentDate < end;
        })
        ?.map(w => {
            const start = getDate(w.start);
            const end = getDate(w.end);
            const availableTimes = getAvailableTimes(w, w.interviews, interviewDuration).filter(t => {
                const hours = getHour(t);
                const minutes = getMinutes(t);
                return (
                    currentDate < start ||
                    (currentDate >= start && currentDate <= end && currentDate.getHours() < hours) ||
                    (currentDate >= start &&
                        currentDate <= end &&
                        currentDate.getHours() === hours &&
                        currentDate.getMinutes() < minutes)
                );
            });
            return availableTimes.map(t => `${moment(start).format(DATE_FORMAT)} ${t}`);
        });
    const result: string[] = [];
    res?.forEach(r => r.forEach(s => result.push(s)));
    return result;
};
