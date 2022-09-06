import { ServerAPI } from "../../../API/ServerAPI";
import { ChangeWorkDayPayload, ChangeWorkDayRequest } from "../../Types/WorkDayTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { changeWorkDayFailure, changeWorkDaySuccess } from "../../Actions/WorkDayActions/WorkDayActions";

const changeWorkDayFetch = (start: number, end: number): Promise<ChangeWorkDayPayload> =>
    ServerAPI.changeWorkDayTime(start, end);

function* changeWorkDay({ payload: { start, end } }: ChangeWorkDayRequest) {
    try {
        const response: ChangeWorkDayPayload = yield call(changeWorkDayFetch, start, end);
        yield put(changeWorkDaySuccess(response));
    } catch (e) {
        yield put(changeWorkDayFailure({ error: (e as Error).message }));
    }
}

function* changeWorkDaySaga() {
    yield takeLatest(ActionTypes.CHANGE_WORK_DAY_REQUEST, changeWorkDay);
}

export default changeWorkDaySaga;
