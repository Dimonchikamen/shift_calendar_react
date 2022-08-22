export type ScheduleEvent = {
    id: number;
    start: string;
    end: string;
    resourceId: string;
    title: string;
    resizable: boolean;
    bgColor: string;
    bookedTimes: {
        name: string;
        start: string;
        end: string;
    }[];
};
