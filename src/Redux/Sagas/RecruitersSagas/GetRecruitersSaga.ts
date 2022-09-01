import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { Recruiter } from "../../../Types/Recruiter";
import { getRecruitersFailure, getRecruitersSuccess } from "../../Actions/RecruitersActions/GetRecruitersActions";
import { GetRecruitersRequest } from "../../Types/RecruitersTypes";

const getRecruitersFetch = (start?: Date, end?: Date): Promise<Recruiter[]> => ServerAPI.getRecruiters(start, end);

function* getRecruiters({ payload: { start, end } }: GetRecruitersRequest) {
    try {
        const response: Recruiter[] = yield call(getRecruitersFetch, start, end);
        yield put(getRecruitersSuccess(response));
    } catch (e) {
        yield put(getRecruitersFailure({ error: (e as Error).message }));
    }
}

function* getRecruitersSaga() {
    yield takeLatest(ActionTypes.GET_RECRUITERS_REQUEST, getRecruiters);
}

export default getRecruitersSaga;
