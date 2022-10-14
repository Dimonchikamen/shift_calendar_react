import { SchedulerDataConfig, ViewTypes } from "react-big-scheduler";
import { Recruiter } from "./Recruiter";
import { Event } from "./Event";
import { EventInformation } from "./EventInformation";
import { WorkTimeInformation } from "./WorkTimeInformation";
import { ViewType } from "./ViewType";

export type CalendarState = {
    role: string;
    viewType: ViewType;
    view: string;
    events: Event[];
    eventsInformation: Map<number, EventInformation>;
    currentEventInformation: EventInformation;

    currentDate: Date;
    currentEvent: Event;
    currentInformation: WorkTimeInformation | undefined;
    currentInterviewDuration: number;

    config: SchedulerDataConfig;
    calendarViewType: ViewTypes;
    behaviours: object;
    recruiters: Recruiter[];
};
