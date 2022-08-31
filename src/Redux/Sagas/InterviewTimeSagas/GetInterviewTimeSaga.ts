import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import {
    getInterviewTimeFailure,
    getInterviewTimeSuccess,
} from "../../Actions/InterviewTimActions/GetInterviewTimeActions";

const getTime = (): Promise<number> => ServerAPI.getInterviewTime();

function* getInterviewTime() {
    try {
        const response: number = yield call(getTime);
        yield put(getInterviewTimeSuccess(response));
    } catch (e) {
        yield put(getInterviewTimeFailure({ error: (e as Error).message }));
    }
}

function* getInterviewTimeSaga() {
    yield takeLatest(ActionTypes.GET_INTERVIEW_TIME_REQUEST, getInterviewTime);
}

export default getInterviewTimeSaga;
