import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import s from "./WaitPopup.module.css";
import { CircularProgress } from "@mui/material";

interface IWaitPopupProps {
    isOpen: boolean;
}

const WaitPopup: FC<IWaitPopupProps> = ({ isOpen }) => {
    return (
        <Backdrop
            sx={{ zIndex: 999 }}
            open={isOpen}
        >
            <div className={s.loader_container}>
                <CircularProgress sx={{ margin: "8px 8px 0 8px" }} />
            </div>
        </Backdrop>
    );
};

export default WaitPopup;
