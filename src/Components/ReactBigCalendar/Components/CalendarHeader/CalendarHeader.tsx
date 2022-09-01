import { FC } from "react";
import SelectItem from "../../../../UiKit/SelectItem/SelectItem";
import s from "./CalendarHeader.module.css";
import { SelectChangeEvent } from "@mui/material";
import { getHour, getTimeFromHours } from "../../../../Helpers/DateTimeHelpers";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { Time } from "../../../../Types/Time";
import { getOptions } from "../../../../Helpers/GetOptions";
import { changeInterviewTimeRequest } from "../../../../Redux/Actions/InterviewTimActions/ChangeInterviewTimeActions";
import { changeStartDayRequest } from "../../../../Redux/Actions/WorkDayActions/ChangeStartDayActions";
import { changeEndDayRequest } from "../../../../Redux/Actions/WorkDayActions/ChangeEndDayActions";
import { changeEventRequest } from "../../../../Redux/Actions/EventsActions/ChangeEventActions";
import { changeEventAction } from "../../../../Redux/Actions/ChangeEventAction";

const interviewTimeOptions: Time[] = ["10:00", "12:00", "15:00", "20:00", "30:00", "60:00"];
const hourOptions: Time[] = getOptions(0, 23);

const CalendarHeader: FC = () => {
    const recruiters = useAppSelector(state => state.workDayState.state.recruiters);
    const min = getTimeFromHours(useAppSelector(state => state.workDayState.state.config.dayStartFrom)!);
    const max = getTimeFromHours(useAppSelector(state => state.workDayState.state.config.dayStopTo)!);
    const interviewTime = getTimeFromHours(useAppSelector(state => state.workDayState.state.config.minuteStep)!);
    const events = useAppSelector(state => state.workDayState.state.events);
    const event = useAppSelector(state => state.workDayState.state.currentEvent);

    const dispatch = useAppDispatch();

    const changeEvent = (e: SelectChangeEvent) => {
        dispatch(changeEventRequest(recruiters, e.target.value));
        // dispatch(changeEventAction(e.target.value));
        // dispatch(getRecruitersRequest(e.target.value));
    };

    const changeInterviewTime = (e: SelectChangeEvent) => {
        dispatch(changeInterviewTimeRequest(getHour(e.target.value)));
    };

    const changeMin = (e: SelectChangeEvent) => {
        dispatch(changeStartDayRequest(getHour(e.target.value)));
    };

    const changeMax = (e: SelectChangeEvent) => {
        dispatch(changeEndDayRequest(getHour(e.target.value)));
    };

    return (
        <div className={s.calendar_header}>
            <div className={s.select_event_container}>
                <span className={s.select_event_label}>Мероприятие:</span>
                <SelectItem
                    className={s.select_event}
                    value={event}
                    options={events}
                    size="small"
                    onchange={changeEvent}
                />
            </div>
            <div className={s.select_work_time_container}>
                <span>Рабочее время с</span>
                <SelectItem
                    value={min}
                    options={hourOptions}
                    size="small"
                    optionDisableFunc={v => getHour(v) >= getHour(max)}
                    onchange={changeMin}
                />
                <span>до</span>
                <SelectItem
                    value={max}
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
                    options={interviewTimeOptions}
                    size="small"
                    onchange={changeInterviewTime}
                />
            </div>
        </div>
    );
};

export default CalendarHeader;
