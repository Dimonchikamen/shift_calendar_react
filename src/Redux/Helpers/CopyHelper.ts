import { STATE } from "../Reducers/MainReducer";

export const getCopy = (
    state: STATE,
    configIsDepthCopy = false,
    recruitersIsDepthCopy = false,
    workedTimesIsDepthCopy = false
) => {
    const res = { ...state };
    if (configIsDepthCopy) res.config = { ...state.config };
    if (recruitersIsDepthCopy) {
        const recruitersCopy = state.recruiters.map(r => {
            const recruitersRes = { ...r };
            if (workedTimesIsDepthCopy) {
                const copyTimes = r.workedTimes.map(t => {
                    const interviews = t.interviews.map(i => ({ ...i }));
                    return { ...t, interviews };
                });
                recruitersRes.workedTimes = copyTimes;
            }
            return recruitersRes;
        });
        res.recruiters = recruitersCopy;
    }
    return res;
};
