const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

export const getStartAndEndOfWeek = (currentDate: Date): [start: Date, end: Date] => {
    const day = currentDate.getDay();
    const num = WEEK_DAYS_FROM_MONDAY[day];
    return [
        new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - num),
        new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6 - num),
    ];
};
