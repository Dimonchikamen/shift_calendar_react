import { all, fork } from "redux-saga/effects";
import GetStartDaySaga from "./WorkDaySagas/GetStartDaySaga";
import GetEndDaySaga from "./WorkDaySagas/GetEndDaySaga";
import ChangeStartDaySaga from "./WorkDaySagas/ChangeStartDaySaga";
import ChangeEndDaySaga from "./WorkDaySagas/ChangeEndDaySaga";
import GetEventsSaga from "./EventsSagas/GetEventsSaga";
import GetRecruitersSaga from "./RecruitersSagas/GetRecruitersSaga";
import GetInterviewTimeSaga from "./InterviewTimeSagas/GetInterviewTimeSaga";
import ChangeInterviewTimeSaga from "./InterviewTimeSagas/ChangeInterviewTimeSaga";
import ChangeEventSaga from "./EventsSagas/ChangeEventSaga";
import AddRecruiterWorkTimeSaga from "./RecruitersSagas/AddRecruiterWorkTimeSaga";
import RemoveRecruiterWorkTimeSaga from "./RecruitersSagas/RemoveRecruiterWorkTimeSaga";
import EditRecruiterWorkTimeSaga from "./RecruitersSagas/EditRecruiterWorkTimeSaga";
import GetRoleSaga from "./RoleSagas/GetRoleSaga";

export function* rootSaga() {
    yield all([
        fork(GetRoleSaga),
        fork(GetEventsSaga),
        fork(GetStartDaySaga),
        fork(GetEndDaySaga),
        fork(GetInterviewTimeSaga),
        fork(GetRecruitersSaga),
        fork(ChangeStartDaySaga),
        fork(ChangeEndDaySaga),
        fork(ChangeInterviewTimeSaga),
        fork(ChangeEventSaga),
        fork(AddRecruiterWorkTimeSaga),
        fork(RemoveRecruiterWorkTimeSaga),
        fork(EditRecruiterWorkTimeSaga),
    ]);
}
