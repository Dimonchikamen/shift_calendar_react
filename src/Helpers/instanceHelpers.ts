import { ScheduleEvent } from "../Types/ScheduleEvent";
import { ScheduleInterviewEvent } from "../Types/ScheduleInterviewEvent";

export function isScheduleEvent(event: ScheduleEvent | ScheduleInterviewEvent): event is ScheduleEvent {
    return (event as ScheduleEvent).interviews !== undefined;
}
