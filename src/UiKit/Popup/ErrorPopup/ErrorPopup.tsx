import { FC } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Popup from "../Popup";

interface IProps {
    isOpen: boolean;
    title: string;
    errorCode: number;
    onCancel: () => void;
}

const ErrorPopup: FC<IProps> = ({ isOpen, title, errorCode, onCancel }) => {
    return (
        <Popup
            title={title}
            isOpen={isOpen}
            onCancel={onCancel}
            onClose={onCancel}
        >
            <DialogContent>
                <DialogContentText id="error-dialog-description">
                    Проверьте подключение к интернету или повторите попытку позже.
                </DialogContentText>
                <DialogContentText>Код ошибки: {errorCode}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>ОК</Button>
            </DialogActions>
        </Popup>
    );
};
export default ErrorPopup;
