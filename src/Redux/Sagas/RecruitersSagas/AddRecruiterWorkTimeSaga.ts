import { ServerAPI } from "../../../API/ServerAPI";
import { AddRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import {
    addRecruiterWorkTimeFailure,
    addRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";
import { WorkTimeResponse } from "../../../Types/WorkTimeResponse";

const addRecruiterWorkTimeFetch = (start: Date, end: Date): Promise<WorkTimeResponse> =>
    ServerAPI.addRecruiterWorkTime(start, end);

function* addRecruiterWorkTime({ payload: { start, end } }: AddRecruiterWorkTimeRequest) {
    try {
        const response: WorkTimeResponse = yield call(addRecruiterWorkTimeFetch, start, end);
        yield put(addRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(addRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* addRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.ADD_RECRUITER_WORK_TIME_REQUEST, addRecruiterWorkTime);
}

export default addRecruiterWorkTimeSaga;
