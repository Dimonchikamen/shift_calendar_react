import { InformationResponse } from "./InformationResponse";
import { Recruiter } from "./Recruiter";
import { UserInfo } from "./UserInfo";

export type GetInformationResponse = {
    eventsWorkTimeInformations: InformationResponse[];
    recruiters: Recruiter[];
    userInfo?: UserInfo;
};
