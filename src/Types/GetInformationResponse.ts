import { InformationResponse } from "./InformationResponse";
import { Recruiter } from "./Recruiter";

export type GetInformationResponse = {
    eventsWorkTimeInformations: InformationResponse[];
    recruiters: Recruiter[];
};
