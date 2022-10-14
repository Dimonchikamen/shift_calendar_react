import { Time } from "./Time";

export type Interview = {
    id: number; //Id этой записи на собеседования (или Id того, кто записался)
    name: string; // имя и фамилия, кто записался
    role: string; // на какую роль будет собеседоваться человек
    phone: string; // контактный телефон
    contacts: string[]; // список контактов (Telegram, WhatsApp, Vk и т.д.)
    start: Time; // Начало собеседования. формат H:mm. Например: 9:00 или 14:00
    end: Time; // Конец собеседования. формат как у начала
};
