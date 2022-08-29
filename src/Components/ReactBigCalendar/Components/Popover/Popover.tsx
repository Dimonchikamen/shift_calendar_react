import { FC } from 'react'
import { ScheduleEvent } from '../../../../Types/ScheduleEvent'
import { SchedulerData } from 'react-big-scheduler'
import { DATE_FORMAT } from '../../ReactBigCalendar'
import Button from 'antd/lib/button'
import s from '../Popover/Popover.module.css'

interface IPopoverProps {
    schedulerData: SchedulerData;
    eventItem: ScheduleEvent;
    title: string;
    start: any;
    end: any;
    deleteEvent: (eventItem: ScheduleEvent) => void; 
    editEvent: (schedulerData: SchedulerData, eventItem: ScheduleEvent) => void; 
}

const Popover: FC<IPopoverProps> = ({ schedulerData, eventItem, title, start, end, deleteEvent, editEvent }) => {
    return (
        <div className={s.Popover}>
            <span
                className="header2-text"
                title={title}
            >
                {start.format(DATE_FORMAT).slice(-5)} - {end.format(DATE_FORMAT).slice(-5)}
            </span>
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
        </div>
    );
};

export default Popover