import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { getStartDayFailure, getStartDaySuccess } from "../../Actions/WorkDayActions/GetStartDayActions";

const getStart = (): Promise<number> => ServerAPI.getDayStart();
function* getStartDay() {
    try {
        const response: number = yield call(getStart);
        yield put(getStartDaySuccess(response));
    } catch (e) {
        yield put(getStartDayFailure({ error: (e as Error).message }));
    }
}

function* getStartDaySaga() {
    yield takeLatest(ActionTypes.GET_START_DAY_REQUEST, getStartDay);
}

export default getStartDaySaga;
