import React, { FC, useState } from "react";
import { ScheduleInterviewEvent } from "../../../../Types/ScheduleInterviewEvent";
import Popup from "../../../../UiKit/Popup/Popup";
import TextField from "@mui/material/TextField/TextField";
import s from "./ModalForm.module.css";
import Button from "@mui/material/Button";
import { FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { UserInfo } from "../../../../Types/UserInfo";
import { Interview } from "../../../../Types/Interview";

interface IModalProps {
    isOpen: boolean;
    interview: ScheduleInterviewEvent;
    userInfo: UserInfo;
    interviewRole: string;
    onSubmitSignUp: (interview: ScheduleInterviewEvent, info: Interview) => void;
    onCancel: () => void;
}

const ModalForm: FC<IModalProps> = ({ isOpen, interview, userInfo, interviewRole, onSubmitSignUp, onCancel }) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [phone, setPhone] = useState<string>(userInfo.phone);
    const [contacts, setContacts] = useState<string[]>([]);

    const checkHandler = (e: React.SyntheticEvent<Element, Event>, checked: boolean) => {
        contactsHandler(e);
        setDisabled(!checked);
    };

    const contactsHandler = (e: React.BaseSyntheticEvent) => {
        const checkInputs: HTMLInputElement[] = Array.from(e.target.form.getElementsByTagName("input"));
        const chosenInputs: string[] = checkInputs
            .filter((el: HTMLInputElement) => el.id.slice(0, 5) === "form-")
            .map((elem: HTMLInputElement) => (elem.checked ? elem.id.replace("form-", "") : ""))
            .filter((name: string) => name !== "");
        setContacts(chosenInputs);
    };

    const submitHandler = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const send = {
            id: interview.id,
            userId: userInfo.id,
            name: userInfo.name,
            role: interviewRole,
            phone,
            contacts,
            start: interview.start,
            end: interview.end,
        } as Interview;
        onSubmitSignUp(interview, send);
    };

    return (
        <div className={s.ModalForm}>
            <Popup
                isOpen={isOpen}
                title={"Запись на собеседование"}
                onCancel={onCancel}
                onClose={onCancel}
            >
                <form className={s.form}>
                    <TextField
                        label="Имя"
                        value={userInfo.name}
                        variant="outlined"
                        size="small"
                        disabled
                        required
                    />
                    <TextField
                        label="Роль"
                        value={interviewRole}
                        variant="outlined"
                        size="small"
                        disabled
                        required
                    />
                    <TextField
                        label="Дата и время"
                        value={interview?.start}
                        variant="outlined"
                        size="small"
                        disabled
                        required
                    />
                    <TextField
                        label="Телефон"
                        defaultValue={phone}
                        variant="outlined"
                        size="small"
                        placeholder="+79000000000"
                        onChange={e => setPhone(e.target.value)}
                        focused
                        required
                    />
                    <FormGroup>
                        <FormLabel
                            component="legend"
                            required
                        >
                            Предпочтительный способ связи:
                        </FormLabel>
                        <div className={s.checkboxes}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked={userInfo.contacts.includes("tg")}
                                        size="small"
                                        id="form-tg"
                                        onChange={contactsHandler}
                                    />
                                }
                                label="Telegram"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked={userInfo.contacts.includes("wa")}
                                        id="form-wa"
                                        size="small"
                                        onChange={contactsHandler}
                                    />
                                }
                                label="WhatsApp"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked={userInfo.contacts.includes("ph")}
                                        id="form-ph"
                                        size="small"
                                        onChange={contactsHandler}
                                    />
                                }
                                label="Звонок"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked={userInfo.contacts.includes("sms")}
                                        id="form-sms"
                                        size="small"
                                        onChange={contactsHandler}
                                    />
                                }
                                label="SMS"
                            />
                        </div>
                    </FormGroup>
                    <FormControlLabel
                        control={<Checkbox size="small" />}
                        onChange={checkHandler}
                        label="Даю согласие на обработку персональных данных и подтверждаю корректность введенных данных."
                    />

                    <h5 className={s.notify}>
                        Перед отправкой формы необходимо убедиться, что в настройках конфиденциальности выбранного
                        способа связи разрешено получение сообщений и звонков со всех номеров, а сам аккаунт мессенджера
                        доступен для поиска по Вашему контактному номеру телефона
                    </h5>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={submitHandler}
                        disabled={disabled}
                    >
                        Записаться
                    </Button>
                </form>
            </Popup>
        </div>
    );
};

export default ModalForm;
