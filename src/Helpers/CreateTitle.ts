import { FullDateTime } from "../Types/FullDateTime";

export const createTitle = (start: FullDateTime, end: FullDateTime) => `${start.split(" ")[1]} - ${end.split(" ")[1]}`;
