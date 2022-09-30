import { all, fork } from "redux-saga/effects";
import GetEventsSaga from "./EventsSagas/GetEventsSaga";
import GetRecruitersSaga from "./RecruitersSagas/GetRecruitersSaga";
import GetInterviewTimeSaga from "./InterviewTimeSagas/GetInterviewTimeSaga";
import ChangeInterviewTimeSaga from "./InterviewTimeSagas/ChangeInterviewTimeSaga";
import ChangeEventSaga from "./EventsSagas/ChangeEventSaga";

import GetWorkDaySaga from "./WorkDaySagas/GetWorkDaySaga";
import ChangeWorkDaySaga from "./WorkDaySagas/ChangeWorkDaySaga";

export function* rootSaga() {
    yield all([
        fork(GetEventsSaga),
        fork(GetWorkDaySaga),
        fork(GetInterviewTimeSaga),
        fork(GetRecruitersSaga),
        fork(ChangeWorkDaySaga),
        fork(ChangeInterviewTimeSaga),
        fork(ChangeEventSaga),
    ]);
}
