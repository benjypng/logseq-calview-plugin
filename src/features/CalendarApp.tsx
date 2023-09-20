import Calendar from "@toast-ui/react-calendar";
import "./styles/tailwind.css";
import "./styles/toastui-calendar.min.css";
import { CalendarProps } from "~/types";
import { useRef } from "react";

export const CalendarApp = ({ allEvents }: CalendarProps) => {
  const calendarRef = useRef<Calendar>(null);
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

  return (
    <div className="flex h-screen justify-end" tabIndex={-1}>
      <div className="calApp w-96 bg-white border border-black">
        <div className="bg-white flex justify-center">
          <button
            onClick={() => navigate("previous")}
            className="w-24 text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Previous
          </button>
          <button
            onClick={() => navigate("today")}
            className="w-24 text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
          >
            Today
          </button>
          <button
            onClick={() => navigate("next")}
            className="w-24 text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
        <Calendar
          ref={calendarRef}
          isReadOnly={true}
          usageStatistics={false}
          view="day"
          height="90%"
          week={{ taskView: false }}
          events={allEvents}
        />
      </div>
    </div>
  );
};
