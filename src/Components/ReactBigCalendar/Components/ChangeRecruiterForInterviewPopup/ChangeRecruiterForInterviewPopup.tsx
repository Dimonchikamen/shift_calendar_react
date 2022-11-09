import { FC, useEffect, useState } from "react";
import Popup from "../../../../UiKit/Popup/Popup";
import { Recruiter } from "../../../../Types/Recruiter";
import DialogContent from "@mui/material/DialogContent";
import s from "../CalendarHeader/CalendarHeader.module.css";
import SelectItem from "../../../../UiKit/SelectItem/SelectItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material";

interface IChangeRecruiterForInterviewPopupProps {
    isOpen: boolean;
    availableRecruiters: Recruiter[];
    onSubmit: (selectedRecruiter: Recruiter) => void;
    onCancel: () => void;
}

const ChangeRecruiterForInterviewPopup: FC<IChangeRecruiterForInterviewPopupProps> = ({
    isOpen,
    availableRecruiters,
    onSubmit,
    onCancel,
}) => {
    const [currentRecruiter, setCurrentRecruiter] = useState(
        availableRecruiters.length > 0 ? availableRecruiters[0].name : ""
    );
    const options = availableRecruiters.map(r => r.name);

    useEffect(() => {
        if (availableRecruiters.length > 0) setCurrentRecruiter(availableRecruiters[0].name);
    }, [availableRecruiters]);

    const changeCurrentRecruiterHandler = (e: SelectChangeEvent) => {
        setCurrentRecruiter(e.target.value);
    };

    const submitHandler = () => {
        const index = availableRecruiters.findIndex(r => r.name === currentRecruiter);
        onSubmit(availableRecruiters[index]);
    };

    return (
        <Popup
            title={"Назначить собеседование на другого рекрутёра"}
            isOpen={isOpen}
            onCancel={onCancel}
        >
            {availableRecruiters.length > 0 && (
                <>
                    <DialogContent>
                        <div className={s.select_work_time_container}>
                            <SelectItem
                                value={currentRecruiter}
                                options={options}
                                size="medium"
                                onchange={changeCurrentRecruiterHandler}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitHandler}>Назначить</Button>
                        <Button onClick={onCancel}>Отменить</Button>
                    </DialogActions>
                </>
            )}
        </Popup>
    );
};

export default ChangeRecruiterForInterviewPopup;
