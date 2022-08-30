import { FullDateTime } from "../Types/FullDateTime";

export const compareFullDateTime = (a: FullDateTime, b: FullDateTime): -1 | 0 | 1 => {
    const date1 = new Date(a);
    const date2 = new Date(b);
    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else return 0;
};
