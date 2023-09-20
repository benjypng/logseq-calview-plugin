import Calendar from "@toast-ui/react-calendar";
import "./styles/tailwind.css";
import "./styles/toastui-calendar.min.css";
import { CalendarProps } from "~/types";
import { useRef } from "react";

export const CalendarApp = ({ allEvents }: CalendarProps) => {
  const calendarRef = useRef(null);
  const test = () => {
    //@ts-ignore
    const calendarInstance = calendarRef.current?.getInstance();
    calendarInstance.next();
  };
  return (
    <div className="flex h-screen justify-end" tabIndex={-1}>
      <div className="w-96 calApp">
        <button onClick={test} className="bg-red-900">
          Test
        </button>
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
