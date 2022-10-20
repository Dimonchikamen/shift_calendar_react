import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { FullDateTime } from "../../../Types/FullDateTime";
import { SignUpVolunteerRequest } from "../../Types/SignUpVolunteerTypes";
import { signUpVolunteerFailure, signUpVolunteerSuccess } from "../../Actions/SignUpVolunteerActions";
import { Recruiter } from "../../../Types/Recruiter";

const signUpVolunteerFetch = (
    recruiterWorkTimeId: number,
    roleId: number,
    start: FullDateTime,
    end: FullDateTime
): Promise<Recruiter> => ServerAPI.singUpVolunteer(recruiterWorkTimeId, roleId, start, end);

function* signUpVolunteer({ payload: { recruiterWorkTimeId, roleId, start, end } }: SignUpVolunteerRequest) {
    try {
        const response: Recruiter = yield call(signUpVolunteerFetch, recruiterWorkTimeId, roleId, start, end);
        yield put(signUpVolunteerSuccess(response));
    } catch (e) {
        yield put(signUpVolunteerFailure({ error: (e as Error).message }));
    }
}

function* signUpVolunteerSaga() {
    yield takeLatest(ActionTypes.SIGN_UP_VOLUNTEER_REQUEST, signUpVolunteer);
}

export default signUpVolunteerSaga;
