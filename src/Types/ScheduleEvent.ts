import { Interview } from "./Interview";
import { FullDateTime } from "./FullDateTime";

export type ScheduleEvent = {
    id: number;
    start: FullDateTime;
    end: FullDateTime;
    eventId?: number;
    resourceId: string;
    title: string;
    resizable: boolean;
    bgColor: string;
    isFree?: boolean;
    interviews: Interview[];
};
