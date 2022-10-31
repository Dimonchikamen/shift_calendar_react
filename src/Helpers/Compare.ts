import { FullDateTime } from "../Types/FullDateTime";
import { Time } from "../Types/Time";
import { getHour, getMinutes } from "./DateTimeHelpers";

export const compareFullDateTime = (a: FullDateTime, b: FullDateTime): -1 | 0 | 1 => {
    const date1 = new Date(a);
    const date2 = new Date(b);
    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else return 0;
};

export const compareTime = (a: Time, b: Time): -1 | 0 | 1 => {
    const date1 = new Date(1, 1, 1, getHour(a), getMinutes(a));
    const date2 = new Date(1, 1, 1, getHour(b), getMinutes(b));
    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else return 0;
};
