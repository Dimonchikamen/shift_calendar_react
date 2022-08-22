import { FC } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface ISelectItemProps {
    value: string;
    options: string[];
    onchange: (e: SelectChangeEvent) => void;
    className?: string;
    size?: "small" | "medium";
    optionDisableFunc?: (v: string) => boolean;
}

const SelectItem: FC<ISelectItemProps> = ({
    className,
    value,
    options,
    onchange,
    size = "medium",
    optionDisableFunc,
}) => {
    return (
        <Select
            className={className}
            onChange={onchange}
            displayEmpty
            value={value}
            size={size}
            MenuProps={{ PaperProps: { style: { maxHeight: "200px" } } }}
        >
            {options.map((v, i) => (
                <MenuItem
                    key={i}
                    value={v}
                    disabled={optionDisableFunc ? optionDisableFunc(v) : false}
                >
                    {v}
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectItem;
