import { FullDateTime } from "../Types/FullDateTime";
import { Time } from "../Types/Time";

export const getTime = (fullDateTime: FullDateTime) => fullDateTime.split(" ")[1];

export const getHour = (time: Time) => Number(time.split(":")[0]);
export const getMinutes = (time: Time) => Number(time.split(":")[1]);

export const getTimeFromHours = (hours: number | "") => (hours === "" ? "" : `${hours}:00`);
