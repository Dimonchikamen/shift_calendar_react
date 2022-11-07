import { SchedulerDataConfig } from "react-big-scheduler";

const getDiff = (min: number, max: number) => max - min + 1;

export const resize = (config: SchedulerDataConfig, resizeResourceWidth = true) => {
    const a = document.querySelector("#root") as HTMLDivElement;
    let newWidth;
    if (a.parentElement?.classList.contains("modal-interview")) {
        const modal = document.getElementById("formSignUp")!;
        if (modal.style.display === "" || modal.style.display === "none") {
            const prevDisplay = modal.style.display;
            modal.style.display = "block";
            newWidth = a.clientWidth * 0.8;
            modal.style.display = prevDisplay;
        } else {
            newWidth = a.clientWidth * 0.8;
        }
    } else {
        newWidth = a.clientWidth * 0.8; //config.schedulerWidth! as number;
        if (window.innerWidth < 1400) newWidth = a.clientWidth - 1;
    }
    // newWidth = a.clientWidth * 0.8; //config.schedulerWidth! as number;
    let newResourceTableWidth = config.dayResourceTableWidth!;
    //if (window.innerWidth < 1400) newWidth = a.clientWidth - 1;
    if (resizeResourceWidth) {
        if (window.innerWidth <= 1024) {
            newResourceTableWidth = 140;
        } else {
            newResourceTableWidth = 200;
        }
    }

    // if (window.innerWidth < 1200) {
    //     newResourceTableWidth = 200;
    // }
    const min = config.dayStartFrom;
    const max = config.dayStopTo;
    const minuteStep = config.minuteStep;
    const timeWidth = newWidth - newResourceTableWidth;
    const newDayCellWidth = timeWidth / (getDiff(min!, max!) * (60 / minuteStep!));
    const newWeekCellWidth = (newWidth - config.weekResourceTableWidth!) / 7;
    //config.eventItemLineHeight = 45;

    // const table = a.querySelector(".scheduler-view");
    // if (table?.clientHeight && config.schedulerMaxHeight && table.clientHeight === config.schedulerMaxHeight) {
    //     // newWidth = newWidth + 20;
    // }
    console.log(newResourceTableWidth);

    return {
        ...config,
        dayResourceTableWidth: newResourceTableWidth,
        weekResourceTableWidth: newResourceTableWidth,
        schedulerWidth: newWidth + 20,
        dayCellWidth: newDayCellWidth,
        weekCellWidth: newWeekCellWidth,
    };
};
