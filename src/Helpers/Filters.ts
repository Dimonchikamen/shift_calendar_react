import { ScheduleEvent } from "../Types/ScheduleEvent";
import { Recruiter } from "../Types/Recruiter";

export const filterEvents = (events: ScheduleEvent[], eventId: number): ScheduleEvent[] => {
    if (eventId === -1) {
        return events;
    } else {
        const res: ScheduleEvent[] = [];
        events.forEach(e => {
            const index = e.interviews.findIndex(interview => interview.eventId === eventId);
            if (index !== -1) res.push(e);
        });
        return res;
    }
};

export const filterRecruiters = (recruiters: Recruiter[], eventId: number): Recruiter[] => {
    if (eventId === -1) return recruiters;

    const res: Recruiter[] = [];
    recruiters.forEach(recruiter => {
        const res1: any[] = [];
        recruiter.workedTimes?.forEach(time => res1.push(time));
        if (res1.length !== 0) {
            const copy = { ...recruiter, workedTimes: res1 };
            res.push(copy);
        }
    });
    return res;
};
