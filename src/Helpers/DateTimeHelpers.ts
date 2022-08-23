import { FullDateTime } from "../Types/FullDateTime";
import { Time } from "../Types/Time";

export const getTime = (fullDateTime: FullDateTime) => fullDateTime.split(" ")[1];

export const getHour = (time: Time) => Number(time.split(":")[0]);

export const getHoursInAllDateTime = (fullDateTime: FullDateTime) => getTime(fullDateTime).split(":")[0];

export const getMinutesInAllDateTime = (fullDateTime: FullDateTime) => getTime(fullDateTime).split(":")[1];
