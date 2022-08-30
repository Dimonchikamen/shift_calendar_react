import { FC, useMemo, useState, useEffect } from "react";
import s from "./InformationContainer.module.css";
import { RequiterInfo } from "../../../../Types/RequiterInfo";
import { createTitleFromHours } from "../../../../Helpers/CreateTitle";
import { Interview } from "../../../../Types/Interview";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import Button from "antd/lib/button";
import SelectItem from "../../../../UiKit/SelectItem/SelectItem";
import { Time } from "../../../../Types/Time";
import { useAppSelector } from "../../../../Redux/Hooks";
import { getOptions } from "../../../../Helpers/GetOptions";
import { getHour } from "../../../../Helpers/DateTimeHelpers";
import { createResourcesAndEvents } from "../../../../Helpers/CreateResourcesAndEvents";
import { hasOverlapDate } from "../../../../Helpers/HasOverlap";

const mergeInterviewsInfo = (interviews: Interview[]) => {
    const res: { id: number; name: string; bookedTimes: string[] }[] = [];
    interviews.forEach(interview => {
        const index = res.findIndex(r => r.name === interview.name);
        const bookedTime = createTitleFromHours(interview.start, interview.end);
        if (index !== -1) {
            res[index].bookedTimes.push(bookedTime);
        } else {
            res.push({ id: interview.id, name: interview.name, bookedTimes: [bookedTime] });
        }
    });
    return res;
};

interface IInformationContainerProps {
    data: RequiterInfo;
    role?: "admin" | "user";
    isEditing?: boolean;
    eventEditing: ScheduleEvent;
    onEditEvent: (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => void;
}

const InformationContainer: FC<IInformationContainerProps> = ({
    data,
    role = "user",
    isEditing,
    eventEditing,
    onEditEvent,
}) => {
    const dayStart = useAppSelector(state => state.main.config.dayStartFrom);
    const dayEnd = useAppSelector(state => state.main.config.dayStopTo);
    const recruiters = useAppSelector(state => state.main.recruiters);
    const options: Time[] = getOptions(dayStart, dayEnd);
    const mergedInterviewsInfo = useMemo(() => mergeInterviewsInfo(data.interviews), [data]);
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
        let hasOverlapTime = true;
        events.forEach(e => {
            if (hasOverlapDate(e.start, e.end, workTimeStart, workTimeEnd)) {
                hasOverlapTime = false;
            }
        });
        if (hasOverlapTime || parseInt(workTimeStart) >= parseInt(workTimeEnd)) {
            setIsTimeWrong(true);
            return;
        }
        onEditEvent(eventEditing, workTimeStart, workTimeEnd);
        setIsTimeWrong(false);
    };

    return (
        <div className={s.requiter_info}>
            <div className={s.requiter}>
                <span className={s.font_size_18}>Рекрутёр:</span>
                <span className={s.time}>{data.name}</span>
            </div>
            {!isEditing ? (
                <>
                    <div className={s.work_time}>
                        <span className={s.font_size_18}>Рабочий промежуток времени:</span>
                        <span className={s.time}>{data.workTimeTitle}</span>
                    </div>
                    <div className={s.available_interviews}>
                        <span className={s.font_size_18}>Доступные собеседования:</span>
                        {data.availableInterviewTimes.map((t, i) => (
                            <span
                                key={`available_time_${i}`}
                                className={s.time}
                            >
                                {t}
                            </span>
                        ))}
                        {mergedInterviewsInfo.map(interview => (
                            <div
                                key={`interview_${interview.id}`}
                                className={s.interview}
                            >
                                <span>{interview.name}</span>
                                <div className={s.interview_times}>
                                    {interview.bookedTimes.map((t, i) => (
                                        <span
                                            key={`booked_time_${interview.id}_${i}`}
                                            className={s.time}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
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
            )}
        </div>
    );
};

export default InformationContainer;
