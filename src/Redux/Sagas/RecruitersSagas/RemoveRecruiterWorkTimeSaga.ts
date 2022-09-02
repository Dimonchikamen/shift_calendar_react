import { Recruiter } from "../../../Types/Recruiter";
import { ServerAPI } from "../../../API/ServerAPI";
import { RemoveRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    removeRecruiterWorkTimeFailure,
    removeRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";
import { ActionTypes } from "../../ActionTypes";

const removeRecruiterWorkTimeFetch = (recruiterId: number, workTimeId: number): Promise<Recruiter> =>
    ServerAPI.removeRecruiterWorkTime(recruiterId, workTimeId);

function* removeRecruiterWorkTime({ payload: { recruiterId, workTimeId } }: RemoveRecruiterWorkTimeRequest) {
    try {
        const response: Recruiter = yield call(removeRecruiterWorkTimeFetch, recruiterId, workTimeId);
        yield put(removeRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(removeRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* removeRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.REMOVE_RECRUITER_EVENT_REQUEST, removeRecruiterWorkTime);
}

export default removeRecruiterWorkTimeSaga;
