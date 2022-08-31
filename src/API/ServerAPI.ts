import axios from "axios";

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
    static async getEvents() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => response.data);
    }

    static async changeEvent(event: string) {
        const url = "http://localhost:3000/";
        //TODO... поменять на POST
        return await axios.get(url).then(response => event);
    }

    static async getRecruiters(event: string) {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => {
            if (event === "Все мероприятия") {
                return recruitersMock;
            } else {
                const res: any = [];
                recruitersMock.forEach(recruiter => {
                    const res1: any[] = [];
                    recruiter.workedTimes.forEach(time => {
                        time.events.forEach(e => {
                            if (e.toLowerCase() === event.toLowerCase()) {
                                res1.push(time);
                            }
                        });
                    });
                    if (res1.length !== 0) {
                        const copy = { ...recruiter, workedTimes: res1 };
                        res.push(copy);
                    }
                });
                return res;
            }
        }); //response.data)
    }

    // static async changeRecruiters() {
    //     const url = 'https://api.github.com/users/letow/repos'
    //     return await axios.post(url).then(response => response.data)
    // }

    static async getRole() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => "admin"); //response.data)
    }

    // static async changeRole() {
    //     const url = 'https://api.github.com/users/letow/repos'
    //     return await axios.post(url).then(response => response.data)
    // }

    static async getDayStart() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => 9); //response.data)
    }

    static async changeDayStart(newStart: number) {
        const url = "http://localhost:3000/";
        //TODO.... переделать на POST
        return await axios.get(url).then(response => newStart); //response.data)
    }

    static async getDayEnd() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => 19); //response.data)
    }

    static async changeDayEnd(newEnd: number) {
        const url = "http://localhost:3000/";
        //TODO.... переделать на POST
        return await axios.get(url).then(response => newEnd); //response.data)
    }

    static async getInterviewTime() {
        const url = "http://localhost:3000/";
        return await axios.get(url).then(response => 30); //response.data)
    }

    static async changeInterviewTime(newInterviewTime: number) {
        const url = "http://localhost:3000/";
        //TODO.... переделать на POST
        return await axios.get(url).then(response => newInterviewTime); //response.data)
    }
}
