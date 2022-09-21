import axios from "axios";
import { WorkTime } from "../Types/WorkTime";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../Const";

export class ServerAPI {
    private static startUrl = process.env.REACT_APP_SERVER_HOST;

    static async getRecruiterWorkTimes(year: number, month: number): Promise<WorkTime[]> {
        const url = this.startUrl + `/events/get-recruiter-ranges?year=${year}&month=${month}`;
        return await axios.get(url).then(response => response.data);
    }

    static async addRecruiterWorkTime(start: Date, end: Date): Promise<WorkTime> {
        const url = this.startUrl + `/event/set-recruiter-range`;
        return await axios
            .post(url, { start: moment(start).format(DATE_TIME_FORMAT), end: moment(end).format(DATE_TIME_FORMAT) })
            .then(response => response.data);
    }

    static async editRecruiterWorkTime(start: Date, end: Date, workTimeId: number): Promise<WorkTime> {
        const url = this.startUrl + `/event/edit-recruiter-range`;
        return await axios
            .post(url, {
                workTimeId,
                start: moment(start).format(DATE_TIME_FORMAT),
                end: moment(end).format(DATE_TIME_FORMAT),
            })
            .then(response => response.data);
    }

    static async removeRecruiterWorkTime(workTimeId: number): Promise<number> {
        const url = this.startUrl + `/event/remove-recruiter-range`;
        return await axios.post(url, { workTimeId }).then(response => response.data);
    }
}
