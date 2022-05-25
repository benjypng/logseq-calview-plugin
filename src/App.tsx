import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Calendar from "./Calender";
import { clickToBlock, mapQueryData } from "./utils";

const App = (props: { state: boolean; preferredThemeMode: string }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedulerData, setSchedulerData] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [widthValue, setWidthValue] = useState(logseq.settings!.defaultWidth);
  const [, updateState] = React.useState();
  //@ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);

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
    forceUpdate();
    getScheduleData();
  };

  const toggleFullScreen = () => {
    fullScreen ? setFullScreen(false) : setFullScreen(true);
  };

  const changeWidth = (opt: string) => {
    if (opt === "more") {
      setWidthValue(widthValue + 10);
    } else if (opt === "less") {
      setWidthValue(widthValue - 10);
    }

    logseq.updateSettings({
      defaultWidth: widthValue,
    });
  };

  return (
    <div className="flex justify-center overflow-scroll ">
      <Paper>
        <div
          style={{ width: `${widthValue}px` }}
          className={`calWrapper absolute top-0 right-0 ${
            props.preferredThemeMode === "dark" ? "bg-black" : "bg-white"
          } rounded-lg p-3 border
`}
        >
          <div className="flex flex-row justify-between">
            <p className="text-2xl align-middle text-blue-400">
              Today's Appointments
            </p>
            <div className="mb-2 flex flex-row align-middle">
              <button
                onClick={refreshAppt}
                className="text-green-600 hover:cursor-pointer mr-2"
              >
                <i className="ti ti-refresh text-2xl"></i>
              </button>
              <button
                className="hover:cursor-pointer mr-2"
                onClick={() => changeWidth("more")}
              >
                <i className="ti ti-arrow-left-bar text-2xl"></i>
              </button>
              <button
                className="hover:cursor-pointer mr-2"
                onClick={() => changeWidth("less")}
              >
                <i className="ti ti-arrow-right-bar text-2xl"></i>
              </button>
              <button
                onClick={toggleFullScreen}
                className="text-center mr-2 hover:cursor-pointer"
              >
                <i className="ti ti-maximize text-2xl"></i>
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
