import { FC, useMemo } from "react";
import s from "./InformationContainer.module.css";
import { RequiterInfo } from "../../../../Types/RequiterInfo";
import { createTitleFromHours } from "../../../../Helpers/CreateTitle";
import { Interview } from "../../../../Types/Interview";

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

const mapWhere = <T,>(array: T[], predicate: (el: T) => boolean) => {
    const res: T[] = [];
    array.forEach(elem => {
        if (predicate(elem)) {
            res.push(elem);
        }
    });
    return res;
};

interface IInformationContainerProps {
    data: RequiterInfo;
    role?: "admin" | "user";
}

const InformationContainer: FC<IInformationContainerProps> = ({ data, role = "user" }) => {
    const mergedInterviewsInfo = useMemo(() => mergeInterviewsInfo(data.interviews), [data]);

    return (
        <div className={s.requiter_info}>
            <div className={s.requiter}>
                <span className={s.font_size_18}>Рекрутёр:</span>
                <span className={s.time}>{data.name}</span>
            </div>
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
        </div>
    );
};

export default InformationContainer;
