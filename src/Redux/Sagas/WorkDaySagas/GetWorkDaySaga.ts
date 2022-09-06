import { GetWorkDayPayload } from "../../Types/WorkDayTypes";
import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { getWorkDayFailure, getWorkDaySuccess } from "../../Actions/WorkDayActions/WorkDayActions";
import { ActionTypes } from "../../ActionTypes";

const getWorkDayFetch = (): Promise<GetWorkDayPayload | ""> => ServerAPI.getWorkDayTime(new Date());

function* getWorkDay() {
    try {
        const response: GetWorkDayPayload | "" = yield call(getWorkDayFetch);
        yield put(getWorkDaySuccess(response));
    } catch (e) {
        yield put(getWorkDayFailure({ error: (e as Error).message }));
    }
}

function* getWorkDaySaga() {
    yield takeLatest(ActionTypes.CHANGE_WORK_DAY_REQUEST, getWorkDay);
}

export default getWorkDaySaga;
