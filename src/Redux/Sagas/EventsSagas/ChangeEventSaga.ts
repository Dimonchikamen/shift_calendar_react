import { ServerAPI } from "../../../API/ServerAPI";
import { ChangeEventRequest } from "../../Types/EventsTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { Recruiter } from "../../../Types/Recruiter";
import { getRecruitersFailure, getRecruitersSuccess } from "../../Actions/RecruitersActions/GetRecruitersActions";
import { changeEventFailure, changeEventSuccess } from "../../Actions/EventsActions/ChangeEventActions";
import { ActionTypes } from "../../ActionTypes";

const changeEventFetch = (event: string) => ServerAPI.changeEvent(event);
const getRecruitersFetch = (event: string) => ServerAPI.getRecruiters(event);

function* changeEvent({ payload }: ChangeEventRequest) {
    try {
        const response: string = yield call(changeEventFetch, payload);
        yield put(changeEventSuccess(response));
        const res: Recruiter[] = yield call(getRecruitersFetch, response);
        yield put(getRecruitersSuccess(res));
    } catch (e) {
        yield put(changeEventFailure({ error: (e as Error).message }));
        yield put(getRecruitersFailure({ error: (e as Error).message }));
    }
}

function* changeEventSaga() {
    yield takeLatest(ActionTypes.CHANGE_EVENT_REQUEST, changeEvent);
}

export default changeEventSaga;
