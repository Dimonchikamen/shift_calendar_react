import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { ChangeInterviewTimeRequest } from "../../Types/InterviewTimeTypes";
import {
    changeInterviewTimeFailure,
    changeInterviewTimeSuccess,
} from "../../Actions/InterviewTimActions/ChangeInterviewTimeActions";

const changeTime = (newTime: number): Promise<number> => ServerAPI.changeInterviewTime(newTime);

function* changeInterviewTime({ payload }: ChangeInterviewTimeRequest) {
    try {
        const response: number = yield call(changeTime, payload);
        yield put(changeInterviewTimeSuccess(response));
    } catch (e) {
        yield put(changeInterviewTimeFailure({ error: (e as Error).message }));
    }
}

function* changeInterviewTimeSaga() {
    yield takeLatest(ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST, changeInterviewTime);
}

export default changeInterviewTimeSaga;
