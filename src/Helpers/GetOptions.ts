import { Time } from "../Types/Time";

export const getOptions = (min: number, max: number, step = 1): Time[] => {
    const res: Time[] = [];
    for (let i = min; i <= max; i += step) {
        res.push(`${i}:00`);
    }
    return res;
};
