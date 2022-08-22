import { FC, useCallback, useMemo, useState } from "react";
import ToastCalendar from "@toast-ui/calendar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

interface IUiTableProps {
    containerIdSelector: string;
}

const cultures = ["en", "ru"];
const lang = {
    en: null,
    ru: {
        week: "Неделя",
        work_week: "Рабочая неделя",
        day: "День",
        month: "Месяц",
        previous: "Назад",
        next: "Вперёд",
        today: "Сегодня",
        agenda: "Повестка дня",
    },
};

const UiTable: FC<IUiTableProps> = ({ containerIdSelector }) => {
    const [language, setLanguage] = useState("en");
    const [rightToLeft, setRightToLeft] = useState(false);
    const localizer = momentLocalizer(moment);
    const [calendar] = useState(
        new ToastCalendar(containerIdSelector, {
            defaultView: "week",
            template: {
                milestone(e) {
                    return "<span></span>";
                },
                task(e) {
                    return "<span></span>";
                },
                allday(e) {
                    return "<span></span>";
                },
            },
        })
    );

    const cultureOnClick = useCallback(
        (value: string) => {
            setLanguage(value);
            setRightToLeft(value === "ar-AE");
        },
        [setLanguage]
    );

    const { defaultDate, messages } = useMemo(
        () => ({
            defaultDate: new Date(),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            messages: lang[language],
        }),
        [language]
    );
    return (
        <>
            <label>Select a Culture</label>{" "}
            <select
                className="form-control"
                style={{ width: 200, display: "inline-block" }}
                value={language}
                onChange={e => cultureOnClick(e.target.value)}
            >
                {cultures.map((value, i) => (
                    <option
                        key={i}
                        value={value}
                    >
                        {value}
                    </option>
                ))}
            </select>
            <Calendar
                localizer={localizer}
                defaultDate={defaultDate}
                culture={language}
                rtl={rightToLeft}
                messages={messages}
            />
        </>
    );
};

export default UiTable;
