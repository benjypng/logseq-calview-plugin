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
        <div className="bg-white flex justify-end align-middle">
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
          <div className="inline-block relative w-40 ml-2 mt-0.5">
            <select
              className="text-sm block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => changeView(e.target.value)}
            >
              <option>Change View</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <AiFillCaretDown />
            </div>
          </div>
          <button onClick={setSize}>
            <AiOutlineFullscreen className="h-6 w-6 m-2" />
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
