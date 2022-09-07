import { SchedulerDataConfig, ViewTypes } from "react-big-scheduler";
import { Recruiter } from "./Recruiter";

export type CalendarState = {
    role: string;
    events: string[];
    currentEvent: string;
    currentInterviewTime: number | "";
    currentDayStart: number | "";
    currentDayEnd: number | "";
    config: SchedulerDataConfig;
    viewType: ViewTypes;
    behaviours: object;
    recruiters: Recruiter[];
    currentRecruiters: Recruiter[];
};
