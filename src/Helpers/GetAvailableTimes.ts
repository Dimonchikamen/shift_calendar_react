import { ScheduleEvent } from "../Types/ScheduleEvent";
import { Interview } from "../Types/Interview";
import { Time } from "../Types/Time";
import { createTitleFromHours } from "./CreateTitle";
import { getHour, getHoursInAllDateTime } from "./DateTimeHelpers";

const getIntervals = (eventInfo: ScheduleEvent, interviewTime: Time) => {
    const minutes = ["00"];
    for (let i = 1; i < 60 / getHour(interviewTime); i++) {
        minutes.push(`${i * getHour(interviewTime)}`);
    }
    const hours = [];
    const diff = Number(getHoursInAllDateTime(eventInfo.end)) - Number(getHoursInAllDateTime(eventInfo.start)) + 1;
    for (let i = 0; i < diff; i++) {
        hours.push(`${Number(getHoursInAllDateTime(eventInfo.start)) + i}`);
    }

    const res = [];
    for (let i = 0; i < hours.length - 1; i++) {
        for (let j = 0; j < minutes.length; j++) {
            const start = `${hours[i]}:${minutes[j]}`;
            const end = j === minutes.length - 1 ? `${hours[i + 1]}:${minutes[0]}` : `${hours[i]}:${minutes[j + 1]}`;
            res.push(createTitleFromHours(start, end));
        }
    }
    return res;
};

export const getAvailableTimes = (eventInfo: ScheduleEvent, interviews: Interview[], interviewTime: Time) => {
    const res = getIntervals(eventInfo, interviewTime);
    interviews.forEach(interview => {
        const title = createTitleFromHours(interview.start, interview.end);
        const index = res.findIndex(r => r === title);
        if (index !== -1) {
            res.splice(index, 1);
        }
    });
    return res;
};
