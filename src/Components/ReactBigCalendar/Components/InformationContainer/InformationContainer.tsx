import { FC, useMemo, useState } from "react";
import s from "./InformationContainer.module.css";
import { RequiterInfo } from "../../../../Types/RequiterInfo";
import { createTitleFromHours } from "../../../../Helpers/CreateTitle";
import { Interview } from "../../../../Types/Interview";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import Button from 'antd/lib/button'
import SelectItem from "../../../SelectItem/SelectItem";

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
    eventEditing?: ScheduleEvent;
    min: string;
    max: string;
    options: string[];
    onEditEvent: (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => void;
}

const InformationContainer: FC<IInformationContainerProps> = ({ data, role = "user", isEditing, eventEditing, min, max, options, onEditEvent }) => {
    const mergedInterviewsInfo = useMemo(() => mergeInterviewsInfo(data.interviews), [data]);

    const [dayStart, setDayStart] = useState(min)
    const [dayEnd, setDayEnd] = useState(max)

    const editingEvent = (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => {
        if(dayStart >= dayEnd) {alert('Выбери нормально время'); return}
        onEditEvent(eventEditing, dayStart, dayEnd)
    }

    return (
        <div className={s.requiter_info}>
            <div className={s.requiter}>
                    <span className={s.font_size_18}>Рекрутёр:</span>
                    <span className={s.time}>{data.name}</span>
                </div>
            {!isEditing
            ? <>
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
                    {/*{data.interviews.map((interview, i) => (*/}
                    {/*    <div*/}
                    {/*        key={`interview_${i}`}*/}
                    {/*        className={s.interview}*/}
                    {/*    >*/}
                    {/*        <span>{interview.name}</span>*/}
                    {/*        <div className={s.interview_times}>*/}
                    {/*            <span*/}
                    {/*                key={`booked_time_${i}`}*/}
                    {/*                className={s.time}*/}
                    {/*            >*/}
                    {/*                {createTitleFromHours(interview.start, interview.end)}*/}
                    {/*            </span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
            </>
            : <>
                <div className={s.work_time}>
                    <span className={s.font_size_18}>Рабочий промежуток времени:</span>
                    <span className={s.time}>{data.workTimeTitle}</span>
                </div>
                <div className={s.select_work_time_container}>
                    <div>Изменить рабочее время:</div>
                    <span>с</span>
                    <SelectItem
                        value={dayStart}
                        options={options}
                        size="small"
                        onchange={(e) => {
                            setDayStart(e.target.value)
                        }}
                        className={s.work_time_selector}
                    />
                    <br />
                    <span>до</span>
                    <SelectItem
                        value={dayEnd}
                        options={options}
                        size="small"
                        onchange={(e) => {
                            setDayEnd(e.target.value)
                        }}
                        className={s.work_time_selector}
                    />
                </div>
                
                <Button className={s.save_btn} onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    editingEvent(eventEditing, dayStart, dayEnd)
                    }} >
                    Сохранить
                </Button>
            </>}
        </div>
    );
};

export default InformationContainer;
