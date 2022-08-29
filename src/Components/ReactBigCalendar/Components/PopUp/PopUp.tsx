import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ScheduleEvent } from "../../../../Types/ScheduleEvent";

interface IProps {
    isOpen: boolean;
    event: ScheduleEvent;
    isAdding: boolean;
    recruiterName: string;
    isEditing: boolean;
    onEventSubmit: (submit: boolean, isAdding: boolean) => void;
}

const AlertDialog: FC<IProps> = ({ isOpen, event, isAdding, recruiterName, onEventSubmit, isEditing }) => {
    const eventSubmit = (submit: boolean) => {
        onEventSubmit(submit, isAdding);
    };

    let title = "Установить рабочее время?";
    let text = "Хотите установить рабочее время для ";

    if (!isAdding) {
        title = "Удалить рабочее время?";
        text = "Хотите удалить рабочее время для ";
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => eventSubmit(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                        <strong>{recruiterName}</strong> на период{" "}
                        <strong>{event?.title.split(" ").join("\u00A0")}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => eventSubmit(false)}>Отмена</Button>
                    <Button
                        onClick={() => eventSubmit(true)}
                        autoFocus
                    >
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AlertDialog;
