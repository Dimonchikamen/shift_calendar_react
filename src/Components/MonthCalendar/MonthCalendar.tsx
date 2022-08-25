import { FC, useState } from "react";
import s from "./MonthCalendar.module.css";
import { ScheduleEvent } from "../../Types/ScheduleEvent";
import { mapWhere } from "../../Helpers/MaoWhere";
import Cell from "./Components/Cell/Cell";

const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];
const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];
const headers = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

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

interface IMonthCalendarProps {
    events: ScheduleEvent[];
}

const MonthCalendar: FC<IMonthCalendarProps> = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

    const getRow = (week: { date: Date; disabled: boolean }[]) => {
        const res: any[] = [];
        week.forEach((day, i) => {
            const dayEvents = mapWhere(events, e => {
                const startDate = new Date(e.start);
                return (
                    startDate.getDate() === day.date.getDate() &&
                    startDate.getMonth() === day.date.getMonth() &&
                    startDate.getFullYear() === day.date.getFullYear()
                );
            });
            res.push(
                <Cell
                    events={dayEvents}
                    dayDate={day.date}
                    selectedEventId={selectedEvent}
                    disabled={day.disabled}
                    onSetSelectedEvent={setSelectedEvent}
                />
            );
        });
        return res;
    };

    const getRows = (year: number, month: number) => {
        const data = getMonthData(year, month);
        return data.map(row => getRow(row));
    };

    const next = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const back = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    return (
        <div>
            <header className={s.header}>
                <span
                    className={s.icon}
                    onClick={back}
                    onCopy={() => false}
                >
                    ❮
                </span>
                <span className={s.date}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <span
                    className={s.icon}
                    onClick={next}
                    onCopy={() => false}
                >
                    ❯
                </span>
            </header>
            <div className={s.calendar_container}>
                <header className={s.calendar_header}>
                    {headers.map((h, i) => (
                        <div key={`header-${i}`}>{h}</div>
                    ))}
                </header>
                <div className={s.calendar}>
                    {getRows(currentDate.getFullYear(), currentDate.getMonth()).map(row => row)}
                </div>
            </div>
        </div>
    );
};

export default MonthCalendar;
