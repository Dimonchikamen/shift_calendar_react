import { ScheduleEvent } from "../Types/ScheduleEvent";
import { Recruiter } from "../Types/Recruiter";

export const filterEvents = (events: ScheduleEvent[], event: string): ScheduleEvent[] => {
    if (event === "Все мероприятия") {
        return events;
    } else {
        const res: ScheduleEvent[] = [];
        events.forEach(e => {
            const index = e.interviews.findIndex(interview => interview.event === event);
            if (index !== -1) res.push(e);
        });
        return res;
    }
};

export const filterRecruiters = (recruiters: Recruiter[], event: string): Recruiter[] => {
    if (event === "Все мероприятия") return recruiters;

    const res: Recruiter[] = [];
    recruiters.forEach(recruiter => {
        const res1: any[] = [];
        recruiter.workedTimes.forEach(time => {
            time.events.forEach(e => {
                //if (e.toLowerCase() === event.toLowerCase()) {
                res1.push(time);
                //}
            });
        });
        if (res1.length !== 0) {
            const copy = { ...recruiter, workedTimes: res1 };
            res.push(copy);
        }
    });
    return res;
};
