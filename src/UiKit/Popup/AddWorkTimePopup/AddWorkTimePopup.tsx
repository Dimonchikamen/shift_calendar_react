import { FC, useEffect, useState } from "react";
import { getHour } from "../../../Helpers/DateTimeHelpers";
import { Time } from "../../../Types/Time";
import { getOptions } from "../../../Helpers/GetOptions";
import { SelectChangeEvent } from "@mui/material";
import SetWorkTimePopup from "../SetWorkTimePopup/SetWorkTimePopup";

const hourOptions: Time[] = getOptions(0, 23);

interface IAddWorkingTimePopupProps {
    title: string;
    isOpen: boolean;
    lastInterval: { start: string; end: string };
    onSubmit: (startHours: number, endHours: number) => void;
    onCancel: () => void;
}

const AddWorkTimePopup: FC<IAddWorkingTimePopupProps> = ({ title, isOpen, lastInterval, onSubmit, onCancel }) => {
    const [currentStart, setStart] = useState(0);
    const [currentEnd, setEnd] = useState(23);

    useEffect(() => {
        setStart(parseInt(lastInterval.start));
        setEnd(parseInt(lastInterval.end));
    }, [lastInterval]);

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

export default AddWorkTimePopup;
