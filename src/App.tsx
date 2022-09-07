import "./App.css";
import React, { FC, memo } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import MonthCalendar from "./Components/MonthCalendar/MonthCalendar";
import ReactBigCalendar2 from "./Components/ReactBigCalendar/ReactBigCalendar2";

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

const App: FC = () => {
    const [value, setValue] = React.useState(0);

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
                            label="Писец"
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
