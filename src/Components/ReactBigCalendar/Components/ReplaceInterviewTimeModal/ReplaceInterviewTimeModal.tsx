import React, { FC, useCallback, useState } from "react";
import { ScheduleInterviewEvent } from "../../../../Types/ScheduleInterviewEvent";
import Popup from "../../../../UiKit/Popup/Popup";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import { Select, SelectChangeEvent, MenuItem, InputLabel, FormControl } from "@mui/material";
import { RecruiterInfo } from "../../../../Types/RecruiterInfo";
import { FullDateTime } from "../../../../Types/FullDateTime";
import s from "./ReplaceInterviewTimeModal.module.css";

interface IModalProps {
    isOpen: boolean;
    recruiterInfo: RecruiterInfo;
    interview: ScheduleInterviewEvent;
    availableTimes: string[];
    onSubmitReplaceInterviewTime: (interviewId: number, workTimeId: number, newInterviewTime: FullDateTime) => void;
    onCancel: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
        },
    },
};

const ReplaceInterviewTimeModal: FC<IModalProps> = ({
    isOpen,
    recruiterInfo,
    interview,
    availableTimes,
    onSubmitReplaceInterviewTime,
    onCancel,
}) => {
    const interviewInfo = recruiterInfo.interviews.filter(i => i.id === interview.id)[0];
    const [selectedTime, setSelectedTime] = useState<string>("Не выбрано");

    const changeTimeHandler = useCallback((e: SelectChangeEvent) => {
        setSelectedTime(e.target.value);
    }, []);

    const submitHandler = useCallback(
        (e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            onSubmitReplaceInterviewTime(interview.id, interview.workTimeId, selectedTime);
        },
        [onSubmitReplaceInterviewTime, selectedTime, interview]
    );

    return (
        <Popup
            fullWidth={true}
            isOpen={isOpen}
            maxWidth={"xs"}
            title={"Изменение времени собеседования"}
            onCancel={onCancel}
            onClose={onCancel}
        >
            <form className={s.form}>
                <TextField
                    label="Имя"
                    value={interviewInfo.name}
                    variant="outlined"
                    size="small"
                    disabled
                    required
                />
                <TextField
                    label="Роль"
                    value={interviewInfo.role}
                    variant="outlined"
                    size="small"
                    disabled
                    required
                />
                <TextField
                    label="Текущее Дата и время"
                    value={interview?.start}
                    variant="outlined"
                    size="small"
                    disabled
                    required
                />
                <FormControl fullWidth={true}>
                    <InputLabel
                        id="select-time-label"
                        style={{ backgroundColor: "white" }}
                    >
                        Новое время
                    </InputLabel>
                    <Select
                        value={selectedTime}
                        labelId={"select-time-label"}
                        label={"Новое время"}
                        fullWidth={true}
                        size={"small"}
                        MenuProps={MenuProps}
                        onChange={changeTimeHandler}
                    >
                        <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
                        {availableTimes.map((t, i) => {
                            return (
                                <MenuItem
                                    key={t}
                                    value={t}
                                >
                                    {t}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <TextField
                    label="Телефон"
                    defaultValue={interviewInfo.phone}
                    variant="outlined"
                    size="small"
                    placeholder="+79000000000"
                    disabled={true}
                    required
                />
                <FormControl
                    fullWidth={true}
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth={true}
                        disabled={selectedTime === "Не выбрано"}
                        onClick={submitHandler}
                    >
                        Перенести
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color="error"
                        fullWidth={true}
                        onClick={onCancel}
                    >
                        отменить
                    </Button>
                </FormControl>
            </form>
        </Popup>
    );
};

export default ReplaceInterviewTimeModal;
