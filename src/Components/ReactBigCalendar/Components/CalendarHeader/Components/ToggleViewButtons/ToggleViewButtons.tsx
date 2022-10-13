import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { FC } from "react";
import { ViewType } from "../../../../../../Types/ViewType";

interface IToggleViewButtonsProps {
    viewType: ViewType;
    onChangeView: (value: ViewType) => void;
}

const ToggleViewButtons: FC<IToggleViewButtonsProps> = ({ viewType, onChangeView }) => {
    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: ViewType) => {
        onChangeView(newAlignment);
    };

    return (
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
    );
};

export default ToggleViewButtons;
