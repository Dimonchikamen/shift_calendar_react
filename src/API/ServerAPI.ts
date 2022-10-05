import axios from "axios";
import { Recruiter } from "../Types/Recruiter";
import moment from "moment";
import { ChangeWorkTimePayload, GetWorkTimeSuccessPayload } from "../Redux/Types/WorkTimeTypes";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../Constants";
import { Event } from "../Types/Event";
import eventsMock from "../Mocks/Events.json";
import informationMock from "../Mocks/Response.json";
import { GetInformationResponse } from "../Types/GetInformationResponse";

export class ServerAPI {
    static async getInformation(startDate: Date, endDate: Date): Promise<GetInformationResponse> {
        const start = moment(startDate).format(DATE_FORMAT);
        const end = moment(endDate).format(DATE_FORMAT);
        const url = `/events/get-information?start=${start}&end=${end}`;
        return await axios.get("/").then(res => informationMock); //res.data);
    }

    static async getEvents(): Promise<Event[]> {
        const url = "/events/get-event-list";
        return await axios.get("/").then(response => eventsMock); //response.data);
    }

    // static async getRecruiters(start?: Date, end?: Date) {
    //     const url = "http://localhost:3000/";
    //     return await axios.get(url).then(response => recruitersMock);
    // }

    // static async getRecruiter(id: number) {
    //     const url = "http://localhost:3000/";
    //     return await axios.get(url).then(response => recruitersMock);
    // }

    static async addRecruiterWorkTime(start: Date, end: Date, recruiterId: number, event: string): Promise<Recruiter> {
        const url = "/";
        return await axios.get(url).then(
            response =>
                ({
                    id: recruiterId,
                    name: "Попов Николай",
                    workedTimes: [
                        {
                            id: 1000001,
                            events: [event],
                            start: moment(start).format(DATE_TIME_FORMAT),
                            end: moment(end).format(DATE_TIME_FORMAT),
                            interviews: [],
                        },
                    ],
                } as unknown as Recruiter)
        );
    }

    static async editRecruiterWorkTime(
        start: Date,
        end: Date,
        recruiterId: number,
        workTimeId: number
    ): Promise<Recruiter> {
        const url = "/";
        return await axios.post(url, { recruiterId, workTimeId, start, end }).then(response => response.data);
    }

    static async removeRecruiterWorkTime(recruiterId: number, workTimeId: number): Promise<Recruiter> {
        const url = "/";
        return await axios.post(url, { recruiterId, workTimeId }).then(response => response.data);
    }

    // static async getInterviewTime(eventId: number): Promise<number | ""> {
    //     const url = this.startUrl + `/event/${eventId}/get-interview-time`;
    //     return await axios.get(url).then(res => res.data);
    // }

    static async changeInterviewTime(eventId: number, newInterviewTime: number): Promise<number> {
        const url = `/event/${eventId}/set-interview-time`;
        return await axios.post(url, newInterviewTime).then(res => res.data);
    }

    // static async getWorkTime(date: Date, eventId: number): Promise<GetWorkTimeSuccessPayload | ""> {
    //     const url = this.startUrl + `/event/${eventId}/get-day-worktime/${moment(date).format(DATE_FORMAT)}`;
    //     return await axios.get(url).then(res => res.data);
    // }

    static async changeWorkTime(
        eventId: number,
        date: Date,
        newStart: number,
        newEnd: number
    ): Promise<ChangeWorkTimePayload> {
        const url = `/event/${eventId}/set-day-worktime/${moment(date).format(DATE_FORMAT)}`;
        return await axios.post(url, { beginTime: newStart, endTime: newEnd }).then(res => res.data);
    }
}
