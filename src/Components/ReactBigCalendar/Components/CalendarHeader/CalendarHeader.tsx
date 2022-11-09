import { FC, memo } from "react";
import SelectItem from "../../../../UiKit/SelectItem/SelectItem";
import s from "./CalendarHeader.module.css";
import { SelectChangeEvent } from "@mui/material";
import { getHour, getTimeFromHours } from "../../../../Helpers/DateTimeHelpers";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { Time } from "../../../../Types/Time";
import { Event } from "../../../../Types/Event";
import { ViewTypes } from "react-big-scheduler";
import { getOptions } from "../../../../Helpers/GetOptions";
import { changeInterviewTimeRequest } from "../../../../Redux/Actions/InterviewTimeActions/ChangeInterviewTimeActions";
import { changeWorkTimeRequest } from "../../../../Redux/Actions/WorkTimeActions/WorkDayActions";
import { changeEventAction } from "../../../../Redux/Actions/ChangeEventAction";
import SelectEvent from "./Components/SelectEvent/SelectEvent";
import ToggleViewButtons from "./Components/ToggleViewButtons/ToggleViewButtons";
import { ViewType } from "../../../../Types/ViewType";
import { ViewTypeWorktime } from "../../../../Types/ViewTypeWorktime";
import { changeViewTypeAction } from "../../../../Redux/Actions/ChangeViewTypeAction";

const interviewTimeOptions: Time[] = ["15:00", "30:00", "60:00"];
const hourOptions: Time[] = getOptions(0, 23);

interface ICalendarHeader {
    currentDate: Date;
    onChangeEvent: () => void;
    onChangeView: (view: ViewTypeWorktime) => void;
}

const CalendarHeader: FC<ICalendarHeader> = ({ currentDate, onChangeEvent, onChangeView }) => {
    const state = useAppSelector(state => state.workDayState.state);
    const viewType = state.viewType;
    const currentEvent = useAppSelector(state => state.workDayState.state.currentEvent);
    const currentInformation = state.currentInformation;
    const min = currentInformation?.start ?? 9;
    const max = currentInformation?.end ?? 19;
    const interviewDuration = getTimeFromHours(
        useAppSelector(state => state.workDayState.state.currentInterviewDuration)
    );
    const events = useAppSelector(state => state.workDayState.state.events);
    const event = useAppSelector(state => state.workDayState.state.currentEvent);
    const role = useAppSelector(state => state.workDayState.state.role);
    const view = useAppSelector(state => state.workDayState.state.view);
    const calendarViewType = useAppSelector(state => state.workDayState.state.calendarViewType);
    const dispatch = useAppDispatch();

    const changeViewType = (viewType: ViewType) => {
        dispatch(changeViewTypeAction(viewType));
    };

    const changeEvent = (newEvent: Event) => {
        onChangeEvent();
        dispatch(changeEventAction(newEvent));
    };

    const changeInterviewTime = (e: SelectChangeEvent) => {
        dispatch(changeInterviewTimeRequest(currentEvent.id, getHour(e.target.value), currentDate));
    };

    const changeMin = (e: SelectChangeEvent) => {
        dispatch(changeWorkTimeRequest(currentEvent.id, currentDate, getHour(e.target.value), max));
    };

    const changeMax = (e: SelectChangeEvent) => {
        dispatch(changeWorkTimeRequest(currentEvent.id, currentDate, min, getHour(e.target.value)));
    };

    if (state.isWidget) {
        return <></>;
    } else
        return (
            <>
                {(role === "admin" || role === "coord" || role === "recruiter") && (
                    <div className={s.toggles}>
                        {role !== "recruiter" && (
                            <div className={s.change_view_container}>
                                <ToggleViewButtons
                                    viewType={viewType}
                                    onChangeView={changeViewType}
                                    onChangeViewWorktime={onChangeView}
                                />
                            </div>
                        )}

                        <div className={s.change_view_container}>
                            <ToggleViewButtons
                                view={view}
                                onChangeView={changeViewType}
                                onChangeViewWorktime={onChangeView}
                            />
                        </div>
                    </div>
                )}
                <div className={s.calendar_header}>
                    {(role === "admin" || role === "coord") && (
                        <SelectEvent
                            value={event}
                            options={events}
                            onChange={changeEvent}
                        />
                    )}
                    {(role === "admin" || role === "coord") && currentEvent.id !== -1 && viewType === "edit" && (
                        <div className={s.admin_container}>
                            {calendarViewType === ViewTypes.Day && (
                                <div className={s.select_work_time_container}>
                                    <span>Рабочее время</span>
                                    <span>c</span>
                                    <SelectItem
                                        value={getTimeFromHours(min)}
                                        options={hourOptions}
                                        size="small"
                                        optionDisableFunc={v => getHour(v) >= max}
                                        onchange={changeMin}
                                    />
                                    <span>до</span>
                                    <SelectItem
                                        value={getTimeFromHours(max)}
                                        options={hourOptions}
                                        size="small"
                                        optionDisableFunc={v => getHour(v) <= min}
                                        onchange={changeMax}
                                    />
                                </div>
                            )}
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
            </>
        );
};

export default memo(CalendarHeader);
