import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import { SchedulerData } from "react-big-scheduler";
import Button from "antd/lib/button";
import s from "../Popover/Popover.module.css";
import { Recruiter } from "../../../../Types/Recruiter";
import { useAppDispatch } from "../../../../Redux/Hooks";
import { changeEventRequest } from "../../../../Redux/Actions/EventsActions/ChangeEventActions";
import { DATE_TIME_FORMAT } from "../../../../Constants";

interface IPopoverProps {
    schedulerData: SchedulerData;
    eventItem: ScheduleEvent;
    title: string;
    start: any;
    end: any;
    recruiters?: Recruiter[];
    view?: "worktime" | "interview";
    role?: string;
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
    view = "worktime",
    role,
    deleteEvent,
    editEvent,
}) => {
    const dispatch = useAppDispatch();

    let eventName = Array.from(new Set(eventItem.interviews.map(int => int.event)));
    if (!eventName.length) eventName = ["Нет собеседований"];
    if (view === "interview") {
        eventName = [eventItem.interviews[0].event];
    }

    const changeEvent = (eventName: string) => {
        dispatch(changeEventRequest(recruiters!, eventName));
    };

    const getEventForThisWorktime = () => {
        return recruiters
            ?.filter(obj => obj.id.toString() === eventItem.resourceId)[0]
            .workedTimes.filter(o => o.id === eventItem.id)[0].events[0];
    };

    if (eventItem.bgColor === "#EEE") {
        const thisEvent = getEventForThisWorktime();
        return (
            <div className={s.Popover}>
                <div>
                    Это рабочее время для другого мероприятия.
                    <br />
                    Переключить мероприятие на <strong>{thisEvent}</strong>?
                </div>
                <Button
                    onClick={() => changeEvent(thisEvent!)}
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
            {view === "worktime" && role === "admin" ? (
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
            ) : (
                <>
                    {eventName.map(event => (
                        <span
                            className="header2-text"
                            key={Math.random()}
                        >
                            {event}
                        </span>
                    ))}
                </>
            )}
        </div>
    );
};

export default Popover;
