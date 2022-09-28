import { FC, useEffect, useMemo, useState } from "react";
import Cell from "./Components/Cell/Cell";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import MonthCalendarPresentation from "./MonthCalendarPresentation";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import AddWorkTimePopup from "../../UiKit/Popup/AddWorkTimePopup/AddWorkTimePopup";
import RemoveWorkTimePopup from "../../UiKit/Popup/RemoveWorkTimePopup/RemoveWorkTimePopup";
import {
    addRecruiterWorkTimeRequest,
    editRecruiterWorkTimeRequest,
    removeRecruiterWorkTimeRequest,
} from "../../Redux/Actions/RecruitersActions/RecruiterWorkTimesActions";
import { CircularProgress } from "@mui/material";
import PopupError from "../../UiKit/Popup/ErrorPopup/ErrorPopup";
import { closeErrorWindowAction } from "../../Redux/Actions/CloseErrorWindowAction";
import WaitPopup from "../../UiKit/Popup/WaitPopup/WaitPopup";
import { getRecruiterWorkTimesRequest } from "../../Redux/Actions/RecruitersActions/GetRecruitersActions";
import EditWorkTimePopup from "../../UiKit/Popup/EditWorkTimePopup/EditWorkTimePopup";
import { createEventsFromWorkTimes } from "../../Helpers/CreateEventsFromWorkTimes";
import { findLastInterval } from "../../Helpers/FindLastInterval";
import { getTime, getTimeFromHours } from "../../Helpers/DateTimeHelpers";
import { hasOverlapTime } from "../../Helpers/HasOverlap";
import { DATE_FORMAT } from "../../Const";
import moment from "moment";

const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

const isLeapYear = (year: number) => !(year % 4 || (!(year % 100) && year % 400));

const getDaysInMonth = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = DAYS_IN_MONTH[month];

    if (isLeapYear(year) && month === 1) {
        return daysInMonth + 1;
    } else {
        return daysInMonth;
    }
};

const getDayOfWeek = (date: Date) => WEEK_DAYS_FROM_MONDAY[date.getDay()];

const getMonthData = (year: number, month: number) => {
    const result: { date: Date; disabled: boolean }[][] = [];
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let row = 0; row < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; row++) {
        result[row] = [];

        for (let column = 0; column < DAYS_IN_WEEK; column++) {
            if (row === 0) {
                if (column < monthStartsOn) {
                    result[row][column] = { date: new Date(year, month, 1 - (monthStartsOn - column)), disabled: true };
                } else {
                    const current = new Date(year, month, day);
                    result[row][column] = {
                        date: new Date(year, month, day++),
                        disabled: current <= new Date(),
                    };
                }
            } else {
                const current = new Date(year, month, day++);
                result[row][column] = {
                    date: current,
                    disabled: current.getMonth() !== date.getMonth() || current <= new Date(),
                };
            }
        }
    }

    return result;
};

const MonthCalendar: FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [popupIsOpen, setPopupOpen] = useState<boolean>(false);
    const [removeEventPopupIsOpen, setRemoveEventPopupOpen] = useState<boolean>(false);
    const [editPopupIsOpen, setEditPopupOpen] = useState<boolean>(false);
    const [dateForAddWorkTime, setDateForAddWorkTime] = useState<Date>(currentDate);
    const [lastInterval, setLastInterval] = useState({ start: "0:00", end: "23:00" });

    const { recruitersPending, changePending, workTimes, error, changeError } = useAppSelector(
        state => state.workDayState
    );
    const events = useMemo(() => createEventsFromWorkTimes(workTimes), [workTimes]);
    const data = useMemo(() => getMonthData(currentDate.getFullYear(), currentDate.getMonth()), [currentDate]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRecruiterWorkTimesRequest(currentDate.getFullYear(), currentDate.getMonth()));
    }, []);

    const next = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(newDate);
        dispatch(getRecruiterWorkTimesRequest(newDate.getFullYear(), newDate.getMonth()));
    };

    const back = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(newDate);
        dispatch(getRecruiterWorkTimesRequest(newDate.getFullYear(), newDate.getMonth()));
    };

    const addEventClickHandler = (date: Date) => {
        setDateForAddWorkTime(date);
        setLastInterval(findLastInterval(events, date));
        setPopupOpen(true);
    };
    const editEventClickHandler = (date: Date) => {
        setDateForAddWorkTime(date);
        setEditPopupOpen(true);
    };

    const removeEventClickHandler = () => {
        if (selectedEvent) {
            setRemoveEventPopupOpen(true);
        }
    };

    const add = (startHours: number, endHours: number) => {
        const eventStart = new Date(
            dateForAddWorkTime.getFullYear(),
            dateForAddWorkTime.getMonth(),
            dateForAddWorkTime.getDate(),
            startHours
        );
        const eventEnd = new Date(
            dateForAddWorkTime.getFullYear(),
            dateForAddWorkTime.getMonth(),
            dateForAddWorkTime.getDate(),
            endHours
        );
        let hasOverlap = false;
        let overlappedStart;
        let overlappedEnd;
        events.forEach(e => {
            if (
                e.start.split(" ")[0] === moment(dateForAddWorkTime).format(DATE_FORMAT) &&
                hasOverlapTime(
                    getTime(e.start),
                    getTime(e.end),
                    getTimeFromHours(startHours),
                    getTimeFromHours(endHours)
                )
            ) {
                hasOverlap = true;
                overlappedStart = getTime(e.start);
                overlappedEnd = getTime(e.end);
            }
        });
        if (!hasOverlap) {
            dispatch(addRecruiterWorkTimeRequest(eventStart, eventEnd));
            setPopupOpen(false);
        } else {
            alert("Пересечение со сменой: [" + overlappedStart + " - " + overlappedEnd + "]");
        }
    };

    const remove = () => {
        dispatch(removeRecruiterWorkTimeRequest(selectedEvent!.id));
        setRemoveEventPopupOpen(false);
        setSelectedEvent(null);
    };

    const edit = (startHours: number, endHours: number) => {
        const eventStart = new Date(
            dateForAddWorkTime.getFullYear(),
            dateForAddWorkTime.getMonth(),
            dateForAddWorkTime.getDate(),
            startHours
        );
        const eventEnd = new Date(
            dateForAddWorkTime.getFullYear(),
            dateForAddWorkTime.getMonth(),
            dateForAddWorkTime.getDate(),
            endHours
        );
        dispatch(editRecruiterWorkTimeRequest(eventStart, eventEnd, selectedEvent!.id));
        setEditPopupOpen(false);
    };

    if (recruitersPending) {
        return <CircularProgress />;
    } else
        return (
            <>
                <MonthCalendarPresentation
                    currentDate={currentDate}
                    onClickPreviousMonth={back}
                    onClickNextMonth={next}
                >
                    {data.map(week => {
                        return week.map(day => {
                            const dayEvents = events.filter(e => {
                                const startDate = new Date(e.start);
                                return (
                                    startDate.getDate() === day.date.getDate() &&
                                    startDate.getMonth() === day.date.getMonth() &&
                                    startDate.getFullYear() === day.date.getFullYear()
                                );
                            });
                            return (
                                <Cell
                                    key={`${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}`}
                                    events={dayEvents}
                                    dayDate={day.date}
                                    selectedEvent={selectedEvent}
                                    disabled={day.disabled}
                                    onAddEvent={addEventClickHandler}
                                    onRemoveEvent={removeEventClickHandler}
                                    onEditEvent={editEventClickHandler}
                                    onSetSelectedEvent={setSelectedEvent}
                                />
                            );
                        });
                    })}
                </MonthCalendarPresentation>
                <WaitPopup isOpen={changePending} />
                <PopupError
                    title="Что-то пошло не так..."
                    isOpen={Boolean(changeError)}
                    errorCode={error}
                    onCancel={() => dispatch(closeErrorWindowAction())}
                />
                <AddWorkTimePopup
                    title="Добавление смены"
                    isOpen={popupIsOpen}
                    lastInterval={lastInterval}
                    onSubmit={add}
                    onCancel={() => setPopupOpen(false)}
                />
                <RemoveWorkTimePopup
                    title="Удаление смены"
                    isOpen={removeEventPopupIsOpen}
                    onSubmit={remove}
                    onCancel={() => setRemoveEventPopupOpen(false)}
                />
                <EditWorkTimePopup
                    title="Редактирование смены"
                    isOpen={editPopupIsOpen}
                    selectedEvent={selectedEvent}
                    onSubmit={edit}
                    onCancel={() => setEditPopupOpen(false)}
                />
            </>
        );
};

export default MonthCalendar;
