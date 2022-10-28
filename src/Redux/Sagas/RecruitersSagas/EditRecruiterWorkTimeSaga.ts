import { ServerAPI } from "../../../API/ServerAPI";
import { EditRecruiterWorkTimeRequest, RecruiterWorkTimePayload } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    editRecruiterWorkTimeFailure,
    editRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";
import { ActionTypes } from "../../ActionTypes";

const editRecruiterWorkTimeFetch = (
    start: Date,
    end: Date,
    recruiterId: number,
    workTimeId: number,
    eventId: number
): Promise<RecruiterWorkTimePayload> => ServerAPI.editRecruiterWorkTime(start, end, recruiterId, workTimeId, eventId);

function* editRecruiterWorkTime({
    payload: { start, end, recruiterId, workTimeId, eventId },
}: EditRecruiterWorkTimeRequest) {
    try {
        const response: RecruiterWorkTimePayload = yield call(
            editRecruiterWorkTimeFetch,
            start,
            end,
            recruiterId,
            workTimeId,
            eventId
        );
        yield put(editRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(editRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* editRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.EDIT_RECRUITER_EVENT_REQUEST, editRecruiterWorkTime);
}

export default editRecruiterWorkTimeSaga;
