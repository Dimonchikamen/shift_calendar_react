import "./App.css";
import React, { FC, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ReactBigCalendar from "./Components/ReactBigCalendar/ReactBigCalendar";
import { Resource, ViewTypes } from "react-big-scheduler";
import { ScheduleEvent } from "./Types/ScheduleEvent";
import mockRecruiters from "./Mocks/Requiters.json";
import { createResourcesAndEvents } from "./Helpers/CreateResourcesAndEvents";
import { Recruiter } from "./Types/Recruiter";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import MonthCalendar from "./Components/MonthCalendar/MonthCalendar";
import PopUp from "./Components/ReactBigCalendar/Components/PopUp/PopUp";

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

const getDiff = (min: number, max: number) => max - min + 1;

const App: FC = () => {
    const [config, setConfig] = useState<any>({
        dayCellWidth: 50,
        weekCellWidth: 1100 / 7,
        dayResourceTableWidth: 300,
        weekResourceTableWidth: 300,
        schedulerWidth: 1100,
        startResizable: true,
        endResizable: true,
        movable: false,
        resourceName: "Рекрутеры:",
        eventItemPopoverDateFormat: "D/MM",
        nonAgendaDayCellHeaderFormat: "H:mm",
        dayStartFrom: 9,
        dayStopTo: 19,
        minuteStep: 30,
        views: [
            { viewName: "День", viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false },
            { viewName: "Неделя", viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false },
        ],
    });

    const [events, setEvents] = useState<ScheduleEvent[]>([]);

    const [resources, setResources] = useState<Resource[]>([]);
    const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.Day);
    const monthViewType = ViewTypes.Month;
    const monthConfig = { ...config, views: [], headerEnabled: false };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [eventAdding, setEventAdding] = useState<ScheduleEvent>();
    const [isAdding, setIsAdding] = useState<boolean>(true);

    const behaviours = {
        isNonWorkingTimeFunc: () => false,
    };
    //-----------------------------------NAVIGATION_TABS-----------------------------------------
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    //-----------------------------------NAVIGATION_TABS-----------------------------------------
    const resize = () => {
        const newWidth = window.innerWidth * 0.75;
        let newResourceTableWidth = config.dayResourceTableWidth;
        if (window.innerWidth < 1200) {
            newResourceTableWidth = 200;
        }
        const min = config.dayStartFrom;
        const max = config.dayStopTo;
        const minuteStep = config.minuteStep;
        const timeWidth = newWidth - newResourceTableWidth;
        const newDayCellWidth = timeWidth / (getDiff(min, max) * (60 / minuteStep));
        const newWeekCellWidth = timeWidth / 7;
        setConfig({
            ...config,
            dayResourceTableWidth: newResourceTableWidth,
            weekResourceTableWidth: newResourceTableWidth,
            schedulerWidth: newWidth,
            dayCellWidth: newDayCellWidth,
            weekCellWidth: newWeekCellWidth,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        resize();
        const [resources, events] = createResourcesAndEvents(mockRecruiters as unknown as Recruiter[]);
        setEvents(events);
        setResources(resources);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    useEffect(() => {
        resize();
    }, [config.dayStartFrom, config.dayStopTo, config.minuteStep]);

    const changeConfig = (newConfig: object) => {
        setConfig(newConfig);
    };

    const eventSubmit = (submit: boolean, isAdding: boolean) => {
        setIsOpen(false);
        if (submit && isAdding) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setEvents([...new Set([...events, eventAdding])]);
        } else {
            setEvents([
                ...events.filter(obj => {
                    return obj != eventAdding;
                }),
            ]);
        }
    };

    const addingEvent = (ev: ScheduleEvent) => {
        let redFlag = false;
        events
            .filter(obj => {
                return obj.resourceId == ev.resourceId;
            })
            .forEach(elem => {
                if (elem.start.slice(0, 10) == ev.start.slice(0, 10)) {
                    if ((ev.start < elem.end && ev.start > elem.start) || (ev.end < elem.end && ev.end > elem.start)) {
                        redFlag = true;
                    }
                }
            });
        if (!redFlag) {
            setIsOpen(true);
            setIsAdding(true);
            setEventAdding(ev);
            redFlag = false;
        }
    };

    const deleteEvent = (ev: ScheduleEvent) => {
        setIsOpen(true);
        setEventAdding(ev);
        setIsAdding(false);
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
                            label="Item One"
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Item Two"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>
                <TabPanel
                    value={value}
                    index={0}
                >
                    <PopUp
                        isOpen={isOpen}
                        onEventSubmit={eventSubmit}
                        event={eventAdding!}
                        isAdding={isAdding}
                        recruiterName={
                            resources.filter(obj => {
                                return obj.id === eventAdding?.resourceId;
                            })[0]?.name
                        }
                    />
                    <ReactBigCalendar
                        config={config}
                        resources={resources}
                        events={events}
                        behaviours={behaviours}
                        viewType={viewType}
                        onChangeViewType={setViewType}
                        onChangeConfig={changeConfig}
                        onAddEvent={addingEvent}
                        onDeleteEvent={deleteEvent}
                    />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={1}
                >
                    <MonthCalendar events={events} />
                </TabPanel>
            </Box>
        </div>
    );
};

export default App;
