import axios from "axios";
import { Recruiter } from "../Types/Recruiter";
import moment from "moment";
import { DATE_FORMAT } from "../Components/ReactBigCalendar/ReactBigCalendar";

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
                events: ["Ночь музыки", "Ночь музеев"],
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
                        event: "Ночь музеев",
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
                events: ["Ночь музеев", "Ночь музыки"],
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
    // Получение списка всех мероприятий.
    static async getEvents() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => response.data);
    }

    // Запрос на получение рекрутёров за определённый период времени
    // Тип Recruiter лежит в src/Types/Recruiter.ts
    static async getRecruiters(start?: Date, end?: Date) {
        for (let i = 0; i < 1000000000; i++) {
            //dasdadsd;
        }
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => recruitersMock); //response.data)
    }

    // Запрос на получение одного рекрутёра по его Id
    static async getRecruiter(id: number) {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => recruitersMock); //response.data
    }

    // Запрос на добавление рабочего времени у рекрутёра
    // в ответ ожидаем id этого рабочего времени, либо всего этого рекрутёра
    static async addRecruiterWorkTime(start: Date, end: Date, recruiterId: number, event: string): Promise<Recruiter> {
        const url = "http://localhost:3000/";
        //TODO... переделать на POST
        return await axios.get(url /*, { recruiterId, start, end }*/).then(
            response =>
                ({
                    id: recruiterId,
                    name: "Попов Николай",
                    workedTimes: [
                        {
                            id: 1000001,
                            events: [event],
                            start: moment(start).format(DATE_FORMAT),
                            end: moment(end).format(DATE_FORMAT),
                            interviews: [],
                        },
                    ],
                } as unknown as Recruiter)
        ); //response.data);
    }

    // Запрос на редактирование рабочего времени у рекрутёра
    static async editRecruiterWorkTime(
        start: Date,
        end: Date,
        recruiterId: number,
        workTimeId: number
    ): Promise<Recruiter> {
        const url = "http://localhost:3000/";
        return await axios.post(url, { recruiterId, workTimeId, start, end }).then(response => response.data);
    }

    // Запрос на удаление рабочего времени у рекрутёра
    static async removeRecruiterWorkTime(recruiterId: number, workTimeId: number): Promise<Recruiter> {
        const url = "http://localhost:3000/";
        return await axios.post(url, { recruiterId, workTimeId }).then(response => response.data);
    }

    //Запрос на получение роли пользователя
    static async getRole() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => "admin"); //response.data)
    }

    // Запрос на получение начала и конца рабочих дней за определнный период
    // обратно ожидается массив объектов, внутри которых лежит начало и конец в формате H:mm,
    // например: { start: "9:00", end: "18:00" }
    // а также дата, которая указывает для какого дня актуальна эта информация
    // итого: ожидаю массив подобных объектов: { date: 2022-07-26, start: "9:00", end: "19:00" }
    static async getWorkTimeDays(start: Date, end: Date) {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(res => res.data);
    }

    // Запрос на получение начала рабочего дня (делает Админ)
    static async getDayStart() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => 9); //response.data)
    }

    // Запрос на изменение начала рабочего дня (делает Админ)
    static async changeDayStart(newStart: number) {
        const url = "http://localhost:3000/";
        //TODO.... переделать на POST
        return await axios.get(url).then(response => newStart); //response.data)
    }

    // Запрос на получение окончания рабочего дня (делает Админ)
    static async getDayEnd() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => 19); //response.data)
    }

    // Запрос на изменение окончания рабочего дня (делает Админ)
    static async changeDayEnd(newEnd: number) {
        const url = "http://localhost:3000/";
        //TODO.... переделать на POST
        return await axios.get(url).then(response => newEnd); //response.data)
    }

    // Запрос на получение длительности собеседования (делает Админ)
    static async getInterviewTime() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => 30); //response.data)
    }

    // Запрос на изменение длительности собеседования (делает Админ)
    static async changeInterviewTime(newInterviewTime: number) {
        const url = "http://localhost:3000/";
        //TODO.... переделать на POST
        return await axios.get(url).then(response => newInterviewTime); //response.data)
    }
}
