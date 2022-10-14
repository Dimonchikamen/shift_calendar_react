import {
    ChangeWorkTimeFailure,
    ChangeWorkTimeRequest,
    ChangeWorkTimeSuccess,
    FailurePayload,
    ChangeWorkTimePayload,
} from "../../Types/WorkTimeTypes";
import { ActionTypes } from "../../ActionTypes";

export const changeWorkTimeRequest = (
    eventId: number,
    date: Date,
    start: number,
    end: number
): ChangeWorkTimeRequest => ({
    type: ActionTypes.CHANGE_WORK_TIME_REQUEST,
    payload: { eventId, date, start, end },
});

export const changeWorkTimeSuccess = (payload: ChangeWorkTimePayload): ChangeWorkTimeSuccess => ({
    type: ActionTypes.CHANGE_WORK_TIME_SUCCESS,
    payload,
});

export const changeWorkTimeFailure = (payload: FailurePayload): ChangeWorkTimeFailure => ({
    type: ActionTypes.CHANGE_WORK_TIME_FAILURE,
    payload,
});
