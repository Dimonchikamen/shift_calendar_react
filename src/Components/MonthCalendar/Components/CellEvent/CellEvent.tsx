import { FC } from "react";
import s from "./CellEvent.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";

interface ICellEventProps {
    event: ScheduleEvent;
    selected: boolean;
    onClick: (event: ScheduleEvent) => void;
    onClickRemoveEvent: (event: ScheduleEvent) => void;
    onClickEditEvent: (event: ScheduleEvent) => void;
}

const CellEvent: FC<ICellEventProps> = ({ event, selected, onClick, onClickRemoveEvent, onClickEditEvent }) => {
    const removeHandler = () => {
        if (selected) {
            onClickRemoveEvent(event);
        }
    };

    const editHandler = () => {
        if (selected) {
            onClickEditEvent(event);
        }
    };

    const canChange = () => {
        const today = new Date().toISOString().slice(0, 10);
        return event.start.slice(0, 10) > today;
    };

    return (
        <div
            className={`${s.event} ${selected ? s.selected : ""}`}
            onClick={() => onClick(event)}
        >
            <span className={s.event_title}>{event.title}</span>
            {canChange() && (
                <>
                    <div
                        className={s.remove_event_container}
                        onClick={removeHandler}
                    >
                        {selected && <span className={`${s.cross}`}></span>}
                    </div>
                    <div
                        className={s.edit_event_container}
                        onClick={editHandler}
                    >
                        {selected && <EditIcon className={s.edit_event} />}
                    </div>
                </>
            )}
        </div>
    );
};

export default CellEvent;
