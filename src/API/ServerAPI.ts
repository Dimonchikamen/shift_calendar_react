import axios from "axios";
import { WorkTime } from "../Types/WorkTime";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../Const";
import { WorkTimeResponse } from "../Types/WorkTimeResponse";

export class ServerAPI {
    static async getRecruiterWorkTimes(year: number, month: number): Promise<WorkTime[]> {
        const url = `/events/get-recruiter-ranges?year=${year}&month=${month + 1}`;
        return await axios.get(url).then(response => response.data);
    }

    static async addRecruiterWorkTime(start: Date, end: Date): Promise<WorkTimeResponse> {
        const url = "/events/set-recruiter-range";
        const params = new FormData();
        params.append("start", moment(start).format(DATE_TIME_FORMAT));
        params.append("end", moment(end).format(DATE_TIME_FORMAT));
        return await axios.post(url, params).then(response => response.data);
    }

    static async editRecruiterWorkTime(start: Date, end: Date, workTimeId: number): Promise<WorkTimeResponse> {
        const url = `/events/set-recruiter-range`;
        const params = new FormData();
        params.append("workTimeId", workTimeId.toString());
        params.append("start", moment(start).format(DATE_TIME_FORMAT));
        params.append("end", moment(end).format(DATE_TIME_FORMAT));
        return await axios.post(url, params).then(response => response.data);
    }

    static async removeRecruiterWorkTime(workTimeId: number): Promise<number> {
        const url = `/events/remove-recruiter-range`;
        const params = new FormData();
        params.append("workTimeId", workTimeId.toString());
        return await axios.post(url, params).then(response => response.data);
    }
}
