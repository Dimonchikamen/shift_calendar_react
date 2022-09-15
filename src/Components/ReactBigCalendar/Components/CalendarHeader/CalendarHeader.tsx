import { FC, memo } from "react";
import SelectItem from "../../../../UiKit/SelectItem/SelectItem";
import s from "./CalendarHeader.module.css";
import { SelectChangeEvent } from "@mui/material";
import { getHour, getTimeFromHours } from "../../../../Helpers/DateTimeHelpers";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { Time } from "../../../../Types/Time";
import { getOptions } from "../../../../Helpers/GetOptions";
import { changeInterviewTimeRequest } from "../../../../Redux/Actions/InterviewTimeActions/ChangeInterviewTimeActions";
import { changeEventRequest } from "../../../../Redux/Actions/EventsActions/ChangeEventActions";
import { changeWorkTimeRequest } from "../../../../Redux/Actions/WorkTimeActions/WorkDayActions";
import { changeDayStart } from "../../../../Redux/Actions/WorkTimeActions/ChangeDayStartAction";
import { changeDayEnd } from "../../../../Redux/Actions/WorkTimeActions/ChangeDayEndAction";

const interviewTimeOptions: Time[] = ["15:00", "30:00", "45:00", "60:00"];
const hourOptions: Time[] = getOptions(0, 23);

interface ICalendarHeader {
    currentDate: Date;
}

const CalendarHeader: FC<ICalendarHeader> = ({ currentDate }) => {
    const recruiters = useAppSelector(state => state.workDayState.state.recruiters);
    const min = getTimeFromHours(useAppSelector(state => state.workDayState.state.currentDayStart));
    const max = getTimeFromHours(useAppSelector(state => state.workDayState.state.currentDayEnd));
    const interviewTime = getTimeFromHours(useAppSelector(state => state.workDayState.state.currentInterviewTime));
    const events = useAppSelector(state => state.workDayState.state.events);
    const event = useAppSelector(state => state.workDayState.state.currentEvent);
    const role = useAppSelector(state => state.workDayState.state.role);
    const dispatch = useAppDispatch();

    const changeEvent = (e: SelectChangeEvent) => {
        dispatch(changeEventRequest(recruiters, e.target.value));
    };

    const changeInterviewTime = (e: SelectChangeEvent) => {
        dispatch(changeInterviewTimeRequest(1, getHour(e.target.value)));
    };

    const changeMin = (e: SelectChangeEvent) => {
        if (max === "") {
            dispatch(changeDayStart(getHour(e.target.value)));
        } else {
            dispatch(changeWorkTimeRequest(1, currentDate, getHour(e.target.value), getHour(max)));
        }
    };

    const changeMax = (e: SelectChangeEvent) => {
        if (min === "") {
            dispatch(changeDayEnd(getHour(e.target.value)));
        } else {
            dispatch(changeWorkTimeRequest(1, currentDate, getHour(min), getHour(e.target.value)));
        }
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
            {role === "admin" || role === "coord" ? (
                <div className={s.admin_container}>
                    <div className={s.select_work_time_container}>
                        <span>Рабочее время</span>
                        <span>c</span>
                        <SelectItem
                            value={min}
                            options={hourOptions}
                            size="small"
                            optionDisableFunc={v => getHour(v) >= getHour(max) && max !== ""}
                            onchange={changeMin}
                        />
                        <span>до</span>
                        <SelectItem
                            value={max}
                            options={hourOptions}
                            size="small"
                            optionDisableFunc={v => getHour(v) <= getHour(min) && min !== ""}
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
            ) : (
                <></>
            )}
        </div>
    );
};

export default memo(CalendarHeader);
