import { FC } from "react";
import s from "./InformationContainer.module.css";
import { ScheduleInterviewEvent } from "../../../../Types/ScheduleInterviewEvent";
import Button from "@mui/material/Button";
import { getTime } from "../../../../Helpers/DateTimeHelpers";

interface IVolunteerInterviewInformationProps {
    interview: ScheduleInterviewEvent;
    onSignUp: (interview: ScheduleInterviewEvent) => void;
}

const VolunteerInterviewInformation: FC<IVolunteerInterviewInformationProps> = ({ interview, onSignUp }) => {
    return (
        <>
            <div className={s.work_time}>
                <span className={s.font_size_18}>Время собеседования:</span>
                <span className={s.time}>{getTime(interview.start) + " - " + getTime(interview.end)}</span>
            </div>
            <Button
                className={s.save_btn}
                onClick={() => onSignUp(interview)}
            >
                Записаться
            </Button>
        </>
    );
};

export default VolunteerInterviewInformation;
