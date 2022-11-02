import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { ChangeInterviewTimeRequest } from "../../Types/InterviewTimeTypes";
import {
    changeInterviewTimeFailure,
    changeInterviewTimeSuccess,
} from "../../Actions/InterviewTimeActions/ChangeInterviewTimeActions";

const changeTime = (eventId: number, newTime: number): Promise<number> =>
    ServerAPI.changeInterviewTime(eventId, newTime);

function* changeInterviewTime({ payload: { eventId, newTime } }: ChangeInterviewTimeRequest) {
    try {
        const response: number = yield call(changeTime, eventId, newTime);
        yield put(changeInterviewTimeSuccess(Number(response)));
    } catch (e) {
        yield put(changeInterviewTimeFailure({ error: (e as Error).message }));
    }
}

function* changeInterviewTimeSaga() {
    yield takeLatest(ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST, changeInterviewTime);
}

export default changeInterviewTimeSaga;
