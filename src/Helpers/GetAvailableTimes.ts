import { ScheduleEvent } from "../Types/ScheduleEvent";
import { Interview } from "../Types/Interview";
import { createTitleFromHours } from "./CreateTitle";
import { getHoursInAllDateTime } from "./DateTimeHelpers";

const getIntervals = (eventInfo: ScheduleEvent, interviewDuration: number) => {
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
    for (let i = 0; i < hours.length - 1; i++) {
        for (let j = 0; j < minutes.length; j++) {
            const start = `${hours[i]}:${minutes[j]}`;
            const end = j === minutes.length - 1 ? `${hours[i + 1]}:${minutes[0]}` : `${hours[i]}:${minutes[j + 1]}`;
            res.push(createTitleFromHours(start, end));
        }
    }
    return res;
};

export const getAvailableTimes = (eventInfo: ScheduleEvent, interviews: Interview[], interviewDuration: number) => {
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
