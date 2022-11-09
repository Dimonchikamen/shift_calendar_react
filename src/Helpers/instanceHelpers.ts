import { ScheduleEvent } from "../Types/ScheduleEvent";
import { ScheduleInterviewEvent } from "../Types/ScheduleInterviewEvent";

export function isScheduleEvent(event: ScheduleEvent | ScheduleInterviewEvent): event is ScheduleEvent {
    return (event as ScheduleEvent).interviews !== undefined;
}

export function isInterviewEvent(event: ScheduleEvent | ScheduleInterviewEvent): event is ScheduleInterviewEvent {
    return !isScheduleEvent(event);
}
