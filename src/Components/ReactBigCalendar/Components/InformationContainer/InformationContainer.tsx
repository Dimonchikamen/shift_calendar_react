import { FC, memo } from "react";
import s from "./InformationContainer.module.css";
import { RecruiterInfo } from "../../../../Types/RecruiterInfo";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import AdminInterviewInformationPresentation from "./AdminInterviewInformationPresentation";
import AdminInformationPresentation from "./AdminInformationPresentation";
import VolunteerInterviewInformation from "./VolunteerInterviewInformation";
import EditInformation from "./EditInformation";
import { ScheduleInterviewEvent } from "../../../../Types/ScheduleInterviewEvent";

interface IInformationContainerProps {
    role: string;
    view: string;
    isEditing: boolean;
    data: RecruiterInfo;
    interview?: ScheduleInterviewEvent;
    eventEditing?: ScheduleEvent;
    onSignUp?: (interview: ScheduleInterviewEvent) => void;
    onEditEvent?: (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => void;
}

interface IEditInformationProps extends IInformationContainerProps {
    isEditing: true;
    eventEditing: ScheduleEvent;
    onEditEvent: (eventEditing: ScheduleEvent, dayStart: string, dayEnd: string) => void;
}

interface IAdminInterviewInformationPresentationProps extends IInformationContainerProps {
    interview: ScheduleInterviewEvent;
}

interface IVolunteerInterviewInformationProps extends IInformationContainerProps {
    interview: ScheduleInterviewEvent;
    onSignUp: (interview: ScheduleInterviewEvent) => void;
}

const InformationContainer: FC<
    IEditInformationProps | IAdminInterviewInformationPresentationProps | IVolunteerInterviewInformationProps
> = ({ role, view, isEditing, data, interview, eventEditing, onSignUp, onEditEvent }) => {
    return (
        <div className={s.requiter_info}>
            <div className={s.requiter}>
                <span className={s.font_size_18}>Рекрутёр:</span>
                <span className={s.time}>{data.name}</span>
            </div>
            {role === "admin" || role === "coord" ? (
                view === "interview" ? (
                    <AdminInterviewInformationPresentation
                        interview={data.interviews.filter(i => i.id === interview!.id)[0]}
                    />
                ) : isEditing ? (
                    <EditInformation
                        data={data}
                        eventEditing={eventEditing!}
                        onEditEvent={onEditEvent!}
                    />
                ) : (
                    <AdminInformationPresentation data={data} />
                )
            ) : (
                <VolunteerInterviewInformation
                    interview={interview!}
                    onSignUp={onSignUp!}
                />
            )}
        </div>
    );
};

export default memo(InformationContainer);
