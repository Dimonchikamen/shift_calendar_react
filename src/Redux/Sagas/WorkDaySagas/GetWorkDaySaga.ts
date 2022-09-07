import { GetWorkDayPayload, GetWorkDayRequest } from "../../Types/WorkDayTypes";
import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { getWorkDayFailure, getWorkDaySuccess } from "../../Actions/WorkDayActions/WorkDayActions";
import { ActionTypes } from "../../ActionTypes";

const getWorkDayFetch = (date: Date): Promise<GetWorkDayPayload | ""> => ServerAPI.getWorkDayTime(date);

function* getWorkDay({ payload }: GetWorkDayRequest) {
    try {
        const response: GetWorkDayPayload | "" = yield call(getWorkDayFetch, payload);
        yield put(getWorkDaySuccess(response));
    } catch (e) {
        yield put(getWorkDayFailure({ error: (e as Error).message }));
    }
}

function* getWorkDaySaga() {
    yield takeLatest(ActionTypes.GET_WORK_DAY_REQUEST, getWorkDay);
}

export default getWorkDaySaga;
