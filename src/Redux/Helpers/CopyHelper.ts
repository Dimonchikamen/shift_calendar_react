import { CalendarState } from "../../Types/CalendarState";
import { Recruiter } from "../../Types/Recruiter";

export const getCopy = (
    state: CalendarState,
    configIsDepthCopy = false,
    recruitersIsDepthCopy = false,
    workedTimesIsDepthCopy = false
) => {
    const res = { ...state };
    if (configIsDepthCopy) res.config = { ...state.config };
    if (recruitersIsDepthCopy) {
        res.recruiters = state.recruiters.map(r => {
            const recruitersRes: Recruiter = { ...r };
            if (workedTimesIsDepthCopy) {
                recruitersRes.workedTimes = r.workedTimes?.map(t => {
                    const interviews = t.interviews.map(i => ({ ...i }));
                    return { ...t, interviews };
                });
                recruitersRes.freeWorkedTimes = r.freeWorkedTimes?.map(t => ({ ...t }));
            }
            return recruitersRes;
        });
    }
    return res;
};
