import { FC } from "react";
import Popup from "../Popup";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";

interface IRemoveWorkTimePopup {
    title: string;
    isOpen: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

const RemoveWorkTimePopup: FC<IRemoveWorkTimePopup> = ({ title, isOpen, onSubmit, onCancel }) => {
    return (
        <Popup
            title={title}
            isOpen={isOpen}
            onCancel={onCancel}
            onClose={onCancel}
        >
            <DialogContent>
                <DialogContentText>Вы уверены, что хотите убрать рабочее время?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit}>Да</Button>
                <Button onClick={onCancel}>Нет</Button>
            </DialogActions>
        </Popup>
    );
};

export default RemoveWorkTimePopup;
