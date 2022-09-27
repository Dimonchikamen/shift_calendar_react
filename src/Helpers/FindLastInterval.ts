import { WorkTime } from "../Types/WorkTime";
import moment from "moment";
import { DATE_FORMAT } from "../Const";
import { getHour, getTime } from "./DateTimeHelpers";
import { getOptions } from "./GetOptions";

export const findLastInterval = (events: WorkTime[], date: Date) => {
    const todayEvents = JSON.parse(
        JSON.stringify(events.filter(ev => ev.start.split(" ")[0] === moment(date).format(DATE_FORMAT)))
    );
    if (!todayEvents.length) return { start: "0:00", end: "23:00" };
    for (let j = 0; j < todayEvents.length; j++) {
        todayEvents[j].start = moment(todayEvents[j].start, "YYYY-MM-DD H:mm").format("YYYY-MM-DD HH:mm");
        todayEvents[j].end = moment(todayEvents[j].end, "YYYY-MM-DD H:mm").format("YYYY-MM-DD HH:mm");
    }
    const lastInterval = { start: "", end: "" };
    const lastEventTime = getTime(todayEvents.slice(-1)[0].end);
    const times = getOptions(0, 22);
    const intervals: string[][] = [];
    for (let i = 0; i < times.length; i++) {
        times[i] = moment(times[i], "H:mm").format("HH:mm");
    }
    if (lastEventTime < "23:00") {
        lastInterval.start = lastEventTime;
        lastInterval.end = "23:00";
        return lastInterval;
    }
    for (let i = 0; i < todayEvents.length; i++) {
        intervals.push(
            getOptions(getHour(todayEvents[i].title.split(" - ")[0]), getHour(todayEvents[i].title.split(" - ")[1]))
        );
    }

    if (todayEvents.length > 1) {
        lastInterval.start = intervals.slice(-2)[0].slice(-1)[0];
        lastInterval.end = intervals.slice(-1)[0][0];
    } else {
        lastInterval.start = "00:00";
        lastInterval.end = intervals.slice(-1)[0][0];
    }
    return lastInterval;
};
