import { createContext, useReducer } from "react";

const SET_DATE = "SET_DATE";
const SET_TASK = "SET_TASK";
const SAVE_TASK = "SAVE_TASK";
const DELETE_TASK = "DELETE_TASK";

export const CalendarContext = createContext({});

export const sameDay = (a: Date, b: Date) => {
    return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
};

function CalendarState(props: any) {
    const initialState = {
        date: new Date(),
        days: [],
        task: null,
    };

    // Dispatch
    const [state, dispatch] = useReducer((state: any, action: any) => {
        const date = action.payload;
        // Calendar Start Day
        const d1 = new Date(date.getFullYear(), date.getMonth(), 1);
        d1.setDate(d1.getDate() - (d1.getDay() === 0 ? 7 : d1.getDay()));
        // Calendart End Day
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (d2.getDay() !== 0) d2.setDate(d2.getDate() + (7 - d2.getDay()));
        const days = [];

        switch (action.type) {
            case SET_DATE: // Set current date
                do {
                    // Obtain tasks
                    d1.setDate(d1.getDate() + 1); // iterate
                    days.push({
                        date: new Date(d1.getTime()),
                        tasks: [],
                    });
                } while (!sameDay(d1, d2));

                return {
                    // Update state
                    ...state,
                    date: date,
                    days: days,
                };
            case SET_TASK:
                return {
                    ...state,
                    task: action.payload,
                };
            case SAVE_TASK: {
                const task = action.payload;
                return {
                    ...state,
                };
            }
            case DELETE_TASK: {
                return {
                    ...state,
                };
            }
            default:
                break;
        }
    }, initialState);

    // CRUD
    const setDate = (date: Date) => {
        dispatch({
            type: SET_DATE,
            payload: date,
        });
    };

    const setTask = (task: any) => {
        dispatch({
            type: SET_TASK,
            payload: task,
        });
    };

    const saveTask = (task: any) => {
        dispatch({
            type: SAVE_TASK,
            payload: task,
        });
    };

    const deleteTask = (taskId: any) => {
        dispatch({
            type: DELETE_TASK,
            payload: taskId,
        });
    };

    return (
        <CalendarContext.Provider
            value={{
                date: state.date,
                days: state.days,
                task: state.task,

                setDate,
                setTask,
                saveTask,
                deleteTask,
            }}
        >
            {props.children}
        </CalendarContext.Provider>
    );
}

export default CalendarState;
