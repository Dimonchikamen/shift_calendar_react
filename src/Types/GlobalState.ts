import { CalendarState } from "./CalendarState";

export type GlobalState = {
    rolePending: boolean;
    allEventsPending: boolean;
    recruitersPending: boolean;
    workTimePending: boolean;
    interviewTimePending: boolean;
    changePending: boolean;
    state: CalendarState;
    error: string | null;
    changeError: string | null;
};
