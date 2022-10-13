import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import { SchedulerData } from "react-big-scheduler";
import Button from "antd/lib/button";
import s from "../Popover/Popover.module.css";
import { Recruiter } from "../../../../Types/Recruiter";
import { useAppDispatch } from "../../../../Redux/Hooks";
import { DATE_TIME_FORMAT } from "../../../../Constants";
import { changeEventAction } from "../../../../Redux/Actions/ChangeEventAction";
import { Event } from "../../../../Types/Event";
import { ViewType } from "../../../../Types/ViewType";

interface IPopoverProps {
    schedulerData: SchedulerData;
    eventItem: ScheduleEvent;
    title: string;
    start: any;
    end: any;
    currentEvent: Event;
    role: string;
    viewType: ViewType;
    recruiters?: Recruiter[];
    view?: string;
    deleteEvent: (eventItem: ScheduleEvent) => void;
    editEvent: (schedulerData: SchedulerData, eventItem: ScheduleEvent) => void;
}

const Popover: FC<IPopoverProps> = ({
    schedulerData,
    eventItem,
    recruiters,
    title,
    start,
    end,
    currentEvent,
    role,
    viewType,
    view = "worktime",
    deleteEvent,
    editEvent,
}) => {
    // const changeEvent = (eventName: string) => {
    //     dispatch(changeEventAction(recruiters!, eventName));
    // };

    if (eventItem.bgColor === "#EEE" && viewType === "edit") {
        return (
            <div className={s.Popover}>
                <div>
                    Это рабочее время для другого мероприятия.
                    <br />
                    Переключить мероприятие на <strong>{currentEvent.title}</strong>?
                </div>
                <Button
                    //onClick={() => changeEvent(thisEvent!)}
                    className={s.Button}
                >
                    Переключить
                </Button>
            </div>
        );
    }

    return (
        <div className={s.Popover}>
            <span
                className="header2-text"
                title={title}
            >
                {start.format(DATE_TIME_FORMAT).slice(-5)} - {end.format(DATE_TIME_FORMAT).slice(-5)}
            </span>
            {view === "worktime" && role === "admin" && viewType === "edit" && (
                <div className={s.btnswrapper}>
                    <Button
                        onClick={() => deleteEvent(eventItem)}
                        className={s.Button}
                    >
                        Удалить
                    </Button>
                    <Button
                        onClick={() => editEvent(schedulerData, eventItem)}
                        className={s.Button}
                    >
                        Редактировать
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Popover;
