import { Interview } from "./Interview";

export type RequiterInfo = {
    name: string;
    workTimeTitle: string;
    availableInterviewTimes: string[];
    interviews: Interview[];
};
