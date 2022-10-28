import { ServerAPI } from "../../../API/ServerAPI";
import { AddRecruiterWorkTimeRequest, RecruiterWorkTimePayload } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import {
    addRecruiterWorkTimeFailure,
    addRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";

const addRecruiterWorkTimeFetch = (
    start: Date,
    end: Date,
    recruiterId: number,
    eventId: number
): Promise<RecruiterWorkTimePayload> => ServerAPI.addRecruiterWorkTime(start, end, recruiterId, eventId);

function* addRecruiterWorkTime({ payload: { start, end, recruiterId, eventId } }: AddRecruiterWorkTimeRequest) {
    try {
        const response: RecruiterWorkTimePayload = yield call(
            addRecruiterWorkTimeFetch,
            start,
            end,
            recruiterId,
            eventId
        );
        yield put(addRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(addRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* addRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.ADD_RECRUITER_EVENT_REQUEST, addRecruiterWorkTime);
}

export default addRecruiterWorkTimeSaga;
