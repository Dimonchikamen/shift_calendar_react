import { Time } from "./Time";

export type Interview = {
    id: number;
    name: string;
    event: string;
    role: string;
    phone: string;
    contacts: string[];
    start: Time;
    end: Time;
};
