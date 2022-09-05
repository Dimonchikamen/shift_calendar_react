import { FullDateTime } from "../Types/FullDateTime";
import { Time } from "../Types/Time";

export const getDate = (fullDateTime: FullDateTime) => new Date(fullDateTime.slice(0, 11));

export const getTime = (fullDateTime: FullDateTime) => fullDateTime.split(" ")[1];

export const getHour = (time: Time) => Number(time.split(":")[0]);

export const getMinutes = (time: Time) => Number(time.split(":")[1]);

export const getHoursInAllDateTime = (fullDateTime: FullDateTime) => getTime(fullDateTime).split(":")[0];

export const getMinutesInAllDateTime = (fullDateTime: FullDateTime) => getTime(fullDateTime).split(":")[1];

export const getTimeFromHours = (hours: number | "") => (hours === "" ? "" : `${hours}:00`);

export const getTimeFromHoursAndMinutes = (hours: number, minutes: number) => `${hours}:${minutes}`;
