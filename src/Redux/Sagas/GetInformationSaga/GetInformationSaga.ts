import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { getInformationFailure, getInformationSuccess } from "../../Actions/GetInformationActions";
import { ActionTypes } from "../../ActionTypes";
import { GetInformationRequest } from "../../Types/GetInformationTypes";
import { GetInformationResponse } from "../../../Types/GetInformationResponse";

const getInformationFetch = async (start: Date, end: Date): Promise<GetInformationResponse> =>
    await ServerAPI.getInformation(start, end);

function* getInformation({ payload: { start, end } }: GetInformationRequest) {
    try {
        const information: GetInformationResponse = yield call(getInformationFetch, start, end);
        yield put(getInformationSuccess(information));
    } catch (e) {
        yield put(getInformationFailure({ error: (e as Error).message }));
    }
}

function* getInformationSaga() {
    yield takeLatest(ActionTypes.GET_INFORMATION_REQUEST, getInformation);
}

export default getInformationSaga;
