// import { ChangeEventRequest } from "../../Types/EventsTypes";
// import { call, put, takeLatest } from "redux-saga/effects";
// import { Recruiter } from "../../../Types/Recruiter";
// import { getRecruitersFailure, getRecruitersSuccess } from "../../Actions/RecruitersActions/GetRecruitersActions";
// import { changeEventFailure, changeEventSuccess } from "../../Actions/EventsActions/ChangeEventActions";
// import { ActionTypes } from "../../ActionTypes";
// import { filterRecruiters } from "../../../Helpers/Filters";
import { sortRecruitersAction } from "../../Actions/RecruitersActions/SortRecruitersAction";

//const filterCurrentRecruiters = async (recruiters: Recruiter[], event: string) => filterRecruiters(recruiters, event);
//const getRecruitersFetch = (event: string) => ServerAPI.getRecruiters(event);

// enum Digits {
//     thousand = 1000,
//     million = 1000000,
//     billion = 1000000000,
// }
//
// //TODO.... подумать как можно по другому вызвать фильтрацию
// function* changeEvent({ payload: { recruiters, event } }: ChangeEventRequest) {
//     try {
//         for (let i = 0; i < Digits.billion; i++) {
//             //TOD>.
//         }
//         yield put(sortRecruitersAction(event));
//         yield put(changeEventSuccess(event));
//     } catch (e) {
//         yield put(changeEventFailure({ error: (e as Error).message }));
//         yield put(getRecruitersFailure({ error: (e as Error).message }));
//     }
// }
//
// function* changeEventSaga() {
//     yield takeLatest(ActionTypes.CHANGE_EVENT_REQUEST, changeEvent);
// }
//
// export default changeEventSaga;
