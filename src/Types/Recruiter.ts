import { FullDateTime } from "./FullDateTime";
import { Interview } from "./Interview";

export type Recruiter = {
    id: number; //Id рекрутёра
    name: string; //Имя и фамилия
    freeWorkedTimes: {
        id: number;
        start: FullDateTime;
        end: FullDateTime;
    }[];
    workedTimes: {
        //Отрезки времени принятия на собеседования
        id: number; //Id этого отрезка
        eventId: number; //Мероприятие, на которые проводит собеседования. 1234
        start: FullDateTime; // начало формат YYYY-MM-DD H:mm, например - 2022-09-10 10:00
        end: FullDateTime; // окончание собеседования, формат как у начала
        interviews: Interview[]; //Записи на собеседования в этот промежуток времени. Тип лежит в src/Types/Interview.ts
    }[];
};
