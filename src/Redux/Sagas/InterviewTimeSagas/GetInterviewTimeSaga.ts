import { ServerAPI } from "../../../API/ServerAPI";
// import { call, put, takeLatest } from "redux-saga/effects";
// import { ActionTypes } from "../../ActionTypes";
// import {
//     getInterviewTimeFailure,
//     getInterviewTimeSuccess,
// } from "../../Actions/InterviewTimeActions/GetInterviewTimeActions";
// import { GetInterviewTimeRequest } from "../../Types/InterviewTimeTypes";

// const getTime = (eventId: number): Promise<number | ""> => ServerAPI.getInterviewTime(eventId);
//
// function* getInterviewTime({ payload }: GetInterviewTimeRequest) {
//     try {
//         const response: number | "" = yield call(getTime, payload);
//         yield put(getInterviewTimeSuccess(response));
//     } catch (e) {
//         yield put(getInterviewTimeFailure({ error: (e as Error).message }));
//     }
// }
//
// function* getInterviewTimeSaga() {
//     yield takeLatest(ActionTypes.GET_INTERVIEW_TIME_REQUEST, getInterviewTime);
// }
//
// export default getInterviewTimeSaga;
