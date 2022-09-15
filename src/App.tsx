import "./App.css";
import React, { FC, memo, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import MonthCalendar from "./Components/MonthCalendar/MonthCalendar";
import ReactBigCalendar2 from "./Components/ReactBigCalendar/ReactBigCalendar2";
import { useAppDispatch } from "./Redux/Hooks";
import { setRoleAction } from "./Redux/Actions/SetRoleAction";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface IAppProps {
    role: string;
}

const App: FC<IAppProps> = ({ role }) => {
    const [value, setValue] = React.useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRoleAction(role));
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="app">
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            label="День/Неделя"
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Месяц"
                            {...a11yProps(1)}
                        />
                        <Tab
                            label="Собесы"
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </Box>
                <TabPanel
                    value={value}
                    index={0}
                >
                    <ReactBigCalendar />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={1}
                >
                    <MonthCalendar />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={2}
                >
                    <ReactBigCalendar2 />
                </TabPanel>
            </Box>
        </div>
    );
};

export default memo(App);
