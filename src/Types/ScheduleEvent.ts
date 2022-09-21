import { FullDateTime } from "./FullDateTime";

export type ScheduleEvent = {
    id: number;
    start: FullDateTime;
    end: FullDateTime;
    title: string;
};
