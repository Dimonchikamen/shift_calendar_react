import { all, fork } from "redux-saga/effects";
import GetEventsSaga from "./EventsSagas/GetEventsSaga";
import ChangeInterviewTimeSaga from "./InterviewTimeSagas/ChangeInterviewTimeSaga";
import AddRecruiterWorkTimeSaga from "./RecruitersSagas/AddRecruiterWorkTimeSaga";
import RemoveRecruiterWorkTimeSaga from "./RecruitersSagas/RemoveRecruiterWorkTimeSaga";
import EditRecruiterWorkTimeSaga from "./RecruitersSagas/EditRecruiterWorkTimeSaga";
import ChangeWorkDaySaga from "./WorkDaySagas/ChangeWorkDaySaga";
import GetInformationSaga from "./GetInformationSaga/GetInformationSaga";

export function* rootSaga() {
    yield all([
        fork(GetEventsSaga),
        fork(GetInformationSaga),
        fork(ChangeWorkDaySaga),
        fork(ChangeInterviewTimeSaga),
        fork(AddRecruiterWorkTimeSaga),
        fork(RemoveRecruiterWorkTimeSaga),
        fork(EditRecruiterWorkTimeSaga),
    ]);
}
