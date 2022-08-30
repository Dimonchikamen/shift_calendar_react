import { FC } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ScheduleEvent } from "../../../Types/ScheduleEvent";
import Popup from "../Popup";

interface IProps {
    isOpen: boolean;
    event: ScheduleEvent;
    isAdding: boolean;
    recruiterName: string;
    onEventSubmit: () => void;
    onCancel: () => void;
}

const AlertDialog: FC<IProps> = ({ isOpen, event, isAdding, recruiterName, onEventSubmit, onCancel }) => {
    let title = "Установить рабочее время?";
    let text = "Хотите установить рабочее время для ";

    if (!isAdding) {
        title = "Удалить рабочее время?";
        text = "Хотите удалить рабочее время для ";
    }

    return (
        <Popup
            title={title}
            isOpen={isOpen}
            onCancel={onCancel}
            onClose={onCancel}
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                    <strong>{recruiterName}</strong> на период <strong>{event?.title.split(" ").join("\u00A0")}</strong>
                    ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Отмена</Button>
                <Button onClick={onEventSubmit}>Да</Button>
            </DialogActions>
        </Popup>
    );
};
export default AlertDialog;
