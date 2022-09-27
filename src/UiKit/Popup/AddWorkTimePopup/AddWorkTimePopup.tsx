import { FC, useState } from "react";
import { getHour } from "../../../Helpers/DateTimeHelpers";
import { Time } from "../../../Types/Time";
import { getOptions } from "../../../Helpers/GetOptions";
import { SelectChangeEvent } from "@mui/material";
import SetWorkTimePopup from "../SetWorkTimePopup/SetWorkTimePopup";

const hourOptions: Time[] = getOptions(0, 23);

interface IAddWorkingTimePopupProps {
    title: string;
    isOpen: boolean;
    onSubmit: (startHours: number, endHours: number) => void;
    onCancel: () => void;
}

const AddWorkTimePopup: FC<IAddWorkingTimePopupProps> = ({ title, isOpen, onSubmit, onCancel }) => {
    const [currentStart, setStart] = useState(0);
    const [currentEnd, setEnd] = useState(23);

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
