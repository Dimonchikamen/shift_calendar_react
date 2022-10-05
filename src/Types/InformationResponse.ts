import { WorkTimeResponse } from "./WorkTimeResponse";

export type InformationResponse = {
    eventId: number;
    interviewDuration: number;
    workTimes: WorkTimeResponse[];
};
