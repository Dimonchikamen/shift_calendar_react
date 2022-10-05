import { Recruiter } from "../../../Types/Recruiter";
import { ServerAPI } from "../../../API/ServerAPI";
import { RemoveRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    removeRecruiterWorkTimeFailure,
    removeRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";
import { ActionTypes } from "../../ActionTypes";

const removeRecruiterWorkTimeFetch = (recruiterId: number, workTimeId: number, eventId: number): Promise<Recruiter> =>
    ServerAPI.removeRecruiterWorkTime(recruiterId, workTimeId, eventId);

function* removeRecruiterWorkTime({ payload: { recruiterId, workTimeId, eventId } }: RemoveRecruiterWorkTimeRequest) {
    try {
        const response: Recruiter = yield call(removeRecruiterWorkTimeFetch, recruiterId, workTimeId, eventId);
        yield put(removeRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(removeRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* removeRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.REMOVE_RECRUITER_EVENT_REQUEST, removeRecruiterWorkTime);
}

export default removeRecruiterWorkTimeSaga;
