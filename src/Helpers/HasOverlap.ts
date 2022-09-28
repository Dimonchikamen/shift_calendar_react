import { Time } from "../Types/Time";
import { getHour, getMinutes } from "./DateTimeHelpers";

export const hasOverlapTime = (start1: Time, end1: Time, start2: Time, end2: Time) => {
    const start_1 = new Date(1, 1, 1, getHour(start1), getMinutes(start1));
    const end_1 = new Date(1, 1, 1, getHour(end1), getMinutes(end1));
    const start_2 = new Date(1, 1, 1, getHour(start2), getMinutes(start2));
    const end_2 = new Date(1, 1, 1, getHour(end2), getMinutes(end2));
    return (
        (start_1 < end_2 && start_1 > start_2) ||
        (end_1 < end_2 && end_1 > start_2) ||
        (start_1 <= start_2 && end_2 <= end_1) ||
        (start_2 <= start_1 && end_1 <= end_2)
    );
};
