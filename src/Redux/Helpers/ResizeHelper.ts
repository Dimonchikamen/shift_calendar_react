import { SchedulerDataConfig } from "react-big-scheduler";

const getDiff = (min: number, max: number) => max - min + 1;

export const resize = (config: SchedulerDataConfig) => {
    const a = document.querySelector("#root") as HTMLDivElement;
    let newWidth = a.clientWidth * 0.8; //config.schedulerWidth! as number;
    let newResourceTableWidth = config.dayResourceTableWidth;
    if (window.innerWidth < 1400) newWidth = a.clientWidth - 1;

    if (window.innerWidth <= 1024) {
        newResourceTableWidth = 140;
    } else {
        newResourceTableWidth = 200;
    }
    // if (window.innerWidth < 1200) {
    //     newResourceTableWidth = 200;
    // }
    const min = config.dayStartFrom;
    const max = config.dayStopTo;
    const minuteStep = config.minuteStep;
    const timeWidth = newWidth - newResourceTableWidth!;
    const newDayCellWidth = timeWidth / (getDiff(min!, max!) * (60 / minuteStep!));
    const newWeekCellWidth = (newWidth - config.weekResourceTableWidth!) / 7;
    //config.eventItemLineHeight = 45;
    return {
        ...config,
        dayResourceTableWidth: newResourceTableWidth,
        //weekResourceTableWidth: newResourceTableWidth,
        schedulerWidth: newWidth,
        dayCellWidth: newDayCellWidth,
        weekCellWidth: newWeekCellWidth,
    };
};
