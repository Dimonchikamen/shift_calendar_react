import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import { Resource, SchedulerData } from "react-big-scheduler";
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
    role: string;
    viewType: ViewType;
    events: Event[];
    view?: string;
    deleteEvent: (eventItem: ScheduleEvent) => void;
    editEvent: (schedulerData: SchedulerData, eventItem: ScheduleEvent) => void;
}

const Popover: FC<IPopoverProps> = ({
    schedulerData,
    eventItem,
    events,
    title,
    start,
    end,
    role,
    viewType,
    view = "worktime",
    deleteEvent,
    editEvent,
}) => {
    const dispatch = useAppDispatch();

    const changeEvent = (event: Event) => {
        dispatch(
            changeEventAction({
                id: event.id,
                title: event.title,
            })
        );
    };

    if (eventItem.bgColor === "#EEE" && viewType === "edit") {
        const eventToChange = events.filter(ev => ev.id === eventItem.eventId)[0];
        return (
            <div className={s.Popover}>
                <div>
                    Это рабочее время для другого мероприятия.
                    <br />
                    Переключить мероприятие на <strong>{eventToChange.title}</strong>?
                </div>
                <Button
                    onClick={() => changeEvent(eventToChange)}
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
