import { FC, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Popup from "../Popup";
import s from "../../../Components/ReactBigCalendar/Components/CalendarHeader/CalendarHeader.module.css";
import SelectItem from "../../SelectItem/SelectItem";
import { Time } from "../../../Types/Time";
import { getOptions } from "../../../Helpers/GetOptions";
import { SelectChangeEvent } from "@mui/material";
import { ScheduleEvent } from "../../../Types/ScheduleEvent";
import { getHour, getMinutes, getTime, getTimeFromHours } from "../../../Helpers/DateTimeHelpers";
import { compareTime } from "../../../Helpers/Compare";

interface IAddWorkingTimePopupProps {
    title: string;
    isOpen: boolean;
    selectedFreeWorkTime: ScheduleEvent;
    min: number;
    max: number;
    onSubmit: (selectedFreeWorkTime: ScheduleEvent, start: Date, end: Date) => void;
    onCancel: () => void;
}

const AddWorkTimePopup: FC<IAddWorkingTimePopupProps> = ({
    title,
    isOpen,
    selectedFreeWorkTime,
    min,
    max,
    onSubmit,
    onCancel,
}) => {
    const options: Time[] = getOptions(min, max, 0.5);
    const [currentStart, setStart] = useState<Time>(getTime(selectedFreeWorkTime.start));
    const [currentEnd, setEnd] = useState<Time>(getTime(selectedFreeWorkTime.end));

    const changeStartHandler = (e: SelectChangeEvent) => setStart(e.target.value);

    const changeEndHandler = (e: SelectChangeEvent) => setEnd(e.target.value);

    const submit = () => {
        const start = new Date(selectedFreeWorkTime.start);
        start.setHours(getHour(currentStart));
        start.setMinutes(getMinutes(currentStart));
        const end = new Date(selectedFreeWorkTime.end);
        end.setHours(getHour(currentEnd));
        end.setMinutes(getMinutes(currentEnd));
        onSubmit(selectedFreeWorkTime, start, end);
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
                        value={currentStart}
                        options={options}
                        size="small"
                        optionDisableFunc={v =>
                            compareTime(v, currentEnd) >= 0 || compareTime(v, getTimeFromHours(min)) < 0
                        }
                        onchange={changeStartHandler}
                    />
                    <span>до</span>
                    <SelectItem
                        value={currentEnd}
                        options={options}
                        size="small"
                        optionDisableFunc={v =>
                            compareTime(v, currentStart) <= 0 || compareTime(v, getTimeFromHours(max)) > 0
                        }
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

export default AddWorkTimePopup;
