import { ServerAPI } from "../../../API/ServerAPI";
import { RemoveRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    removeRecruiterWorkTimeFailure,
    removeRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";
import { ActionTypes } from "../../ActionTypes";

const removeRecruiterWorkTimeFetch = (recruiterId: number, workTimeId: number, eventId: number): Promise<number> =>
    ServerAPI.removeRecruiterWorkTime(recruiterId, workTimeId, eventId);

function* removeRecruiterWorkTime({ payload: { recruiterId, workTimeId, eventId } }: RemoveRecruiterWorkTimeRequest) {
    try {
        const response: number = yield call(removeRecruiterWorkTimeFetch, recruiterId, workTimeId, eventId);
        yield put(removeRecruiterWorkTimeSuccess(recruiterId, workTimeId));
    } catch (e) {
        yield put(removeRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* removeRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.REMOVE_RECRUITER_EVENT_REQUEST, removeRecruiterWorkTime);
}

export default removeRecruiterWorkTimeSaga;
