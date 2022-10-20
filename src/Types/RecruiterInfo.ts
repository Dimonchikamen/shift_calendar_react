import { Interview } from "./Interview";

export type RecruiterInfo = {
    name: string;
    workTimeTitle: string;
    availableInterviewTimes: string[];
    interviews: Interview[];
};
