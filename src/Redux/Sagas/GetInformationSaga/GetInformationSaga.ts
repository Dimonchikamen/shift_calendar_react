import { ServerAPI } from "../../../API/ServerAPI";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { getInformationFailure, getInformationSuccess } from "../../Actions/GetInformationActions";
import { ActionTypes } from "../../ActionTypes";
import { GetInformationRequest } from "../../Types/GetInformationTypes";
import { GetInformationResponse } from "../../../Types/GetInformationResponse";
import { getDateWhereInterviewIsActive } from "../../Helpers/GetDateWhereInterviewIsActive";
import { getIsWidget } from "../../Selectors";
import { changeCurrentDateAction } from "../../Actions/ChangeCurrentDateActions";

const getInformationFetch = async (start: Date, end: Date): Promise<GetInformationResponse> =>
    await ServerAPI.getInformation(start, end);

function* getInformation({ payload: { start, end } }: GetInformationRequest) {
    try {
        const information: GetInformationResponse = yield call(getInformationFetch, start, end);
        const isWidget: boolean = yield select(getIsWidget);
        if (isWidget) {
            const date: Date | null = yield call(getDateWhereInterviewIsActive, information.recruiters);
            if (date) {
                yield put(changeCurrentDateAction(date));
            }
        }
        yield put(getInformationSuccess(information));
    } catch (e) {
        yield put(getInformationFailure({ error: (e as Error).message }));
    }
}

function* getInformationSaga() {
    yield takeLatest(ActionTypes.GET_INFORMATION_REQUEST, getInformation);
}

export default getInformationSaga;
