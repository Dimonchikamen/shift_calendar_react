import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { FullDateTime } from "../../../Types/FullDateTime";
import { SignUpVolunteerRequest, SignVolunteerResponsePayload } from "../../Types/SignUpVolunteerTypes";
import { signUpVolunteerFailure, signUpVolunteerSuccess } from "../../Actions/SignUpVolunteerActions";
import { AxiosError } from "axios";
import { openSnackBar } from "../../Reducers/SnackBarReducer/Actions";

const signUpVolunteerFetch = (
    roleId: number,
    start: FullDateTime,
    end: FullDateTime,
    phone: string,
    contacts: string[]
): Promise<SignVolunteerResponsePayload> => {
    const data = new FormData();
    data.append("roleId", String(roleId));
    data.append("start", start);
    data.append("end", end);
    data.append("phone", phone);
    data.append("contacts", JSON.stringify(contacts));
    return ServerAPI.singUpVolunteer(data);
};

function* signUpVolunteer({
    payload: { currentInterviewId, workTimeId, roleId, start, end, phone, contacts },
}: SignUpVolunteerRequest) {
    try {
        const response: SignVolunteerResponsePayload = yield call(
            signUpVolunteerFetch,
            roleId,
            start,
            end,
            phone,
            contacts
        );
        if (response.error) {
            throw new Error(response.error);
        }
        yield put(signUpVolunteerSuccess({ ...response, currentInterviewId, workTimeId }));
        yield put(openSnackBar());
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
