import { FC, useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Popup from "../Popup";
import s from "../Popup.module.css";
import SelectItem from "../../SelectItem/SelectItem";
import { getHour, getTimeFromHours } from "../../../Helpers/DateTimeHelpers";
import { Time } from "../../../Types/Time";
import { getOptions } from "../../../Helpers/GetOptions";
import { SelectChangeEvent } from "@mui/material";
import { ScheduleEvent } from "../../../Types/ScheduleEvent";

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

    const submit = () => {
        onSubmit(currentStart, currentEnd);
    };

    return (
        <Popup
            title={title}
            isOpen={isOpen}
            onCancel={onCancel}
            onClose={onCancel}
        >
            <DialogContent>
                <div className={s.select_work_time_container}>
                    <span>Рабочее время с</span>
                    <SelectItem
                        value={getTimeFromHours(currentStart)}
                        options={hourOptions}
                        size="small"
                        optionDisableFunc={v => getHour(v) >= currentEnd}
                        onchange={changeStartHandler}
                    />
                    <span>до</span>
                    <SelectItem
                        value={getTimeFromHours(currentEnd)}
                        options={hourOptions}
                        size="small"
                        optionDisableFunc={v => getHour(v) <= currentStart}
                        onchange={changeEndHandler}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={submit}>Установить</Button>
            </DialogActions>
        </Popup>
    );
};

export default EditWorkTimePopup;
