import { Time } from "../Types/Time";

export const getOptions = (min: number, max: number, step = 1): Time[] => {
    const res: Time[] = [];
    for (let i = min; i <= max; i += step) {
        //res.push(`${i}:00`);
        res.push(convertNumToTime(i));
    }
    return res;
};

function convertNumToTime(number: number) {
    // Separate the int from the decimal part
    const hour = Math.floor(number);
    let decpart = number - hour;

    const min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    let minute = Math.floor(decpart * 60) + "";

    // Add padding if need
    if (minute.length < 2) {
        minute = "0" + minute;
    }

    // Concate hours and minutes
    const time = hour + ":" + minute;

    return time;
}
