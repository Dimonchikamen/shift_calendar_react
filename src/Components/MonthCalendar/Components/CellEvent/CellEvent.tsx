import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import s from "./CellEvent.module.css";
import vector from "../../../../Svg/Cross.svg";

interface ICellEventProps {
    event: ScheduleEvent;
    selected: boolean;
    onClick: (id: number) => void;
    onClickRemoveEvent: (id: number) => void;
}

const CellEvent: FC<ICellEventProps> = ({ event, selected, onClick, onClickRemoveEvent }) => {
    const removeHandler = () => {
        if (selected) onClickRemoveEvent(event.id);
    };

    return (
        <div
            className={`${s.event} ${selected ? s.selected : ""}`}
            onClick={() => onClick(event.id)}
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
