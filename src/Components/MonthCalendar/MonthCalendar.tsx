import { FC, useMemo, useState } from "react";
import Cell from "./Components/Cell/Cell";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { createResourcesAndEvents } from "../../Helpers/CreateResourcesAndEvents";
import MonthCalendarPresentation from "./MonthCalendarPresentation";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import AddWorkTimePopup from "./Components/Popup/AddWorkTimePopup/AddWorkTimePopup";
import { createTitle } from "../../Helpers/CreateTitle";
import moment from "moment";
import { DATE_FORMAT } from "../ReactBigCalendar/ReactBigCalendar";
import { addRecruiterEventAction, removeRecruiterEventAction } from "../../Redux/Actions/RecruiterEventsActions";
import RemoveWorkTimePopup from "./Components/Popup/RemoveWorkTimePopup/RemoveWorkTimePopup";

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
                    result[row][column] = { date: new Date(year, month, day++), disabled: false };
                }
            } else {
                const current = new Date(year, month, day++);
                result[row][column] = { date: current, disabled: current.getMonth() !== date.getMonth() };
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
    const [dateForAddWorkTime, setDateForAddWorkTime] = useState<Date>(currentDate);

    const recruiters = useAppSelector(state => state.main.recruiters);
    const data = useMemo(() => getMonthData(currentDate.getFullYear(), currentDate.getMonth()), [currentDate]);
    const [, events] = useMemo(() => createResourcesAndEvents(recruiters), [recruiters]);
    const dispatch = useAppDispatch();

    const next = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const back = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const addEventClickHandler = (date: Date) => {
        setDateForAddWorkTime(date);
        setPopupOpen(true);
    };

    const removeEventClickHandler = () => {
        if (selectedEvent) {
            setRemoveEventPopupOpen(true);
        }
    };

    const add = (startHours: number, endHours: number) => {
        const eventStart = moment(
            new Date(
                dateForAddWorkTime.getFullYear(),
                dateForAddWorkTime.getMonth(),
                dateForAddWorkTime.getDate(),
                startHours
            )
        ).format(DATE_FORMAT);
        const eventEnd = moment(
            new Date(
                dateForAddWorkTime.getFullYear(),
                dateForAddWorkTime.getMonth(),
                dateForAddWorkTime.getDate(),
                endHours
            )
        ).format(DATE_FORMAT);
        const res: ScheduleEvent = {
            id: Math.floor(Math.random() * 1000),
            start: eventStart,
            end: eventEnd,
            resourceId: "3",
            title: createTitle(eventStart, eventEnd),
            resizable: false,
            bgColor: "#D9EDF7",
            interviews: [],
        };
        dispatch(addRecruiterEventAction(res));
        setPopupOpen(false);
        //TODO...
    };

    const remove = () => {
        dispatch(removeRecruiterEventAction(selectedEvent!));
        setRemoveEventPopupOpen(false);
        setSelectedEvent(null);
        //TODO...
    };

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
                                onSetSelectedEvent={setSelectedEvent}
                            />
                        );
                    });
                })}
            </MonthCalendarPresentation>
            <AddWorkTimePopup
                title="Добавление смены"
                isOpen={popupIsOpen}
                onSubmit={add}
                onCancel={() => setPopupOpen(false)}
            />
            <RemoveWorkTimePopup
                title="Удаление смены"
                isOpen={removeEventPopupIsOpen}
                onSubmit={remove}
                onCancel={() => setRemoveEventPopupOpen(false)}
            />
        </>
    );
};

export default MonthCalendar;
