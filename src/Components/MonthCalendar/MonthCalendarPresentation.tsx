import { FC, ReactNode } from "react";
import s from "./MonthCalendar.module.css";

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

interface IMonthCalendarPresentationProps {
    children?: ReactNode[];
    currentDate: Date;
    onClickPreviousMonth: () => void;
    onClickNextMonth: () => void;
}

const MonthCalendarPresentation: FC<IMonthCalendarPresentationProps> = ({
    children,
    currentDate,
    onClickPreviousMonth,
    onClickNextMonth,
}) => {
    return (
        <div>
            <header className={s.header}>
                <span
                    className={s.icon}
                    onClick={onClickPreviousMonth}
                    onCopy={() => false}
                >
                    ❮
                </span>
                <span className={s.date}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <span
                    className={s.icon}
                    onClick={onClickNextMonth}
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
                <div className={s.calendar}>{children}</div>
            </div>
        </div>
    );
};

export default MonthCalendarPresentation;
