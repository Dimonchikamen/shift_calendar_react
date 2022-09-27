import { FC, useEffect, useState } from "react";
import { getHour } from "../../../Helpers/DateTimeHelpers";
import { Time } from "../../../Types/Time";
import { getOptions } from "../../../Helpers/GetOptions";
import { SelectChangeEvent } from "@mui/material";
import { ScheduleEvent } from "../../../Types/ScheduleEvent";
import SetWorkTimePopup from "../SetWorkTimePopup/SetWorkTimePopup";

const hourOptions: Time[] = getOptions(0, 23);

interface IEditWorkingTimePopupProps {
    title: string;
    isOpen: boolean;
    selectedEvent: ScheduleEvent | null;
    onSubmit: (startHours: number, endHours: number) => void;
    onCancel: () => void;
}

const EditWorkTimePopup: FC<IEditWorkingTimePopupProps> = ({ title, isOpen, selectedEvent, onSubmit, onCancel }) => {
    const [currentStart, setStart] = useState(0);
    const [currentEnd, setEnd] = useState(23);

    useEffect(() => {
        if (selectedEvent) {
            setStart(getHour(selectedEvent.start.split(" ")[1]));
            setEnd(getHour(selectedEvent.end.split(" ")[1]));
        }
    }, [selectedEvent]);

    const changeStartHandler = (e: SelectChangeEvent) => setStart(getHour(e.target.value));

    const changeEndHandler = (e: SelectChangeEvent) => setEnd(getHour(e.target.value));

    const submit = () => onSubmit(currentStart, currentEnd);

    return (
        <SetWorkTimePopup
            title={title}
            isOpen={isOpen}
            hourOptions={hourOptions}
            start={currentStart}
            end={currentEnd}
            onChangeStart={changeStartHandler}
            onChangeEnd={changeEndHandler}
            onSubmit={submit}
            onCancel={onCancel}
        />
    );
};

export default EditWorkTimePopup;
