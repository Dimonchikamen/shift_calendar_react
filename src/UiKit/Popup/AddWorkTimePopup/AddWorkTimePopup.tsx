import { FC, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Popup from "../Popup";
import { useAppSelector } from "../../../Redux/Hooks";
import s from "../../../Components/ReactBigCalendar/Components/CalendarHeader/CalendarHeader.module.css";
import SelectItem from "../../SelectItem/SelectItem";
import { getHour, getTimeFromHours } from "../../../Helpers/DateTimeHelpers";
import { Time } from "../../../Types/Time";
import { getOptions } from "../../../Helpers/GetOptions";

const hourOptions: Time[] = getOptions(0, 23);

interface IAddWorkingTimePopupProps {
    title: string;
    isOpen: boolean;
    onSubmit: (startHours: number, endHours: number) => void;
    onCancel: () => void;
}

const AddWorkTimePopup: FC<IAddWorkingTimePopupProps> = ({ title, isOpen, onSubmit, onCancel }) => {
    const min = useAppSelector(state => state.main.config.dayStartFrom);
    const max = useAppSelector(state => state.main.config.dayStopTo);
    const [currentStart, setStart] = useState(getTimeFromHours(min));
    const [currentEnd, setEnd] = useState(getTimeFromHours(max));

    const submit = () => {
        onSubmit(getHour(currentStart), getHour(currentEnd));
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
                        options={hourOptions}
                        size="small"
                        optionDisableFunc={v => getHour(v) >= max || getHour(v) < min}
                        onchange={e => setStart(e.target.value)}
                    />
                    <span>до</span>
                    <SelectItem
                        value={currentEnd}
                        options={hourOptions}
                        size="small"
                        optionDisableFunc={v => getHour(v) <= min || getHour(v) > max}
                        onchange={e => setEnd(e.target.value)}
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
