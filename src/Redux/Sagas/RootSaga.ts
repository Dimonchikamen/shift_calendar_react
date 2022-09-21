import { all, fork } from "redux-saga/effects";
import GetRecruitersSaga from "./RecruitersSagas/GetRecruiterWorkTimesSaga";
import AddRecruiterWorkTimeSaga from "./RecruitersSagas/AddRecruiterWorkTimeSaga";
import RemoveRecruiterWorkTimeSaga from "./RecruitersSagas/RemoveRecruiterWorkTimeSaga";
import EditRecruiterWorkTimeSaga from "./RecruitersSagas/EditRecruiterWorkTimeSaga";

export function* rootSaga() {
    yield all([
        fork(GetRecruitersSaga),
        fork(AddRecruiterWorkTimeSaga),
        fork(RemoveRecruiterWorkTimeSaga),
        fork(EditRecruiterWorkTimeSaga),
    ]);
}
