import Calendar from "@toast-ui/react-calendar";
import "/src/tailwind.css";
import "/src/toastui-calendar.min.css";

export const CalendarApp = () => {
  return (
    <div className="calApp flex h-screen justify-end" tabIndex={-1}>
      <div className="w-96 h-screen">
        <Calendar usageStatistics={false} view="day" height="100%" />
      </div>
    </div>
  );
};
