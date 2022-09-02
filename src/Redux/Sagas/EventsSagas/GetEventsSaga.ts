import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { getEventsFailure, getEventsSuccess } from "../../Actions/EventsActions/GetEventsActions";

const getEventsFetch = (): Promise<string[]> => ServerAPI.getEvents();

function* getEvents() {
    try {
        const response: string[] = yield call(getEventsFetch);
        yield put(getEventsSuccess(response));
    } catch (e) {
        yield put(getEventsFailure({ error: (e as Error).message }));
    }
}

function* getEventsSaga() {
    yield takeLatest(ActionTypes.GET_EVENTS_REQUEST, getEvents);
}

export default getEventsSaga;
