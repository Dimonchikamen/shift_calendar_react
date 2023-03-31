import { FC } from "react";
import s from "./InformationContainer.module.css";
import { Interview } from "../../../../Types/Interview";
import { Button } from "@mui/material";

interface IAdminInterviewInformationPresentationProps {
    interview: Interview;
    interviewIsPassed: boolean | undefined;
    onClickChangeInterviewTime: () => void;
}

const AdminInterviewInformationPresentation: FC<IAdminInterviewInformationPresentationProps> = ({
    interview,
    interviewIsPassed,
    onClickChangeInterviewTime,
}) => {
    return (
        <>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Время собеседования:</span>
                <div className={s.work_time__time}>
                    <span className={s.time}>{interview.start + " - " + interview.end}</span>
                    {!interviewIsPassed && (
                        <Button
                            className={s.change_time_interview__button}
                            size={"small"}
                            variant={"contained"}
                            onClick={onClickChangeInterviewTime}
                        >
                            Перенести
                        </Button>
                    )}
                </div>
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
                {interview.contacts.map((contact, i) => (
                    <span
                        key={`contact-${i}`}
                        className={s.time}
                    >
                        {contact}
                    </span>
                ))}
            </div>
            <div className={s.work_time}>
                <a href={`/user/interview/${interview.userId}`}>
                    <span className={s.time}>Анкета волонтера</span>
                </a>
            </div>
        </>
    );
};

export default AdminInterviewInformationPresentation;
