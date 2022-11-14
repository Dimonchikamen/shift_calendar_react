import { Recruiter } from "../../Types/Recruiter";
import { DATE_FORMAT } from "../../Constants";
import moment from "moment";

export const getDateWhereInterviewIsActive = (recruiters: Recruiter[]): Date | null => {
    let res: Date | null = null;
    for (const recruiter of recruiters) {
        if (res) break;
        if (recruiter.workedTimes) {
            for (const workTime of recruiter.workedTimes) {
                if (workTime.interviews?.some(i => i.isActive)) {
                    res = new Date(moment(workTime.start).format(DATE_FORMAT));
                    break;
                }
            }
        }
    }
    return res;
};
