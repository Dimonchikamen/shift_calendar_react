import { FC, useState } from "react";
import SelectItem from "../../../SelectItem/SelectItem";
import s from "./CalendarHeader.module.css";
import { FormControl, FormHelperText, MenuItem, SelectChangeEvent, Select } from "@mui/material";
import { getHour, getTimeFromHours } from "../../../../Helpers/DateTimeHelpers";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { Time } from "../../../../Types/Time";
import { changeStartDayAction } from "../../../../Redux/Actions/ChangeStartDayAction";
import { changeEndDayAction } from "../../../../Redux/Actions/ChangeEndDayAction";
import { getOptions } from "../../../../Helpers/GetOptions";
import { changeInterviewTimeAction } from "../../../../Redux/Actions/ChangeInterviewTimeAction";

const interviewTimeOptions: Time[] = ["10:00", "12:00", "15:00", "20:00", "30:00", "60:00"];
const hourOptions: Time[] = getOptions(0, 23);

const CalendarHeader: FC = () => {
    const min = getTimeFromHours(useAppSelector(state => state.main.config.dayStartFrom));
    const max = getTimeFromHours(useAppSelector(state => state.main.config.dayStopTo));
    const interviewTime = getTimeFromHours(useAppSelector(state => state.main.config.minuteStep));
    const eventOptions = useAppSelector(state => state.main.events);
    const [event, setEvent] = useState(eventOptions[0]);
    const [age, setAge] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const dispatch = useAppDispatch();

    const changeInterviewTime = (e: SelectChangeEvent) => {
        dispatch(changeInterviewTimeAction(getHour(e.target.value)));
    };

    const changeMin = (e: SelectChangeEvent) => {
        dispatch(changeStartDayAction(getHour(e.target.value)));
    };

    const changeMax = (e: SelectChangeEvent) => {
        dispatch(changeEndDayAction(getHour(e.target.value)));
    };

    return (
        <div className={s.calendar_header}>
            <div className={s.select_event_container}>
                <span className={s.select_event_label}>Мероприятие:</span>
                <SelectItem
                    className={s.select_event}
                    value={event}
                    label="Мероприятие"
                    options={eventOptions}
                    size="small"
                    onchange={e => setEvent(e.target.value)}
                />
            </div>
            <div className={s.select_work_time_container}>
                <span>Рабочее время с</span>
                <SelectItem
                    value={min}
                    label="начало рабочего дня"
                    options={hourOptions}
                    size="small"
                    optionDisableFunc={v => getHour(v) >= getHour(max)}
                    onchange={changeMin}
                />
                <span>до</span>
                <SelectItem
                    value={max}
                    label="конец рабочего дня"
                    options={hourOptions}
                    size="small"
                    optionDisableFunc={v => getHour(v) <= getHour(min)}
                    onchange={changeMax}
                />
            </div>
            <div className={s.select_interview_time_container}>
                <span>Длительность собеседования</span>
                <SelectItem
                    value={interviewTime}
                    label="Длительность собеседования"
                    options={interviewTimeOptions}
                    size="small"
                    onchange={changeInterviewTime}
                />
            </div>
        </div>
    );
};

export default CalendarHeader;
