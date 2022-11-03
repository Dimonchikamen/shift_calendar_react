import { FC } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Popup from "../Popup";

interface IProps {
    isOpen: boolean;
    title: string;
    text: string | null;
    onCancel: () => void;
}

const ErrorPopup: FC<IProps> = ({ isOpen, title, text, onCancel }) => {
    return (
        <Popup
            fullWidth={true}
            maxWidth={"xs"}
            title={title}
            isOpen={isOpen}
            onCancel={onCancel}
            onClose={onCancel}
        >
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>ОК</Button>
            </DialogActions>
        </Popup>
    );
};
export default ErrorPopup;
