import { Interview } from "./Interview";
import { FullDateTime } from "./FullDateTime";

export type ScheduleEvent = {
    id: number;
    start: FullDateTime;
    end: FullDateTime;
    resourceId: string;
    title: string;
    resizable: boolean;
    bgColor: string;
    interviews: Interview[];
};
