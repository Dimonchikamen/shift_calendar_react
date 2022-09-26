import { FullDateTime } from "./FullDateTime";

export type WorkTimeResponse = {
    workTimeId: string | number;
    start: FullDateTime;
    end: FullDateTime;
};
