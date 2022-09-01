import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { getEventsFailure, getEventsSuccess } from "../../Actions/EventsActions/GetEventsActions";
import { Recruiter } from "../../../Types/Recruiter";
import { getRecruitersFailure, getRecruitersSuccess } from "../../Actions/RecruitersActions/GetRecruitersActions";

const getEventsFetch = (): Promise<string[]> => ServerAPI.getEvents();
const getRecruitersFetch = (): Promise<Recruiter[]> => ServerAPI.getRecruiters();

function* getEvents() {
    try {
        const response: string[] = yield call(getEventsFetch);
        yield put(getEventsSuccess(response));
        // const res1: Recruiter[] = yield call(getRecruitersFetch);
        // yield put(getRecruitersSuccess(res1));
    } catch (e) {
        yield put(getEventsFailure({ error: (e as Error).message }));
        yield put(getRecruitersFailure({ error: (e as Error).message }));
    }
}

function* getEventsSaga() {
    yield takeLatest(ActionTypes.GET_EVENTS_REQUEST, getEvents);
}

export default getEventsSaga;
