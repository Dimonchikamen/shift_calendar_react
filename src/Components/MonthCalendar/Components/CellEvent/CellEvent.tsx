import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import s from "./CellEvent.module.css";
import vector from "../../../../Svg/Cross.svg";

interface ICellEventProps {
    event: ScheduleEvent;
    selected: boolean;
    onClick: (event: ScheduleEvent) => void;
    onClickRemoveEvent: (event: ScheduleEvent) => void;
}

const CellEvent: FC<ICellEventProps> = ({ event, selected, onClick, onClickRemoveEvent }) => {
    const removeHandler = () => {
        if (selected) onClickRemoveEvent(event);
    };

    return (
        <div
            className={`${s.event} ${selected ? s.selected : ""}`}
            onClick={() => onClick(event)}
        >
            <span className={s.event_title}>{event.title}</span>
            <div
                className={s.remove_event_container}
                onClick={removeHandler}
            >
                {selected && (
                    <img
                        className={s.remove_event}
                        src={vector}
                        alt="delete"
                    />
                )}
            </div>
        </div>
    );
};

export default CellEvent;
