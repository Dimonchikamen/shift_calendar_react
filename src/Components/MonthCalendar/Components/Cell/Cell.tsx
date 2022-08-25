import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import s from "./Cell.module.css";
import CellEvent from "../CellEvent/CellEvent";

interface ICellProps {
    events: ScheduleEvent[];
    dayDate: Date;
    selectedEventId: number | null;
    disabled: boolean;
    onSetSelectedEvent: (id: number) => void;
}

const Cell: FC<ICellProps> = ({ events, dayDate, selectedEventId, disabled, onSetSelectedEvent }) => {
    const addEventHandler = () => {
        //TODO
        console.log("dwadaw");
    };

    const removeEventHandler = (id: number) => {
        //TODO
        console.log(id);
    };

    return (
        <div className={s.cell}>
            <div className={s.events}>
                {events.map((e, i) => (
                    <CellEvent
                        key={`event_${e.id}_${i}`}
                        event={e}
                        selected={e.id === selectedEventId}
                        onClick={onSetSelectedEvent}
                        onClickRemoveEvent={removeEventHandler}
                    />
                ))}
            </div>
            <div className={s.right_content}>
                <div className={`${s.day_number} ${disabled ? s.disabled : ""}`}>
                    <span>{dayDate.getDate()}</span>
                </div>
                <div className={s.add_event_button_container}>
                    <div
                        className={`${s.add_event_button} ${disabled ? s.display_none : ""}`}
                        onClick={addEventHandler}
                    >
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cell;
