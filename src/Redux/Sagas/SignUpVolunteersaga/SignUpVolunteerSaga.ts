import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { FullDateTime } from "../../../Types/FullDateTime";
import { SignUpVolunteerRequest, SignVolunteerResponsePayload } from "../../Types/SignUpVolunteerTypes";
import { signUpVolunteerFailure, signUpVolunteerSuccess } from "../../Actions/SignUpVolunteerActions";
import { AxiosError } from "axios";

const signUpVolunteerFetch = (
    roleId: number,
    start: FullDateTime,
    end: FullDateTime
): Promise<SignVolunteerResponsePayload> => ServerAPI.singUpVolunteer(roleId, start, end);

function* signUpVolunteer({ payload: { currentInterviewId, workTimeId, roleId, start, end } }: SignUpVolunteerRequest) {
    try {
        const response: SignVolunteerResponsePayload = yield call(signUpVolunteerFetch, roleId, start, end);
        if (response.error) {
            throw new Error(response.error);
        }
        yield put(signUpVolunteerSuccess({ ...response, currentInterviewId, workTimeId }));
    } catch (e) {
        if ((e as AxiosError).response?.status === 409) {
            yield put(signUpVolunteerFailure({ error: "Данное время уже занято" }));
        } else {
            yield put(signUpVolunteerFailure({ error: (e as Error).message }));
        }
    }
}

function* signUpVolunteerSaga() {
    yield takeLatest(ActionTypes.SIGN_UP_VOLUNTEER_REQUEST, signUpVolunteer);
}

export default signUpVolunteerSaga;
