import { CalendarState } from "../../Types/CalendarState";

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
            const recruitersRes = { ...r };
            if (workedTimesIsDepthCopy) {
                recruitersRes.workedTimes = r.workedTimes.map(t => {
                    const interviews = t.interviews.map(i => ({ ...i }));
                    return { ...t, interviews };
                });
            }
            return recruitersRes;
        });
    }
    return res;
};
