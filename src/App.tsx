import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Calendar from './Calender';

const getCalTimeFormat = (journalDayInNumber: number) => {
  const journalDay = journalDayInNumber.toString();

  return (
    journalDay.slice(0, 4) +
    '-' +
    journalDay.slice(4, 6) +
    '-' +
    journalDay.slice(6)
  );
};

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedulerData, setSchedulerData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const currentDateChange = (currentDate: Date) => {
    setCurrentDate(currentDate);
  };

  const mapQueryData = async () => {
    const query = await logseq.DB.datascriptQuery(`[
        :find (pull ?b [*])
        :where
               [?b :block/parent ?parent]
               [?b :block/properties ?p]
               [(get ?p :start-time) ?ty]
               (not [(get ?p :template)])
      ]`);

    const newQueryArr = query.map((i) => ({
      uuid: i[0].uuid.$uuid$,
      startTime: i[0].properties['start-time'],
      endTime: i[0].properties['end-time'],
      parentId: i[0].parent.id,
      content: i[0].content.slice(0, i[0].content.indexOf('\nstart-time')),
    }));

    let apptsArr = [];
    for (const r of newQueryArr) {
      // Construct start and end time in the format YYYY-MM-DDTHH:MM
      const journalPage = await logseq.Editor.getPage(r.parentId);
      const startTime = `${getCalTimeFormat(journalPage.journalDay)}T${
        r.startTime
      }`;
      const endTime = `${getCalTimeFormat(journalPage.journalDay)}T${
        r.endTime
      }`;

      const payload = {
        startDate: startTime,
        endDate: endTime,
        title: getTitle(r.content, journalPage.originalName, r.uuid),
      };
      apptsArr.push(payload);
    }

    setSchedulerData(apptsArr);
    setLoaded(true);
  };

  const getTitle = (content: string, pageName: string, uuid: string) => {
    return (
      <React.Fragment>
        {content}
        <span
          style={{ visibility: 'hidden' }}
          className="pageName"
          id="pageName"
        >
          {pageName}
        </span>
        <span style={{ visibility: 'hidden' }} className="uuid" id="uuid">
          {uuid}
        </span>
      </React.Fragment>
    );
  };

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const html: any = e.target;
      const htmlContainer = html.parentNode.parentNode;

      if (html instanceof SVGElement) {
        return;
      }

      if (
        html.className === 'VerticalAppointment-title' ||
        html.className === 'HorizontalAppointment-title' ||
        html.className === 'VerticalAppointment-time' ||
        html.className.includes('Appointment-appointment')
      ) {
        if (htmlContainer.className === 'VerticalAppointment-container') {
          const pageName = htmlContainer.querySelector('.pageName').textContent;
          const uuid = htmlContainer.querySelector('.uuid').textContent;
          logseq.Editor.scrollToBlockInPage(pageName, uuid);
        } else {
          const pageName = html.querySelector('.pageName').textContent;
          const uuid = html.querySelector('.uuid').textContent;
          logseq.Editor.scrollToBlockInPage(pageName, uuid);
        }
      }
    });
  }, []);

  const toggleFullScreen = () => {
    fullScreen ? setFullScreen(false) : setFullScreen(true);
  };

  useEffect(() => {
    mapQueryData();
  }, [schedulerData.length]);

  const refreshAppt = () => {
    mapQueryData();
  };

  return (
    <Paper>
      <div className="flex justify-center overflow-scroll">
        <div
          className={`absolute top-3 right-0 bg-white rounded-lg p-3 ${
            !fullScreen ? 'w-1/2' : 'w-full'
          } border
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
          {loaded && (
            <Calendar
              schedulerData={schedulerData}
              currentDate={currentDate}
              currentDateChange={currentDateChange}
            />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default App;
