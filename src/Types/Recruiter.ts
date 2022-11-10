import { RecruiterWorkTime } from "./RecruiterWorkTime";
import { RecruiterFreeWorkTime } from "./RecruiterFreeWorkTime";

export type Recruiter = {
    id: number; //Id рекрутёра
    name: string; //Имя и фамилия
    freeWorkedTimes?: RecruiterFreeWorkTime[];
    workedTimes?: RecruiterWorkTime[];
};
