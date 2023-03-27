import { all, call } from "redux-saga/effects";
import GetEventsSaga from "./EventsSagas/GetEventsSaga";
import ChangeInterviewTimeSaga from "./InterviewTimeSagas/ChangeInterviewTimeSaga";
import AddRecruiterWorkTimeSaga from "./RecruitersSagas/AddRecruiterWorkTimeSaga";
import RemoveRecruiterWorkTimeSaga from "./RecruitersSagas/RemoveRecruiterWorkTimeSaga";
import EditRecruiterWorkTimeSaga from "./RecruitersSagas/EditRecruiterWorkTimeSaga";
import ChangeWorkDaySaga from "./WorkDaySagas/ChangeWorkDaySaga";
import GetInformationSaga from "./GetInformationSaga/GetInformationSaga";
import SignUpVolunteerSaga from "./SignUpVolunteersaga/SignUpVolunteerSaga";
import ChangeRecruiterForInterviewSaga from "./RecruitersSagas/ChangeRecruiterForInterviewSaga";
import ReplaceInterviewTimeSaga from "./InterviewTimeSagas/ReplaceInterviewTimeSaga";

export function* rootSaga() {
    yield all([
        call(GetEventsSaga),
        call(GetInformationSaga),
        call(ChangeWorkDaySaga),
        call(ChangeInterviewTimeSaga),
        call(ReplaceInterviewTimeSaga),
        call(AddRecruiterWorkTimeSaga),
        call(RemoveRecruiterWorkTimeSaga),
        call(EditRecruiterWorkTimeSaga),
        call(SignUpVolunteerSaga),
        call(ChangeRecruiterForInterviewSaga),
    ]);
}
