import { FC } from "react";
import s from "./InformationContainer.module.css";
import { RequiterInfo } from "../../../../Types/RequiterInfo";

interface IInformationContainerProps {
    data: RequiterInfo;
}

const InformationContainer: FC<IInformationContainerProps> = ({ data }) => {
    return (
        <div className={s.requiter_info}>
            <div className={s.requiter}>
                <span className={s.font_size_18}>Рекрутёр:</span>
                <span className={s.time}>{data.name}</span>
            </div>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Рабочий промежуток времени:</span>
                <span className={s.time}>{data.workTime}</span>
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
                {data.interviews.map((interview, i) => (
                    <div
                        key={`interview_${i}`}
                        className={s.interview}
                    >
                        <span>{interview.name}</span>
                        <div className={s.interview_times}>
                            {interview.bookedTimeTitles.map((t, i) => (
                                <span
                                    key={`booked_time_${i}`}
                                    className={s.time}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InformationContainer;
