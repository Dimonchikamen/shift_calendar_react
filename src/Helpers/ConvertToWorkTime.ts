import { WorkTime } from "../Types/WorkTime";
import { WorkTimeResponse } from "../Types/WorkTimeResponse";

export const convertToWorkTime = (workTimeResponse: WorkTimeResponse): WorkTime => {
    return {
        id: Number(workTimeResponse.workTimeId),
        start: workTimeResponse.start,
        end: workTimeResponse.end,
    };
};
