import { FullDateTime } from "../Types/FullDateTime";

export const compareFullDateTime = (a: FullDateTime, b: FullDateTime): -1 | 0 | 1 => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else return 0;
};
