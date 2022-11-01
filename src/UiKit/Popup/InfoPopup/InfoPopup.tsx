import { FC } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Popup from "../Popup";

interface IProps {
    isOpen: boolean;
    title: string;
    text: string;
    onCancel: () => void;
}

const InfoPopup: FC<IProps> = ({ isOpen, title, text, onCancel }) => {
    return (
        <Popup
            title={title}
            isOpen={isOpen}
            onCancel={onCancel}
            onClose={onCancel}
        >
            <DialogContent>
                <DialogContentText id="error-dialog-description">{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>ОК</Button>
            </DialogActions>
        </Popup>
    );
};
export default InfoPopup;
