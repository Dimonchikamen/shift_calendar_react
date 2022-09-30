import { FC, useState, useEffect, memo } from "react";
import s from "./InformationContainer.module.css";
import { RequiterInfo } from "../../../../Types/RequiterInfo";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import Button from "@mui/material/Button";

interface IInformationContainerProps {
    data: RequiterInfo;
    role?: "admin" | "user";
    isEditing?: boolean;
    eventEditing: ScheduleEvent;
    onEditEvent: (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => void;
}

const InformationContainer: FC<IInformationContainerProps> = ({ data, role = "admin" }) => {
    const [currentInterview, setCurrentInterview] = useState(data.interviews[0]);

    useEffect(() => {
        setCurrentInterview(data.interviews[0]);
    }, [data]);

    return (
        <div className={s.requiter_info}>
            <div className={s.requiter}>
                <span className={s.font_size_18}>Рекрутёр:</span>
                <span className={s.time}>{data.name}</span>
            </div>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Время собеседования:</span>
                <span className={s.time}>{currentInterview.start + " - " + currentInterview.end}</span>
            </div>
            <Button
                className={s.save_btn}
                onClick={() => alert("ok")}
                variant="contained"
            >
                Записаться
            </Button>
        </div>
    );
};

export default memo(InformationContainer);
