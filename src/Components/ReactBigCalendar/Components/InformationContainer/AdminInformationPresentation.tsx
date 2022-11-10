import { FC, useMemo } from "react";
import s from "./InformationContainer.module.css";
import { RecruiterInfo } from "../../../../Types/RecruiterInfo";
import { Interview } from "../../../../Types/Interview";
import { createTitleFromHours } from "../../../../Helpers/CreateTitle";

const mergeInterviewsInfo = (interviews: Interview[]) => {
    const res: { id: number; userId: number; name: string; bookedTimes: string[] }[] = [];
    interviews.forEach(interview => {
        const index = res.findIndex(r => r.name === interview.name);
        const bookedTime = createTitleFromHours(interview.start, interview.end);
        if (index !== -1) {
            res[index].bookedTimes.push(bookedTime);
        } else {
            res.push({ id: interview.id, userId: interview.userId, name: interview.name, bookedTimes: [bookedTime] });
        }
    });
    return res;
};

interface IAdminInformationPresentationProps {
    data: RecruiterInfo;
}

const AdminInformationPresentation: FC<IAdminInformationPresentationProps> = ({ data }) => {
    const mergedInterviewsInfo = useMemo(() => mergeInterviewsInfo(data.interviews), [data]);
    return (
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
                        <a href={`/user/profile/${interview.userId}`}>
                            <span>{interview.name}</span>
                        </a>
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
    );
};

export default AdminInformationPresentation;
