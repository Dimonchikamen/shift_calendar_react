import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { getEndDayFailure, getEndDaySuccess } from "../../Actions/WorkDayActions/GetEndDayActions";

const getEnd = (): Promise<number | ""> => ServerAPI.getDayEnd();

function* getEndDay() {
    try {
        const response: number | "" = yield call(getEnd);
        yield put(getEndDaySuccess(response));
    } catch (e) {
        yield put(getEndDayFailure({ error: (e as Error).message }));
    }
}

function* getEndDaySaga() {
    yield takeLatest(ActionTypes.GET_END_DAY_REQUEST, getEndDay);
}

export default getEndDaySaga;
