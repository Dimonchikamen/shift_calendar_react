import { WorkTime } from "./WorkTime";

export type EventInformation = {
    interviewDuration: number;
    workTimes: Map<string, WorkTime>;
};
