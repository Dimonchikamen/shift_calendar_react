import { FC } from "react";
import { SchedulerData } from "react-big-scheduler";
import SelectItem from "../../../SelectItem/SelectItem";
import s from "./CalendarHeader.module.css";
import { SelectChangeEvent } from "@mui/material";
import { getHour } from "../../../../Helpers/DateTimeHelpers";

interface ICalendarHeaderProps {
    data: SchedulerData;
    max: string;
    min: string;
    interviewTime: string;
    options: string[];
    interviewTimeOptions: string[];
    event: string;
    eventOptions: string[];
    onChangeEvent: (event: string) => void;
    onChangeMax: (max: string) => void;
    onChangeMin: (min: string) => void;
    onChangeInterviewTime: (time: string) => void;
}

const CalendarHeader: FC<ICalendarHeaderProps> = ({
    max,
    min,
    interviewTime,
    options,
    interviewTimeOptions,
    event,
    eventOptions,
    onChangeEvent,
    onChangeMin,
    onChangeMax,
    onChangeInterviewTime,
}) => {
    const changeInterviewTime = (e: SelectChangeEvent) => {
        onChangeInterviewTime?.(e.target.value);
    };

    const changeMin = (e: SelectChangeEvent) => {
        onChangeMin?.(e.target.value);
    };

    const changeMax = (e: SelectChangeEvent) => {
        onChangeMax?.(e.target.value);
    };

    return (
        <div className={s.calendar_header}>
            <div className={s.select_event_container}>
                <span className={s.select_event_label}>Мероприятие:</span>
                <SelectItem
                    className={s.select_event}
                    value={event}
                    options={eventOptions}
                    size="small"
                    onchange={e => onChangeEvent(e.target.value)}
                />
            </div>
            <div className={s.select_work_time_container}>
                <span>Рабочее время с</span>
                <SelectItem
                    value={min}
                    options={options}
                    size="small"
                    optionDisableFunc={v => getHour(v) >= getHour(max)}
                    onchange={changeMin}
                />
                <span>до</span>
                <SelectItem
                    value={max}
                    options={options}
                    size="small"
                    optionDisableFunc={v => getHour(v) <= getHour(min)}
                    onchange={changeMax}
                />
            </div>
            <div className={s.select_interview_time_container}>
                <span>Длительность собеседования</span>
                <SelectItem
                    value={interviewTime}
                    options={interviewTimeOptions}
                    size="small"
                    onchange={changeInterviewTime}
                />
            </div>
        </div>
    );
};

export default CalendarHeader;
