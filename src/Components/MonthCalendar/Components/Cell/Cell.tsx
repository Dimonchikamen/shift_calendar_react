import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import s from "./Cell.module.css";
import CellEvent from "../CellEvent/CellEvent";

interface ICellProps {
    events: ScheduleEvent[];
    dayDate: Date;
    selectedEvent: ScheduleEvent | null;
    disabled: boolean;
    onAddEvent: (date: Date) => void;
    onRemoveEvent: (event: ScheduleEvent, date: Date) => void;
    onEditEvent: (date: Date) => void;
    onSetSelectedEvent: (event: ScheduleEvent) => void;
}

const Cell: FC<ICellProps> = ({
    events,
    dayDate,
    selectedEvent,
    disabled,
    onAddEvent,
    onRemoveEvent,
    onEditEvent,
    onSetSelectedEvent,
}) => {
    const addEventHandler = () => {
        onAddEvent(dayDate);
    };
    const editEventHandler = () => {
        onEditEvent(dayDate);
    };

    const removeEventHandler = (event: ScheduleEvent) => {
        onRemoveEvent(event, dayDate);
    };

    return (
        <div className={s.cell}>
            <div className={s.events}>
                {events.map((e, i) => (
                    <CellEvent
                        key={`event_${e.id}_${i}`}
                        event={e}
                        selected={e.id === selectedEvent?.id}
                        onClick={onSetSelectedEvent}
                        onClickRemoveEvent={removeEventHandler}
                        onClickEditEvent={editEventHandler}
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
