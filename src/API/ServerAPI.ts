import axios from "axios";
import { WorkTime } from "../Types/WorkTime";
import moment from "moment";
import { post } from "jquery";
import { DATE_TIME_FORMAT } from "../Const";

export class ServerAPI {
    static async getRecruiterWorkTimes(year: number, month: number): Promise<WorkTime[]> {
        const url = `/events/get-recruiter-ranges?year=${year}&month=${month}`;
        return await axios.get(url).then(response => response.data);
    }

    static async addRecruiterWorkTime(start: Date, end: Date): Promise<WorkTime> {
        const url = `/events/set-recruiter-range`;
        return await post({
            url: url,
            data: {
                start: moment(start).format(DATE_TIME_FORMAT),
                end: moment(end).format(DATE_TIME_FORMAT),
            },
        }).done(response => response.data);
    }

    static async editRecruiterWorkTime(start: Date, end: Date, workTimeId: number): Promise<WorkTime> {
        const url = `/events/set-recruiter-range`;
        return await post({
            url: url,
            data: {
                workTimeId,
                start: moment(start).format(DATE_TIME_FORMAT),
                end: moment(end).format(DATE_TIME_FORMAT),
            },
        }).done(response => response.data);
    }

    static async removeRecruiterWorkTime(workTimeId: number): Promise<number> {
        const url = `/events/remove-recruiter-range`;
        return await post({
            url: url,
            data: { workTimeId },
        }).done(response => response.data);
    }
}
