import { ServerAPI } from "../../../API/ServerAPI";
import { ChangeWorkTimePayload, ChangeWorkTimeRequest } from "../../Types/WorkTimeTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { changeWorkTimeFailure, changeWorkTimeSuccess } from "../../Actions/WorkTimeActions/WorkDayActions";

const changeWorkDayFetch = (eventId: number, date: Date, start: number, end: number): Promise<ChangeWorkTimePayload> =>
    ServerAPI.changeWorkTime(eventId, date, start, end);

function* changeWorkDay({ payload: { eventId, date, start, end } }: ChangeWorkTimeRequest) {
    try {
        const response: ChangeWorkTimePayload = yield call(changeWorkDayFetch, eventId, date, start, end);
        yield put(changeWorkTimeSuccess(response));
    } catch (e) {
        yield put(changeWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* changeWorkDaySaga() {
    yield takeLatest(ActionTypes.CHANGE_WORK_TIME_REQUEST, changeWorkDay);
}

export default changeWorkDaySaga;
