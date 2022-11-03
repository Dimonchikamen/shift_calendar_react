import { CSSProperties, FC } from "react";
import { SchedulerData, ViewTypes } from "react-big-scheduler";
import s from "./CellHeaderTemplate.module.css";

const getWeekDay = (dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    switch (dayNumber) {
        case 0:
            return "воскресенье";
        case 1:
            return "понедельник";
        case 2:
            return "вторник";
        case 3:
            return "среда";
        case 4:
            return "четверг";
        case 5:
            return "пятница";
        case 6:
            return "суббота";
    }
};

const getMonth = (monthNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11) => {
    switch (monthNumber) {
        case 0:
            return "января";
        case 1:
            return "февраля";
        case 2:
            return "марта";
        case 3:
            return "апреля";
        case 4:
            return "мая";
        case 5:
            return "июня";
        case 6:
            return "июля";
        case 7:
            return "августа";
        case 8:
            return "сентября";
        case 9:
            return "октября";
        case 10:
            return "ноября";
        case 11:
            return "декабря";
    }
};

interface ICellHeaderTemplate {
    schedulerData: SchedulerData;
    item: any;
    formattedDateItems: any[];
    style: CSSProperties;
}

const CellHeaderTemplate: FC<ICellHeaderTemplate> = ({ schedulerData, item, formattedDateItems, style }) => {
    const date = new Date(item.time);
    const day = getWeekDay(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6);
    const month = getMonth(date.getMonth() as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11);

    if (schedulerData.viewType === ViewTypes.Week) {
        return (
            <th
                key={item.time}
                className={`header3-text`}
                style={style}
            >
                <div
                    className={s.header_text}
                    dangerouslySetInnerHTML={{
                        __html: `<span>${day}</span> <span>${date.getDate()} ${month}</span>`,
                    }}
                />
            </th>
        );
    }

    return (
        <th
            key={item.time}
            className={`header3-text`}
            style={style}
        >
            <div
                className={s.header_text}
                dangerouslySetInnerHTML={{
                    __html: `${formattedDateItems[0]}`,
                }}
            />
        </th>
    );
};

export default CellHeaderTemplate;
