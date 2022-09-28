import { WorkTime } from "../Types/WorkTime";
import moment from "moment";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../Const";
import { getHour, getTime, getTimeFromHours } from "./DateTimeHelpers";
import { getOptions } from "./GetOptions";

export const findLastInterval = (events: WorkTime[], date: Date) => {
    const todayEvents = JSON.parse(
        JSON.stringify(events.filter(ev => ev.start.split(" ")[0] === moment(date).format(DATE_FORMAT)))
    );
    if (!todayEvents.length) return { start: "0:00", end: "23:00" };
    for (let j = 0; j < todayEvents.length; j++) {
        todayEvents[j].start = moment(todayEvents[j].start, DATE_TIME_FORMAT).format("YYYY-MM-DD HH:mm");
        todayEvents[j].end = moment(todayEvents[j].end, DATE_TIME_FORMAT).format("YYYY-MM-DD HH:mm");
    }
    const lastInterval = { start: "", end: "" };
    const lastEventTime = getTime(todayEvents.slice(-1)[0].end);
    let times = getOptions(0, 22);
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
            getOptions(getHour(todayEvents[i].title.split(" - ")[0]), getHour(todayEvents[i].title.split(" - ")[1]) - 1)
        );
    }
    let ints: string[] = [];
    ints = intervals.reduce((acc, val) => acc.concat(val), []);
    for (let i = 0; i < ints.length; i++) {
        ints[i] = moment(ints[i], "H:mm").format("HH:mm");
    }
    times = times.filter(el => ints.indexOf(el) < 0);
    for (let l = times.length - 1; l >= 0; l--) {
        if (parseInt(times[l]) - parseInt(times[l - 1]) !== 1) {
            lastInterval.start = times[l];
            lastInterval.end = moment(getTimeFromHours(parseInt(times[times.length - 1]) + 1), "H:mm").format("HH:mm");
            break;
        }
    }
    if (todayEvents.length <= 1) {
        lastInterval.start = "00:00";
        lastInterval.end = intervals[intervals.length - 1][0];
    }
    return lastInterval;
};
