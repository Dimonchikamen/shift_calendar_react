import { FC } from "react";
import Popup from "../Popup";
import DialogContent from "@mui/material/DialogContent";
import s from "./SetWorkTimePopup.module.css";
import SelectItem from "../../SelectItem/SelectItem";
import { getHour, getTimeFromHours } from "../../../Helpers/DateTimeHelpers";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material";

interface ISetWorkTimePopupProps {
    title: string;
    isOpen: boolean;
    hourOptions: string[];
    start: number;
    end: number;
    onChangeStart: (e: SelectChangeEvent) => void;
    onChangeEnd: (e: SelectChangeEvent) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

const SetWorkTimePopup: FC<ISetWorkTimePopupProps> = ({
    title,
    isOpen,
    hourOptions,
    start,
    end,
    onChangeStart,
    onChangeEnd,
    onCancel,
    onSubmit,
}) => {
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
                        value={getTimeFromHours(start)}
                        options={hourOptions}
                        size="small"
                        optionDisableFunc={v => getHour(v) >= end}
                        onchange={onChangeStart}
                    />
                    <span>до</span>
                    <SelectItem
                        value={getTimeFromHours(end)}
                        options={hourOptions}
                        size="small"
                        optionDisableFunc={v => getHour(v) <= start}
                        onchange={onChangeEnd}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit}>Установить</Button>
            </DialogActions>
        </Popup>
    );
};

export default SetWorkTimePopup;
