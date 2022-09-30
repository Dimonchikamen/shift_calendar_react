import { Recruiter } from "../Types/Recruiter";

export const filterRecruiters = (recruiters: Recruiter[], event: string): Recruiter[] => {
    if (event === "Все мероприятия") return recruiters;

    const res: Recruiter[] = [];
    recruiters.forEach(recruiter => {
        const res1: any[] = [];
        recruiter.workedTimes.forEach(time => {
            time.events.forEach(e => {
                res1.push(time);
            });
        });
        if (res1.length !== 0) {
            const copy = { ...recruiter, workedTimes: res1 };
            res.push(copy);
        }
    });
    return res;
};
