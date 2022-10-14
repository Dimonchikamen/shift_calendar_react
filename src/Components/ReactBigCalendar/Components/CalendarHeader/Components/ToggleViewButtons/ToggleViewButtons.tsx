import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { FC } from "react";
import { ViewType } from "../../../../../../Types/ViewType";
import { ViewTypeWorktime } from "../../../../../../Types/ViewTypeWorktime";

interface IToggleViewButtonsProps {
    viewType?: ViewType;
    view?: string;
    onChangeView: (value: ViewType) => void;
    onChangeViewWorktime: (value: ViewTypeWorktime) => void;
}

const ToggleViewButtons: FC<IToggleViewButtonsProps> = ({ viewType, view, onChangeView, onChangeViewWorktime }) => {
    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: ViewType) => {
        onChangeView(newAlignment);
    };

    const changeInterviewView = (event: React.MouseEvent<HTMLElement>, newAlignment: ViewTypeWorktime) => {
        onChangeViewWorktime(newAlignment);
    };

    return (
        <>
            {viewType ? (
                <ToggleButtonGroup
                    value={viewType}
                    onChange={handleAlignment}
                    size="small"
                    exclusive={true}
                    aria-label="text alignment"
                >
                    <ToggleButton value="edit">Изменение</ToggleButton>
                    <ToggleButton value="read">Просмотр</ToggleButton>
                </ToggleButtonGroup>
            ) : (
                <ToggleButtonGroup
                    value={view}
                    onChange={changeInterviewView}
                    size="small"
                    exclusive={true}
                    aria-label="text alignment"
                >
                    <ToggleButton value="interview">Собеседования</ToggleButton>
                    <ToggleButton value="worktime">Смены</ToggleButton>
                </ToggleButtonGroup>
            )}
        </>
    );
};

export default ToggleViewButtons;
