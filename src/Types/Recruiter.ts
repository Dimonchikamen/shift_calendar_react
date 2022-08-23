import { FullDateTime } from "./FullDateTime";
import { Interview } from "./Interview";

export type Recruiter = {
    id: number;
    name: string;
    workedTimes: {
        id: number;
        events: string[];
        start: FullDateTime;
        end: FullDateTime;
        interviews: Interview[];
    }[];
};
