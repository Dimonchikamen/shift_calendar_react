import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { getEventsFailure, getEventsSuccess } from "../../Actions/EventsActions/GetEventsActions";
import { Event } from "../../../Types/Event";
import { getStartAndEndOfWeek } from "../../../Helpers/GetStartAndEndOfWeek";
import { GetEventsRequest } from "../../Types/EventsTypes";
import { getInformationRequest } from "../../Actions/GetInformationActions";

const getEventsFetch = (): Promise<Event[]> => ServerAPI.getEvents();

function* getEvents({ payload }: GetEventsRequest) {
    try {
        const response: Event[] = yield call(getEventsFetch);
        if (response.length === 0) throw Error("Мероприятий нет, попробуйте обновить страницу позже");
        yield put(getEventsSuccess(response));
        const [start, end] = getStartAndEndOfWeek(payload);
        yield put(getInformationRequest(start, end));
    } catch (e) {
        yield put(getEventsFailure({ error: (e as Error).message }));
    }
}

function* getEventsSaga() {
    yield takeLatest(ActionTypes.GET_EVENTS_REQUEST, getEvents);
}

export default getEventsSaga;
