import { SchedulerDataConfig, ViewTypes } from "react-big-scheduler";
import { Recruiter } from "./Recruiter";
import { Event } from "./Event";
import { InformationResponse } from "./InformationResponse";
import { WorkTime } from "./WorkTime";
import { EventInformation } from "./EventInformation";
import { WorkTimeInformation } from "./WorkTimeInformation";

export type CalendarState = {
    role: string;
    events: Event[];
    eventWorkTimeInformation: InformationResponse[];
    eventsInformation: Map<number, EventInformation>;
    workTimes: WorkTime[];
    currentEventInformation: EventInformation;
    currentWorkTime: WorkTime;

    currentDate: Date;
    currentEvent: Event;
    currentInformation: WorkTimeInformation | undefined;
    currentInterviewDuration: number;

    currentInterviewTime: number | "";
    currentDayStart: number | "";
    currentDayEnd: number | "";
    config: SchedulerDataConfig;
    viewType: ViewTypes;
    behaviours: object;
    recruiters: Recruiter[];
    currentRecruiters: Recruiter[];
};
