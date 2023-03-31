import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

export const widthDragDropContext = DragDropContext(HTML5Backend);
export const DATE_TIME_FORMAT = "YYYY-MM-DD H:mm";
export const DATE_FORMAT = "YYYY-MM-DD";

export const EVENT_BG_DEFAULT = "#d9edf7";
export const EVENT_BG_SELECTED = "#1890ff";
export const EVENT_BG_GRAY = "#eee";
export const EVENT_BG_FREE = "#cec";
export const EVENT_BG_PASSED = "#cec";
