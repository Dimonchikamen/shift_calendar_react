import { FC, useMemo, useState, useEffect, memo } from "react";
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
import { getHour, getTime } from "../../../../Helpers/DateTimeHelpers";
import { createResourcesAndEvents } from "../../../../Helpers/CreateResourcesAndEvents";
import { hasOverlapTime } from "../../../../Helpers/HasOverlap";

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
    view?: string;
    isEditing?: boolean;
    eventEditing: ScheduleEvent;
    onEditEvent: (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => void;
}

const InformationContainer: FC<IInformationContainerProps> = ({
    data,
    role = "admin",
    view,
    isEditing,
    eventEditing,
    onEditEvent,
}) => {
    const dayStart = useAppSelector(state => state.workDayState.state.config.dayStartFrom)!;
    const dayEnd = useAppSelector(state => state.workDayState.state.config.dayStopTo)!;
    const recruiters = useAppSelector(state => state.workDayState.state.recruiters);
    // const currentInterviewTime = useAppSelector(state => state.workDayState.state.currentInterviewTime);
    // const options: Time[] = getOptions(dayStart, dayEnd, currentInterviewTime === "" ? 30 : currentInterviewTime);
    const options: Time[] = getOptions(dayStart, dayEnd);
    const mergedInterviewsInfo = useMemo(() => mergeInterviewsInfo(data.interviews), [data]);
    const [leftTime, rightTime] = useMemo(() => data.workTimeTitle.split(" - "), [data.workTimeTitle]);
    const [workTimeStart, setDayStart] = useState<Time>(leftTime);
    const [workTimeEnd, setDayEnd] = useState<Time>(rightTime);
    const [isTimeWrong, setIsTimeWrong] = useState(false);
    const [currentInterview, setCurrentInterview] = useState(data.interviews[0]);

    useEffect(() => {
        setDayEnd(rightTime);
        setDayStart(leftTime);
    }, [leftTime, rightTime]);

    useEffect(() => {
        setCurrentInterview(data.interviews[0]);
    }, [data]);

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
        <div className={s.requiter_info}>
            <div className={s.requiter}>
                <span className={s.font_size_18}>Рекрутёр:</span>
                <span className={s.time}>{data.name}</span>
            </div>

            {view === "interview" ? (
                <>
                    <div className={s.work_time}>
                        <span className={s.font_size_18}>Время собеседования:</span>
                        <span className={s.time}>{currentInterview.start + " - " + currentInterview.end}</span>
                    </div>
                    <div className={s.work_time}>
                        <span className={s.font_size_18}>Волонтер:</span>
                        <span className={s.time}>{currentInterview.name}</span>
                    </div>
                    <div className={s.work_time}>
                        <span className={s.font_size_18}>Роль:</span>
                        <span className={s.time}>{currentInterview.role}</span>
                    </div>
                    <div className={s.work_time}>
                        <span className={s.font_size_18}>Контакты:</span>
                        <span className={s.time}>{currentInterview.phone}</span>
                    </div>
                    <div className={s.work_time}>
                        <span className={s.font_size_18}>Способ связи:</span>
                        <span className={s.time}>{currentInterview.contacts}</span>
                    </div>
                    <div className={s.work_time}>
                        <a href="#">
                            <span className={s.time}>Анкета волонтера</span>
                        </a>
                    </div>
                </>
            ) : !isEditing ? (
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

export default memo(InformationContainer);
