import { call, put, takeEvery } from "redux-saga/effects";
import { ActionTypes } from "../../ActionTypes";
import { ServerAPI } from "../../../API/ServerAPI";
import { AxiosResponse } from "axios";
import {
    replaceInterviewTimeFailure,
    replaceInterviewTimeSuccess,
} from "../../Actions/InterviewTimeActions/ReplaceInterviewTimeActions";
import { ReplaceInterviewTimeRequest } from "../../Types/InterviewTimeTypes";
import { FullDateTime } from "../../../Types/FullDateTime";
import { SignVolunteerResponsePayload } from "../../Types/SignUpVolunteerTypes";
import { getDate, getTime } from "../../../Helpers/DateTimeHelpers";

const replaceInterviewTimeFetch = (
    roleId: number,
    start: FullDateTime,
    end: FullDateTime,
    phone: string,
    contacts: string[],
    recruiterId: number
): Promise<SignVolunteerResponsePayload> => {
    const data = new FormData();
    data.append("roleId", roleId.toString());
    data.append("start", start);
    data.append("end", end);
    data.append("phone", phone);
    data.append("contacts", JSON.stringify(contacts));
    data.append("recruiterId", recruiterId.toString());
    return ServerAPI.singUpVolunteer(data);
};

function* replaceInterviewTimeWorker({ payload }: ReplaceInterviewTimeRequest) {
    try {
        const data = new FormData();
        data.append("interviewId", payload.interviewId.toString());
        const separate = payload.newDate.split(" ");
        const date = separate[0];
        const startTime = getTime(payload.newDate);
        const endTime = separate[separate.length - 1];
        const start = `${date} ${startTime}`;
        data.append("start", start);
        const end = `${date} ${endTime}`;
        data.append("end", end);
        const response: AxiosResponse<any> = yield call(ServerAPI.replaceInterviewTime, data);
        yield put(replaceInterviewTimeSuccess(payload));
    } catch (e) {
        yield put(replaceInterviewTimeFailure({ error: (e as Error).message }));
    }
}

function* replaceInterviewTimeSaga() {
    yield takeEvery(ActionTypes.REPLACE_INTERVIEW_TIME_REQUEST, replaceInterviewTimeWorker);
}

export default replaceInterviewTimeSaga;
