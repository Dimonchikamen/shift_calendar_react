import { InterviewInfo } from "./InterviewInfo";

export type RequiterInfo = {
    name: string;
    workTime: string;
    availableInterviewTimes: string[];
    interviews: InterviewInfo[];
};
