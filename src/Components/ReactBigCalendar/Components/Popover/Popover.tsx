import { FC } from "react";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";
import { SchedulerData } from "react-big-scheduler";
import Button from "antd/lib/button";
import s from "../Popover/Popover.module.css";
import { DATE_TIME_FORMAT } from "../../../../Constants";
import { Event } from "../../../../Types/Event";
import { ViewType } from "../../../../Types/ViewType";
import { ScheduleInterviewEvent } from "../../../../Types/ScheduleInterviewEvent";
import { isInterviewEvent, isScheduleEvent } from "../../../../Helpers/instanceHelpers";
import { useAppSelector } from "../../../../Redux/Hooks";
import moment from "moment";

interface IPopoverProps {
    schedulerData: SchedulerData;
    eventItem: ScheduleEvent | ScheduleInterviewEvent;
    title: string;
    start: any;
    end: any;
    role: string;
    viewType: ViewType;
    events: Event[];
    view?: string;
    currentEvent?: Event;
    deleteEvent: (eventItem: ScheduleEvent) => void;
    editEvent: (schedulerData: SchedulerData, eventItem: ScheduleEvent) => void;
    setEvent: (schedulerData: SchedulerData, eventItem: ScheduleEvent) => void;
    onChangeInterviewRecruiter: (eventItem: ScheduleInterviewEvent) => void;
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
    currentEvent,
    deleteEvent,
    editEvent,
    setEvent,
    onChangeInterviewRecruiter,
}) => {
    const recruiters = useAppSelector(state => state.workDayState.state.recruiters);
    const canChange = moment() < moment(start);
    return (
        <div className={s.Popover}>
            <span
                className="header2-text"
                title={title}
            >
                {start.format(DATE_TIME_FORMAT).slice(-5)} - {end.format(DATE_TIME_FORMAT).slice(-5)}
            </span>
            {!role && eventItem.bgColor === "#EEE" && <span>Вы записаны на собеседование в это время</span>}
            {role &&
                isScheduleEvent(eventItem) &&
                !eventItem.isFree &&
                (currentEvent?.id === -1 || currentEvent?.id !== eventItem.eventId) && (
                    <span>{events.filter(e => eventItem.eventId === e.id)[0].title}</span>
                )}
            {canChange && role && recruiters.length > 1 && isInterviewEvent(eventItem) && (
                <Button
                    className={s.Button}
                    onClick={() => onChangeInterviewRecruiter(eventItem)}
                >
                    Назначить на другого рекрутёра
                </Button>
            )}
            {canChange && isScheduleEvent(eventItem) && view === "worktime" && role === "admin" && viewType === "edit" && (
                <>
                    {!eventItem.isFree && currentEvent?.id !== -1 ? (
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
                            {currentEvent?.id !== -1 ? (
                                <>
                                    <div>
                                        Это свободное время. Назначить его на мероприятие{" "}
                                        <strong>{currentEvent?.title}</strong>?
                                    </div>

                                    <Button
                                        onClick={() => setEvent(schedulerData, eventItem)}
                                        className={s.Button}
                                    >
                                        Назначить
                                    </Button>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Popover;
