import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { Recruiter } from "../../../Types/Recruiter";
import {
    getRecruiterWorkTimesFailure,
    getRecruiterWorkTimesSuccess,
} from "../../Actions/RecruitersActions/GetRecruitersActions";
import { GetRecruiterWorkTimesRequest } from "../../Types/RecruitersTypes";

const getRecruitersFetch = (start?: Date, end?: Date): Promise<Recruiter[]> => ServerAPI.getRecruiters(start, end);

function* getRecruiters({ payload: { start, end } }: GetRecruiterWorkTimesRequest) {
    try {
        const response: Recruiter[] = yield call(getRecruitersFetch, start, end);
        yield put(getRecruiterWorkTimesSuccess(response));
    } catch (e) {
        yield put(getRecruiterWorkTimesFailure({ error: (e as Error).message }));
    }
}

function* getRecruitersSaga() {
    yield takeLatest(ActionTypes.GET_RECRUITER_WORK_TIMES_REQUEST, getRecruiters);
}

export default getRecruitersSaga;
