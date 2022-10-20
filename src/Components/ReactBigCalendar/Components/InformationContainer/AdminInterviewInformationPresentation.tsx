import { FC } from "react";
import s from "./InformationContainer.module.css";
import { Interview } from "../../../../Types/Interview";
import { ScheduleInterviewEvent } from "../../../../Types/ScheduleInterviewEvent";

interface IAdminInterviewInformationPresentationProps {
    interview: Interview;
}

const AdminInterviewInformationPresentation: FC<IAdminInterviewInformationPresentationProps> = ({ interview }) => {
    return (
        <>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Время собеседования:</span>
                <span className={s.time}>{interview.start + " - " + interview.end}</span>
            </div>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Волонтер:</span>
                <span className={s.time}>{interview.name}</span>
            </div>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Роль:</span>
                <span className={s.time}>{interview.role}</span>
            </div>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Контакты:</span>
                <span className={s.time}>{interview.phone}</span>
            </div>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Способ связи:</span>
                <span className={s.time}>{interview.contacts}</span>
            </div>
            <div className={s.work_time}>
                <a href="#">
                    <span className={s.time}>Анкета волонтера</span>
                </a>
            </div>
        </>
    );
};

export default AdminInterviewInformationPresentation;
