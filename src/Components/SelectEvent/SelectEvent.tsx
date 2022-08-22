import { FC, useState } from "react";
import SelectItem from "../SelectItem/SelectItem";
import s from "./SelectEvent.module.css";

interface ISelectEventProps {
    event: string;
    options: string[];
    onChangeEvent: (event: string) => void;
}

const SelectEvent: FC<ISelectEventProps> = ({ event, options, onChangeEvent }) => {
    return (
        <div className={s.select_event_container}>
            <span>Мероприятие</span>
            <SelectItem
                className={s.select_event}
                value={event}
                options={options}
                size="small"
                onchange={e => onChangeEvent(e.target.value)}
            />
        </div>
    );
};

export default SelectEvent;
