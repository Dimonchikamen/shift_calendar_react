import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import {
    getRecruiterWorkTimesFailure,
    getRecruiterWorkTimesSuccess,
} from "../../Actions/RecruitersActions/GetRecruitersActions";
import { GetRecruiterWorkTimesRequest } from "../../Types/RecruitersTypes";
import { WorkTime } from "../../../Types/WorkTime";

const getRecruitersFetch = (year: number, month: number): Promise<WorkTime[]> =>
    ServerAPI.getRecruiterWorkTimes(year, month);

function* getRecruiterWorkTimes({ payload: { year, month } }: GetRecruiterWorkTimesRequest) {
    try {
        const response: WorkTime[] = yield call(getRecruitersFetch, year, month);
        yield put(getRecruiterWorkTimesSuccess(response));
    } catch (e) {
        yield put(getRecruiterWorkTimesFailure({ error: (e as Error).message }));
    }
}

function* getRecruiterWorkTimesSaga() {
    yield takeLatest(ActionTypes.GET_RECRUITER_WORK_TIMES_REQUEST, getRecruiterWorkTimes);
}

export default getRecruiterWorkTimesSaga;
