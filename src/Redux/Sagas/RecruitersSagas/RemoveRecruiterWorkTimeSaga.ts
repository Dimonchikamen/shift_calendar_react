import { ServerAPI } from "../../../API/ServerAPI";
import { RemoveRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    removeRecruiterWorkTimeFailure,
    removeRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";
import { ActionTypes } from "../../ActionTypes";
import { WorkTime } from "../../../Types/WorkTime";

const removeRecruiterWorkTimeFetch = (workTimeId: number): Promise<WorkTime[]> =>
    ServerAPI.removeRecruiterWorkTime(workTimeId);

function* removeRecruiterWorkTime({ payload: { workTimeId } }: RemoveRecruiterWorkTimeRequest) {
    try {
        const response: number = yield call(removeRecruiterWorkTimeFetch, workTimeId);
        yield put(removeRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(removeRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* removeRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.REMOVE_RECRUITER_WORK_TIME_REQUEST, removeRecruiterWorkTime);
}

export default removeRecruiterWorkTimeSaga;
