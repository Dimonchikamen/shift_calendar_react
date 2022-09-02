import { Recruiter } from "../../../Types/Recruiter";
import { ServerAPI } from "../../../API/ServerAPI";
import { EditRecruiterWorkTimeRequest } from "../../Types/RecruitersTypes";
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
    workTimeId: number
): Promise<Recruiter> => ServerAPI.editRecruiterWorkTime(start, end, recruiterId, workTimeId);

function* editRecruiterWorkTime({ payload: { start, end, recruiterId, workTimeId } }: EditRecruiterWorkTimeRequest) {
    try {
        const response: Recruiter = yield call(editRecruiterWorkTimeFetch, start, end, recruiterId, workTimeId);
        yield put(editRecruiterWorkTimeSuccess(response));
    } catch (e) {
        yield put(editRecruiterWorkTimeFailure({ error: (e as Error).message }));
    }
}

function* editRecruiterWorkTimeSaga() {
    yield takeLatest(ActionTypes.EDIT_RECRUITER_EVENT_REQUEST, editRecruiterWorkTime);
}

export default editRecruiterWorkTimeSaga;
