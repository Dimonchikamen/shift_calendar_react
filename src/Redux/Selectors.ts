import { RootState } from "./Store";

export const getIsWidget = (state: RootState) => state.workDayState.state.isWidget;
