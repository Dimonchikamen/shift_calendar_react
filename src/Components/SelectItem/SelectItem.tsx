import { FC } from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface ISelectItemProps {
    value: string;
    label: string;
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
        <FormControl sx={{ m: 1, minWidth: 90 }}>
            <Select
                className={className}
                onChange={onchange}
                value={value}
                size={size}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
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
        </FormControl>
    );
};

export default SelectItem;
