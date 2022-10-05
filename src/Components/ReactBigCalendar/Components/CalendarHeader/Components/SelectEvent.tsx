import { FC, useCallback, useMemo } from "react";
import { Event } from "../../../../../Types/Event";
import s from "./SelectEvent.module.css";
import SelectItem from "../../../../../UiKit/SelectItem/SelectItem";
import { SelectChangeEvent } from "@mui/material";

interface ISelectEventProps {
    value: Event;
    options: Event[];
    onChange: (newEvent: Event) => void;
}

const SelectEvent: FC<ISelectEventProps> = ({ value, options, onChange }) => {
    const events = useMemo(() => options.map(o => o.title), [options]);
    const changeHandler = useCallback(
        (e: SelectChangeEvent) => {
            const index = options.findIndex(o => o.title === e.target.value);
            onChange(options[index]);
        },
        [options]
    );

    return (
        <div className={s.select_event_container}>
            <span className={s.select_event_label}>Мероприятие:</span>
            <SelectItem
                className={s.select_event}
                value={value.title}
                options={events}
                size="small"
                onchange={changeHandler}
            />
        </div>
    );
};

export default SelectEvent;
