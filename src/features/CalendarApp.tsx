import Calendar from "@toast-ui/react-calendar";
import "./styles/tailwind.css";
import "./styles/toastui-calendar.min.css";
import { CalendarProps } from "~/types";

export const CalendarApp = ({ allEvents }: CalendarProps) => {
  return (
    <div className="calApp flex h-screen justify-end" tabIndex={-1}>
      <div className="w-96 h-screen">
        <Calendar
          usageStatistics={false}
          view="day"
          height="100%"
          events={allEvents}
        />
      </div>
    </div>
  );
};
