import { SchedulerDataConfig, ViewTypes } from "react-big-scheduler";
import { Recruiter } from "./Recruiter";
import { Event } from "./Event";
import { EventInformation } from "./EventInformation";
import { WorkTimeInformation } from "./WorkTimeInformation";
import { ViewType } from "./ViewType";
import { ViewTypeWorktime } from "./ViewTypeWorktime";
import { WorkTime } from "./WorkTime";
import { UserInfo } from "./UserInfo";

export type CalendarState = {
    role: string;
    viewType: ViewType;
    view: ViewTypeWorktime;
    isWidget: boolean;
    events: Event[];
    eventsInformation: Map<number, EventInformation>;
    currentEventInformation: EventInformation;

    currentDate: Date;
    currentEvent: Event;
    currentInformation: WorkTimeInformation | undefined;
    currentInterviewDuration: number;
    currentWorkTime: WorkTime;

    config: SchedulerDataConfig;
    calendarViewType: ViewTypes;
    behaviours: object;
    recruiters: Recruiter[];
    interviewRole: string;
    userInfo: UserInfo;
};
