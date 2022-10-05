import { InformationResponse } from "./InformationResponse";
import { Recruiter } from "./Recruiter";

export type GetInformationResponse = {
    eventsWorkTimeInformation: InformationResponse[];
    recruiters: Recruiter[];
};
