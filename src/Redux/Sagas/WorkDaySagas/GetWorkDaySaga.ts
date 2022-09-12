import { GetWorkTimeSuccessPayload, GetWorkTimeRequest } from "../../Types/WorkTimeTypes";
import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { getWorkTimeFailure, getWorkTimeSuccess } from "../../Actions/WorkTimeActions/WorkDayActions";
import { ActionTypes } from "../../ActionTypes";

const getWorkDayFetch = (date: Date, eventId: number): Promise<GetWorkTimeSuccessPayload | ""> =>
    ServerAPI.getWorkTime(date, eventId);

function* getWorkDay({ payload: { date, eventId } }: GetWorkTimeRequest) {
    try {
        const response: GetWorkTimeSuccessPayload | "" = yield call(getWorkDayFetch, date, eventId);
        yield put(getWorkTimeSuccess(response));
    } catch (e) {
        yield put(getWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* getWorkDaySaga() {
    yield takeLatest(ActionTypes.GET_WORK_TIME_REQUEST, getWorkDay);
}

export default getWorkDaySaga;
