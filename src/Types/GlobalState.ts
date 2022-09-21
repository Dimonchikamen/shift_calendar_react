import { WorkTime } from "./WorkTime";

export type GlobalState = {
    recruitersPending: boolean;
    changePending: boolean;
    workTimes: WorkTime[];
    error: string | null;
    changeError: string | null;
};
