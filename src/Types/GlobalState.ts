import { CalendarState } from "./CalendarState";

export type GlobalState = {
    getInformationPending: boolean;
    allEventsPending: boolean;
    changePending: boolean;
    state: CalendarState;
    error: string | null;
    changeError: string | null;
};
