import { FC, memo } from "react";
import SelectItem from "../../../../UiKit/SelectItem/SelectItem";
import s from "./CalendarHeader.module.css";
import { SelectChangeEvent } from "@mui/material";
import { getHour, getTimeFromHours } from "../../../../Helpers/DateTimeHelpers";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { Time } from "../../../../Types/Time";
import { Event } from "../../../../Types/Event";
import { getOptions } from "../../../../Helpers/GetOptions";
import { changeInterviewTimeRequest } from "../../../../Redux/Actions/InterviewTimeActions/ChangeInterviewTimeActions";
import { changeWorkTimeRequest } from "../../../../Redux/Actions/WorkTimeActions/WorkDayActions";
import { changeEventAction } from "../../../../Redux/Actions/ChangeEventAction";
import SelectEvent from "./Components/SelectEvent";

const interviewTimeOptions: Time[] = ["15:00", "30:00", "45:00", "60:00"];
const hourOptions: Time[] = getOptions(0, 23);

interface ICalendarHeader {
    currentDate: Date;
}

const CalendarHeader: FC<ICalendarHeader> = ({ currentDate }) => {
    const state = useAppSelector(state => state.workDayState.state)!;
    const currentInformation = state.currentInformation;
    const min = currentInformation?.start ?? getHour(getTimeFromHours(state.currentDayStart));
    const max = currentInformation?.end ?? getHour(getTimeFromHours(state.currentDayEnd));
    const interviewDuration = getTimeFromHours(
        useAppSelector(state => state.workDayState.state.currentInterviewDuration)
    );
    const events = useAppSelector(state => state.workDayState.state.events);
    const event = useAppSelector(state => state.workDayState.state.currentEvent);
    const role = useAppSelector(state => state.workDayState.state.role);
    const dispatch = useAppDispatch();

    const changeEvent = (newEvent: Event) => {
        dispatch(changeEventAction(newEvent));
    };

    const changeInterviewTime = (e: SelectChangeEvent) => {
        dispatch(changeInterviewTimeRequest(1, getHour(e.target.value)));
    };

    const changeMin = (e: SelectChangeEvent) => {
        // if (max === "") {
        //     dispatch(changeDayStart(getHour(e.target.value)));
        // } else {
        dispatch(
            changeWorkTimeRequest(
                1,
                currentDate,
                getHour(e.target.value),
                max
                //getHour(max)
            )
        );
        //}
    };

    const changeMax = (e: SelectChangeEvent) => {
        // if (min === "") {
        //     dispatch(changeDayEnd(getHour(e.target.value)));
        // } else {
        dispatch(
            changeWorkTimeRequest(
                1,
                currentDate,
                min,
                //getHour(min),
                getHour(e.target.value)
            )
        );
        //}
    };

    return (
        <div className={s.calendar_header}>
            <SelectEvent
                value={event}
                options={events}
                onChange={changeEvent}
            />
            {(role === "admin" || role === "coord") && (
                <div className={s.admin_container}>
                    <div className={s.select_work_time_container}>
                        <span>Рабочее время</span>
                        <span>c</span>
                        <SelectItem
                            value={getTimeFromHours(min)}
                            options={hourOptions}
                            size="small"
                            optionDisableFunc={v => getHour(v) >= max} //getHour(max) && max !== ""}
                            onchange={changeMin}
                        />
                        <span>до</span>
                        <SelectItem
                            value={getTimeFromHours(max)}
                            options={hourOptions}
                            size="small"
                            optionDisableFunc={v => getHour(v) <= min} //getHour(min) && min !== ""}
                            onchange={changeMax}
                        />
                    </div>
                    <div className={s.select_interview_time_container}>
                        <span>Длительность собеседования</span>
                        <SelectItem
                            value={interviewDuration}
                            options={interviewTimeOptions}
                            size="small"
                            onchange={changeInterviewTime}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(CalendarHeader);
