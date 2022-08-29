import { FullDateTime } from "../Types/FullDateTime";
import { Time } from "../Types/Time";

export const createTitle = (start: FullDateTime, end: FullDateTime) => `${start.split(" ")[1]} - ${end.split(" ")[1]}`;

export const createTitleFromHours = (start: Time, end: Time) => `${start} - ${end}`;
