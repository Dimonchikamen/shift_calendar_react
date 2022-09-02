import { Recruiter } from "../../../Types/Recruiter";
import { ServerAPI } from "../../../API/ServerAPI";
import { AddRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import {
    addRecruiterWorkTimeFailure,
    addRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";

const addRecruiterWorkTimeFetch = (start: Date, end: Date, recruiterId: number, event: string): Promise<Recruiter> =>
    ServerAPI.addRecruiterWorkTime(start, end, recruiterId, event);

function* addRecruiterWorkTime({ payload: { start, end, recruiterId, event } }: AddRecruiterWorkTimeRequest) {
    try {
        const response: Recruiter = yield call(addRecruiterWorkTimeFetch, start, end, recruiterId, event);
        yield put(addRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(addRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* addRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.ADD_RECRUITER_EVENT_REQUEST, addRecruiterWorkTime);
}

export default addRecruiterWorkTimeSaga;
