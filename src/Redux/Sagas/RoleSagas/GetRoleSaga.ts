import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { getRoleFailure, getRoleSuccess } from "../../Actions/GetRoleActions";

const getRoleFetch = (): Promise<string> => ServerAPI.getRole();

function* getRole() {
    try {
        const response: string = yield call(getRoleFetch);
        yield put(getRoleSuccess(response));
    } catch (e) {
        yield put(getRoleFailure({ error: (e as Error).message }));
    }
}

function* getRoleSaga() {
    yield takeLatest(ActionTypes.GET_ROLE_REQUEST, getRole);
}

export default getRoleSaga;
