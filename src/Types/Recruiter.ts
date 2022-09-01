import { FullDateTime } from "./FullDateTime";
import { Interview } from "./Interview";

export type Recruiter = {
    id: number; //Id рекрутёра
    name: string; //Имя и фамилия
    workedTimes: {
        //Отрезки времени принятия на собеседования
        id: number; //Id этого отрезка
        events: string[]; //Мероприятия, на которые проводит собеседования ["Ночь музыки", "Ночь музеев"]
        start: FullDateTime; // начало формат YYYY-MM-DD H:mm, например - 2022-09-10 10:00
        end: FullDateTime; // окончание собеседования, формат как у начала
        interviews: Interview[]; //Записи на собеседования в этот промежуток времени. Тип лежит в src/Types/Interview.ts
    }[];
};
