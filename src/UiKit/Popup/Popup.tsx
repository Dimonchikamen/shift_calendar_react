import { FC, ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogTitleProps {
    children?: ReactNode;
    onClose?: () => void;
}

const BootstrapDialogTitle: FC<DialogTitleProps> = ({ children, onClose }) => {
    return (
        <DialogTitle>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

interface IProps {
    className?: string;
    fullWidth?: boolean;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    children?: ReactNode | ReactNode[];
    title: string;
    isOpen: boolean;
    onCancel: () => void;
    onClose?: () => void;
}

const Popup: FC<IProps> = ({
    className,
    fullWidth = false,
    maxWidth = "sm",
    isOpen,
    title,
    children,
    onCancel,
    onClose,
}) => {
    const cancelActionHandler = () => {
        onCancel();
    };

    return (
        <Dialog
            className={className}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            onClose={cancelActionHandler}
            open={isOpen}
        >
            <BootstrapDialogTitle onClose={onClose}>{title}</BootstrapDialogTitle>
            <Divider />
            {children}
        </Dialog>
    );
};

export default Popup;
