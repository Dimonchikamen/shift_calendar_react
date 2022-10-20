import { FullDateTime } from "./FullDateTime";

export type ScheduleInterviewEvent = {
    id: number;
    start: FullDateTime;
    end: FullDateTime;
    resourceId: string;
    title: string;
    resizable: boolean;
    bgColor: string;
    workTimeId: number;
};
