import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { ChangeInterviewTimeRequest } from "../../Types/InterviewTimeTypes";
import {
    changeInterviewTimeFailure,
    changeInterviewTimeSuccess,
} from "../../Actions/InterviewTimeActions/ChangeInterviewTimeActions";
import { GetInformationResponse } from "../../../Types/GetInformationResponse";
import { getStartAndEndOfWeek } from "../../../Helpers/GetStartAndEndOfWeek";
import { getInformationSuccess } from "../../Actions/GetInformationActions";

const changeTime = (eventId: number, newTime: number): Promise<number | { error: string }> =>
    ServerAPI.changeInterviewTime(eventId, newTime);

const getInformation = (start: Date, end: Date): Promise<GetInformationResponse> =>
    ServerAPI.getInformation(start, end);

function* changeInterviewTime({ payload: { eventId, newTime, currentDate } }: ChangeInterviewTimeRequest) {
    try {
        const response: number | { error: string } = yield call(changeTime, eventId, newTime);
        if ((response as { error: string }).error) throw new Error((response as { error: string }).error);
        const [start, end] = getStartAndEndOfWeek(currentDate);
        const informationResponse: GetInformationResponse = yield call(getInformation, start, end);
        yield put(getInformationSuccess(informationResponse));
        yield put(changeInterviewTimeSuccess(Number(response)));
    } catch (e) {
        yield put(changeInterviewTimeFailure({ error: (e as Error).message }));
    }
}

function* changeInterviewTimeSaga() {
    yield takeLatest(ActionTypes.CHANGE_INTERVIEW_TIME_REQUEST, changeInterviewTime);
}

export default changeInterviewTimeSaga;
