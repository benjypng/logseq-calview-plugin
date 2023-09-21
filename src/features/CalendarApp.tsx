import Calendar from "@toast-ui/react-calendar";
import "./styles/tailwind.css";
import "./styles/toastui-calendar.min.css";
import { CalendarProps } from "~/types";
import { useRef, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillCaretDown,
  AiOutlineFullscreen,
} from "react-icons/ai";

export const CalendarApp = ({ allEvents }: CalendarProps) => {
  const calendarRef = useRef<Calendar>(null);
  const [width, setWidth] = useState("w-96");

  const setSize = () => {
    setWidth(width === "w-96" ? "w-full" : "w-96");
  };

  const navigate = (flag: string) => {
    const calendarInstance = calendarRef.current?.getInstance();
    if (!calendarInstance) return;
    switch (flag) {
      case "previous":
        calendarInstance.prev();
        return;
      case "next":
        calendarInstance.next();
        return;
      default:
        calendarInstance.today();
    }
  };

  const changeView = (flag: string) => {
    const calendarInstance = calendarRef.current?.getInstance();
    if (!calendarInstance) return;
    switch (flag) {
      case "day":
        calendarInstance.changeView("day");
        return;
      case "week":
        calendarInstance.changeView("week");
        return;
      default:
        calendarInstance.changeView("month");
    }
  };

  return (
    <div className="flex h-screen justify-end" tabIndex={-1}>
      <div className={`calApp bg-white border border-black ${width}`}>
        <div className="flex justify-between">
          <div className="bg-white flex justify-start align-middle">
            <button
              onClick={() => navigate("previous")}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              onClick={() => navigate("today")}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
            >
              Today
            </button>
            <button
              onClick={() => navigate("next")}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              <AiOutlineArrowRight />
            </button>
            <select
              className="ml-2 h-full text-sm block w-32 bg-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => changeView(e.target.value)}
            >
              <option value="day">Day View</option>
              <option value="week">Week View</option>
              <option value="month">Month View</option>
            </select>
          </div>
          <button onClick={setSize}>
            <AiOutlineFullscreen className="h-6 w-6 m-2 hover:bg-gray-300" />
          </button>
        </div>
        <Calendar
          ref={calendarRef}
          isReadOnly={true}
          usageStatistics={false}
          view="day"
          height="100%"
          week={{ taskView: false }}
          events={allEvents}
        />
      </div>
    </div>
  );
};
