import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Calendar from "./Calender";
import { clickToBlock, mapQueryData } from "./utils";

const App = (props: { state: boolean; preferredThemeMode: string }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedulerData, setSchedulerData] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);

  const currentDateChange = (currentDate: Date) => {
    setCurrentDate(currentDate);
  };

  useEffect(() => {
    clickToBlock();
  }, []);

  async function getScheduleData() {
    const apptsArr = await mapQueryData();
    setSchedulerData(apptsArr);
  }

  useEffect(() => {
    getScheduleData();
  }, [props.state]);

  const refreshAppt = () => {
    getScheduleData();
  };

  const toggleFullScreen = () => {
    fullScreen ? setFullScreen(false) : setFullScreen(true);
  };

  return (
    <div className="flex justify-center overflow-scroll ">
      <Paper>
        <div
          className={`calWrapper absolute top-0 right-0 ${
            props.preferredThemeMode === "dark" ? "bg-black" : "bg-white"
          } rounded-lg p-3 ${!fullScreen ? "w-1/2" : "w-full"} border
`}
        >
          <div className="flex flex-row justify-between">
            <p className="text-2xl align-middle text-blue-400">
              Today's Appointments
            </p>
            <div className="mb-2">
              <button
                onClick={refreshAppt}
                className="text-green-600 hover:scale-175 mr-2"
              >
                <i className="ti ti-refresh"></i>
              </button>
              <button
                onClick={toggleFullScreen}
                className="text-center mr-2 hover:scale-175"
              >
                <i className="ti ti-maximize"></i>
              </button>
            </div>
          </div>
          <Calendar
            schedulerData={schedulerData}
            currentDate={currentDate}
            currentDateChange={currentDateChange}
          />
        </div>
      </Paper>
    </div>
  );
};

export default App;
