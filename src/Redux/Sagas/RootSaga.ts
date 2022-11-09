import { all, fork, call } from "redux-saga/effects";
import GetEventsSaga from "./EventsSagas/GetEventsSaga";
import ChangeInterviewTimeSaga from "./InterviewTimeSagas/ChangeInterviewTimeSaga";
import AddRecruiterWorkTimeSaga from "./RecruitersSagas/AddRecruiterWorkTimeSaga";
import RemoveRecruiterWorkTimeSaga from "./RecruitersSagas/RemoveRecruiterWorkTimeSaga";
import EditRecruiterWorkTimeSaga from "./RecruitersSagas/EditRecruiterWorkTimeSaga";
import ChangeWorkDaySaga from "./WorkDaySagas/ChangeWorkDaySaga";
import GetInformationSaga from "./GetInformationSaga/GetInformationSaga";
import SignUpVolunteerSaga from "./SignUpVolunteersaga/SignUpVolunteerSaga";

export function* rootSaga() {
    yield all([
        call(GetEventsSaga),
        call(GetInformationSaga),
        call(ChangeWorkDaySaga),
        call(ChangeInterviewTimeSaga),
        call(AddRecruiterWorkTimeSaga),
        call(RemoveRecruiterWorkTimeSaga),
        call(EditRecruiterWorkTimeSaga),
        call(SignUpVolunteerSaga),
    ]);
}
