import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { ChangeStartDayRequest } from "../../Types/WorkDayTypes";
import { changeStartDayFailure, changeStartDaySuccess } from "../../Actions/WorkDayActions/ChangeStartDayActions";

const changeStart = (newStart: number): Promise<number> => ServerAPI.changeDayStart(newStart);

function* changeDayStart({ payload }: ChangeStartDayRequest) {
    try {
        const response: number = yield call(changeStart, payload);
        yield put(changeStartDaySuccess(response));
    } catch (e) {
        yield put(changeStartDayFailure({ error: (e as Error).message }));
    }
}

function* changeStartDaySaga() {
    yield takeLatest(ActionTypes.CHANGE_START_DAY_REQUEST, changeDayStart);
}

export default changeStartDaySaga;
