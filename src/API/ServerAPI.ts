import axios from "axios";
import { Recruiter } from "../Types/Recruiter";
import moment from "moment";
import { ChangeWorkTimePayload, GetWorkTimeSuccessPayload } from "../Redux/Types/WorkTimeTypes";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../Constants";
import { Event } from "../Types/Event";
import eventsMock from "../Mocks/Events2.json";
import informationMock from "../Mocks/Response2.json";
import informationForVolunteerMock from "../Mocks/ResponseForVolunteer.json";
import { GetInformationResponse } from "../Types/GetInformationResponse";
import { FullDateTime } from "../Types/FullDateTime";

export class ServerAPI {
    static async getInformation(startDate: Date, endDate: Date): Promise<GetInformationResponse> {
        const start = moment(startDate).format(DATE_FORMAT);
        const end = moment(endDate).format(DATE_FORMAT);
        const url = `/events/get-information?start=${start}&end=${end}`;
        return await axios.get(url).then(res => res.data);
    }

    static async getEvents(): Promise<Event[]> {
        const url = "/events/get-list";
        return await axios.get(url).then(response => response.data);
    }

    static async addRecruiterWorkTime(
        start: Date,
        end: Date,
        recruiterId: number,
        eventId: number
    ): Promise<Recruiter> {
        const url = `/event/${eventId}/set-worktime`;
        const data = new FormData();
        data.append("start", moment(start).format(DATE_TIME_FORMAT));
        data.append("end", moment(end).format(DATE_TIME_FORMAT));
        data.append("recruiterId", String(recruiterId));
        data.append("eventId", String(eventId));
        return await axios.post(url, data).then(response => response.data);
    }

    static async editRecruiterWorkTime(
        start: Date,
        end: Date,
        recruiterId: number,
        workTimeId: number,
        eventId: number
    ): Promise<Recruiter> {
        const url = `/event/${eventId}/set-worktime`;
        const data = new FormData();
        data.append("start", moment(start).format(DATE_TIME_FORMAT));
        data.append("end", moment(end).format(DATE_TIME_FORMAT));
        data.append("recruiterId", String(recruiterId));
        data.append("workTimeId", String(workTimeId));
        return await axios.post(url, data).then(response => response.data);
    }

    static async removeRecruiterWorkTime(recruiterId: number, workTimeId: number, eventId: number): Promise<Recruiter> {
        const url = `/event/${eventId}/remove-worktime`;
        const data = new FormData();
        data.append("recruiterId", String(recruiterId));
        data.append("workTimeId", String(workTimeId));
        return await axios.post(url, data).then(response => response.data);
    }

    static async changeInterviewTime(eventId: number, newInterviewTime: number): Promise<number> {
        const url = `/event/${eventId}/set-interview-time`;
        const data = new FormData();
        data.append("newInterwviewTime", String(newInterviewTime));
        return await axios.post(url, newInterviewTime).then(res => res.data);
    }

    static async changeWorkTime(
        eventId: number,
        date: Date,
        newStart: number,
        newEnd: number
    ): Promise<ChangeWorkTimePayload> {
        const url = `/event/${eventId}/set-day-worktime/${moment(date).format(DATE_FORMAT)}`;
        const data = new FormData();
        data.append("start", String(newStart));
        data.append("end", String(newEnd));
        data.append("date", moment(date).format(DATE_TIME_FORMAT));
        data.append("eventId", String(eventId));
        return await axios.post(url, data).then(res => res.data);
    }

    static async singUpVolunteer(
        recruiterWorkTimeId: number,
        roleId: number,
        start: FullDateTime,
        end: FullDateTime
    ): Promise<Recruiter> {
        const url = "/events/set-interview";
        const data = new FormData();
        data.append("workTimeId", String(recruiterWorkTimeId));
        data.append("roleId", String(roleId));
        data.append("start", start);
        data.append("end", end);
        return await axios.post(url, data).then(res => res.data);
    }
}
