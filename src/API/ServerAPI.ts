import axios from "axios";
import { Recruiter } from "../Types/Recruiter";
import moment from "moment";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../Components/ReactBigCalendar/ReactBigCalendar";
import { ChangeWorkTimePayload, GetWorkTimeSuccessPayload } from "../Redux/Types/WorkTimeTypes";

const recruitersMock = [
    {
        id: 1,
        name: "Попов Николай",
        workedTimes: [
            {
                id: 11,
                events: ["Ночь музеев"],
                start: "2022-08-31 09:00",
                end: "2022-08-31 11:00",
                interviews: [
                    {
                        id: 111,
                        name: "Ольшанский Кирилл",
                        event: "Ночь музеев",
                        role: "Тимлидер",
                        phone: "+7999999999",
                        contacts: ["Telegram"],
                        start: "9:00",
                        end: "9:30",
                    },
                ],
            },
            {
                id: 12,
                events: ["Ночь музыки"],
                start: "2022-08-31 15:00",
                end: "2022-08-31 16:30",
                interviews: [],
            },
            {
                id: 171,
                events: ["Ночь музыки"],
                start: "2022-08-31 12:00",
                end: "2022-08-31 13:30",
                interviews: [
                    {
                        id: 11121,
                        name: "Ольшанский Кирилл",
                        event: "Ночь музыки",
                        role: "Тимлидер",
                        phone: "+7999999999",
                        contacts: ["Telegram"],
                        start: "12:00",
                        end: "12:30",
                    },
                    {
                        id: 11122,
                        name: "Ольшанский Кирилл",
                        event: "Ночь музыки",
                        role: "Тимлидер",
                        phone: "+7999999999",
                        contacts: ["Telegram"],
                        start: "13:00",
                        end: "13:30",
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: "Иванов Иван",
        workedTimes: [
            {
                id: 32,
                events: ["Ночь музеев"],
                start: "2022-08-31 12:00",
                end: "2022-08-31 16:00",
                interviews: [
                    {
                        id: 321,
                        name: "Денежный человек",
                        event: "Ночь музеев",
                        role: "Тимлидер",
                        phone: "+7999999999",
                        contacts: ["Telegram"],
                        start: "12:30",
                        end: "13:00",
                    },
                    {
                        id: 322,
                        name: "Денежный человек",
                        event: "Ночь музеев",
                        role: "Тимлидер",
                        phone: "+7999999999",
                        contacts: ["Telegram"],
                        start: "13:30",
                        end: "14:00",
                    },
                    {
                        id: 323,
                        name: "Кирилл Ольшанский",
                        event: "Ночь музеев",
                        role: "Тимлидер",
                        phone: "+7999999999",
                        contacts: ["Telegram"],
                        start: "15:00",
                        end: "15:30",
                    },
                ],
            },
        ],
    },
    {
        id: 9,
        name: "Пустой человек",
        workedTimes: [],
    },
];

export class ServerAPI {
    private static startUrl = process.env.REACT_APP_SERVER_HOST;

    static async getEvents() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => response.data);
    }

    static async getRecruiters(start?: Date, end?: Date) {
        for (let i = 0; i < 1000000000; i++) {
            //dasdadsd;
        }
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => recruitersMock);
    }

    static async getRecruiter(id: number) {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => recruitersMock);
    }

    static async addRecruiterWorkTime(start: Date, end: Date, recruiterId: number, event: string): Promise<Recruiter> {
        const url = "http://localhost:3000/";
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
        const url = "http://localhost:3000/";
        return await axios.post(url, { recruiterId, workTimeId, start, end }).then(response => response.data);
    }

    static async removeRecruiterWorkTime(recruiterId: number, workTimeId: number): Promise<Recruiter> {
        const url = "http://localhost:3000/";
        return await axios.post(url, { recruiterId, workTimeId }).then(response => response.data);
    }

    static async getInterviewTime(eventId: number): Promise<number | ""> {
        const url = this.startUrl + `/event/${eventId}/get-interview-time`;
        return await axios.get(url).then(res => res.data);
    }

    static async changeInterviewTime(eventId: number, newInterviewTime: number): Promise<number> {
        const url = this.startUrl + `/event/${eventId}/set-interview-time`;
        return await axios.post(url, newInterviewTime).then(res => res.data);
    }

    static async getWorkTime(date: Date, eventId: number): Promise<GetWorkTimeSuccessPayload | ""> {
        const url = this.startUrl + `/event/${eventId}/get-day-worktime/${moment(date).format(DATE_FORMAT)}`;
        return await axios.get(url).then(res => res.data);
    }

    static async changeWorkTime(
        eventId: number,
        date: Date,
        newStart: number,
        newEnd: number
    ): Promise<ChangeWorkTimePayload> {
        const url = this.startUrl + `/event/${eventId}/set-day-worktime/${moment(date).format(DATE_FORMAT)}`;
        return await axios.post(url, { beginTime: newStart, endTime: newEnd }).then(res => res.data);
    }
}
