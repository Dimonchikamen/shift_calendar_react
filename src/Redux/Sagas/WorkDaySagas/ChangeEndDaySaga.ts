import { ServerAPI } from "../../../API/ServerAPI";
import { ChangeEndDayRequest } from "../../Types/WorkDayTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { changeEndDayFailure, changeEndDaySuccess } from "../../Actions/WorkDayActions/ChangeEndDayActions";

const changeEnd = (newEnd: number): Promise<number> => ServerAPI.changeDayEnd(newEnd);

function* changeDayEnd({ payload }: ChangeEndDayRequest) {
    try {
        const response: number = yield call(changeEnd, payload);
        yield put(changeEndDaySuccess(response));
    } catch (e) {
        yield put(changeEndDayFailure({ error: (e as Error).message }));
    }
}

function* changeEndDaySaga() {
    yield takeLatest(ActionTypes.CHANGE_END_DAY_REQUEST, changeDayEnd);
}

export default changeEndDaySaga;
