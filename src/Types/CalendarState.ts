import { SchedulerDataConfig, ViewTypes } from "react-big-scheduler";
import { Recruiter } from "./Recruiter";
import { Event } from "./Event";
import { EventInformation } from "./EventInformation";
import { WorkTimeInformation } from "./WorkTimeInformation";
import { ViewType } from "./ViewType";
import { ViewTypeWorktime } from "./ViewTypeWorktime";
import { UserInfo } from "./UserInfo";
import { RecruiterInfo } from "./RecruiterInfo";
import { ScheduleInterviewEvent } from "./ScheduleInterviewEvent";
import { ScheduleEvent } from "./ScheduleEvent";

export type CalendarState = {
    role: string;
    viewType: ViewType;
    view: ViewTypeWorktime;
    isWidget: boolean;
    events: Event[];
    eventsInformation: Map<number, EventInformation>;
    currentEventInformation: EventInformation;

    selectedEvent: ScheduleEvent | ScheduleInterviewEvent | null;
    selectedData: RecruiterInfo | null;

    currentDate: Date;
    currentEvent: Event;
    currentInformation: WorkTimeInformation | undefined;
    currentInterviewDuration: number;
    config: SchedulerDataConfig;
    calendarViewType: ViewTypes;
    behaviours: object;
    recruiters: Recruiter[];
    interviewRole: string;
    userInfo: UserInfo;
};
