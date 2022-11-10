import { call, put, takeEvery } from "redux-saga/effects";
import { ServerAPI } from "../../../API/ServerAPI";
import { ActionTypes } from "../../ActionTypes";
import {
    changeRecruiterForInterviewFailure,
    changeRecruiterForInterviewSuccess,
} from "../../Actions/ChangeRecruiterForInterviewActions";
import {
    ChangeRecruiterForInterviewRequest,
    ChangeRecruiterForInterviewResponse,
} from "../../Types/ChangeRecruiterForInterviewTypes";

const changeRecruiter = (interviewId: number, workTimeId: number): Promise<ChangeRecruiterForInterviewResponse> => {
    const data = new FormData();
    data.append("interviewId", String(interviewId));
    data.append("workTimeId", String(workTimeId));
    return ServerAPI.changeRecruiterForInterview(data);
};

function* changeRecruiterForInterviewWorker({
    payload: { workTimeId, interviewId, oldWorkTimeId, oldRecruiterId, newRecruiterId },
}: ChangeRecruiterForInterviewRequest) {
    try {
        const response: ChangeRecruiterForInterviewResponse = yield call(changeRecruiter, interviewId, workTimeId);
        yield put(
            changeRecruiterForInterviewSuccess({
                interviewId: Number(response.interviewId),
                workTimeId: Number(response.workTimeId),
                newRecruiterId,
                oldRecruiterId,
                oldWorkTimeId,
            })
        );
    } catch (e) {
        yield put(changeRecruiterForInterviewFailure((e as Error).message));
    }
}

function* changeRecruiterForInterviewWatcher() {
    yield takeEvery(ActionTypes.CHANGE_RECRUITER_FOR_INTERVIEW_REQUEST, changeRecruiterForInterviewWorker);
}

export default changeRecruiterForInterviewWatcher;
