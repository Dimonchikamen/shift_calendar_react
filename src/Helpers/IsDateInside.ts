import { FullDateTime } from "../Types/FullDateTime";

export const IsDateInside = <T extends { start: FullDateTime; end: FullDateTime }>(outerDate: T, innerDate: T) => {
    const start1 = outerDate.start;
    const start2 = innerDate.start;
    const end1 = outerDate.end;
    const end2 = innerDate.end;
    return (start1 === start2 && end1 === end2) || (start1 <= start2 && end1 >= end2);
};
