import { FC, useEffect, useMemo, useState } from "react";
import s from "./InformationContainer.module.css";
import { RecruiterInfo } from "../../../../Types/RecruiterInfo";
import SelectItem from "../../../../UiKit/SelectItem/SelectItem";
import { getHour, getTime } from "../../../../Helpers/DateTimeHelpers";
import { useAppSelector } from "../../../../Redux/Hooks";
import { Button } from "@mui/material";
import { Time } from "../../../../Types/Time";
import { getOptions } from "../../../../Helpers/GetOptions";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import { createResourcesAndEvents } from "../../../../Helpers/CreateResourcesAndEvents";
import { hasOverlapTime } from "../../../../Helpers/HasOverlap";

interface IEditInformationProps {
    data: RecruiterInfo;
    eventEditing: ScheduleEvent;
    onEditEvent: (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => void;
}

const EditInformation: FC<IEditInformationProps> = ({ data, eventEditing, onEditEvent }) => {
    const recruiters = useAppSelector(state => state.workDayState.state.recruiters);
    const dayStart = useAppSelector(state => state.workDayState.state.config.dayStartFrom)!;
    const dayEnd = useAppSelector(state => state.workDayState.state.config.dayStopTo)!;
    const options: Time[] = getOptions(dayStart, dayEnd);
    const [leftTime, rightTime] = useMemo(() => data.workTimeTitle.split(" - "), [data.workTimeTitle]);
    const [workTimeStart, setDayStart] = useState<Time>(leftTime);
    const [workTimeEnd, setDayEnd] = useState<Time>(rightTime);
    const [isTimeWrong, setIsTimeWrong] = useState(false);

    useEffect(() => {
        setDayEnd(rightTime);
        setDayStart(leftTime);
    }, [leftTime, rightTime]);

    const editingEvent = (eventEditing: ScheduleEvent) => {
        const index = recruiters.findIndex(r => r.id === Number(eventEditing.resourceId));
        const currentRecruiter = recruiters[index];
        const [, events] = createResourcesAndEvents([currentRecruiter]);
        let hasOverlap = false;
        events.forEach(e => {
            if (
                e.id !== eventEditing.id &&
                hasOverlapTime(getTime(e.start), getTime(e.end), workTimeStart, workTimeEnd)
            ) {
                hasOverlap = true;
            }
        });
        if (hasOverlap || parseInt(workTimeStart) >= parseInt(workTimeEnd)) {
            setIsTimeWrong(true);
            return;
        }
        onEditEvent(eventEditing, workTimeStart, workTimeEnd);
        setIsTimeWrong(false);
    };

    return (
        <>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Рабочий промежуток времени:</span>
                <span className={s.time}>{data.workTimeTitle}</span>
            </div>
            <div className={s.select_work_time_container}>
                <div>Изменить рабочее время:</div>
                <div className={s.selector_container}>
                    <span>с</span>
                    <SelectItem
                        value={workTimeStart}
                        options={options}
                        size="small"
                        optionDisableFunc={o => getHour(o) < dayStart || getHour(o) >= getHour(workTimeEnd)}
                        onchange={e => setDayStart(e.target.value)}
                        className={s.work_time_selector}
                    />
                </div>
                <div className={s.selector_container}>
                    <span>до</span>
                    <SelectItem
                        value={workTimeEnd}
                        options={options}
                        size="small"
                        optionDisableFunc={o => getHour(o) > dayEnd || getHour(o) <= getHour(workTimeStart)}
                        onchange={e => setDayEnd(e.target.value)}
                        className={s.work_time_selector}
                    />
                </div>
                {isTimeWrong ? (
                    <>
                        <span style={{ color: "red", fontSize: "13px" }}>Введите корректное время</span>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <Button
                className={s.save_btn}
                onClick={() => editingEvent(eventEditing)}
            >
                Сохранить
            </Button>
        </>
    );
};

export default EditInformation;
