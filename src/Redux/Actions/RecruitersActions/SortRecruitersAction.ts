import { ActionTypes } from "../../ActionTypes";
import { SortRecruiters } from "../../Types/RecruitersTypes";
import { Event } from "../../../Types/Event";

export const sortRecruitersAction = (event: Event): SortRecruiters => ({
    type: ActionTypes.FILTER_RECRUITERS,
    payload: event,
});
