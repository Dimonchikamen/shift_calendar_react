import { ActionTypes } from "../../ActionTypes";
import { SortRecruiters } from "../../Types/RecruitersTypes";

export const sortRecruitersAction = (event: string): SortRecruiters => ({
    type: ActionTypes.FILTER_RECRUITERS,
    payload: event,
});
