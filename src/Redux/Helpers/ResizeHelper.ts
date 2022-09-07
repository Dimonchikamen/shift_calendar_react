import { SchedulerDataConfig } from "react-big-scheduler";

const getDiff = (min: number, max: number) => max - min + 1;

export const resize = (config: SchedulerDataConfig) => {
    const newWidth = window.innerWidth * 0.75;
    let newResourceTableWidth = config.dayResourceTableWidth;
    if (window.innerWidth < 1200) {
        newResourceTableWidth = 200;
    }
    const min = config.dayStartFrom;
    const max = config.dayStopTo;
    const minuteStep = config.minuteStep;
    const timeWidth = newWidth - newResourceTableWidth!;
    const newDayCellWidth = timeWidth / (getDiff(min!, max!) * (60 / minuteStep!));
    const newWeekCellWidth = timeWidth / 7;
    return {
        ...config,
        dayResourceTableWidth: newResourceTableWidth,
        weekResourceTableWidth: newResourceTableWidth,
        schedulerWidth: newWidth,
        dayCellWidth: newDayCellWidth,
        weekCellWidth: newWeekCellWidth,
    };
};
