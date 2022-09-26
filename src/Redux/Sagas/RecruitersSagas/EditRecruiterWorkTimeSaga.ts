import { ServerAPI } from "../../../API/ServerAPI";
import { EditRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    editRecruiterWorkTimeFailure,
    editRecruiterWorkTimeSuccess,
} from "../../Actions/RecruitersActions/RecruiterWorkTimesActions";
import { ActionTypes } from "../../ActionTypes";
import { WorkTimeResponse } from "../../../Types/WorkTimeResponse";

const editRecruiterWorkTimeFetch = (start: Date, end: Date, workTimeId: number): Promise<WorkTimeResponse> =>
    ServerAPI.editRecruiterWorkTime(start, end, workTimeId);

function* editRecruiterWorkTime({ payload: { start, end, workTimeId } }: EditRecruiterWorkTimeRequest) {
    try {
        const response: WorkTimeResponse = yield call(editRecruiterWorkTimeFetch, start, end, workTimeId);
        yield put(editRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(editRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* editRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.EDIT_RECRUITER_WORK_TIME_REQUEST, editRecruiterWorkTime);
}

export default editRecruiterWorkTimeSaga;
