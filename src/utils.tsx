import React from "react";

const getCalTimeFormat = (journalDayInNumber: number) => {
  if (journalDayInNumber) {
    const journalDay = journalDayInNumber.toString();
    return (
      journalDay.slice(0, 4) +
      "-" +
      journalDay.slice(4, 6) +
      "-" +
      journalDay.slice(6)
    );
  } else {
    return `Error: Events found in non-journal pages.`;
  }
};

const getTitle = (content: string, pageName: string, uuid: string) => {
  return (
    <React.Fragment>
      {content}
      <span style={{ visibility: "hidden" }} className="pageName" id="pageName">
        {pageName}
      </span>
      <span style={{ visibility: "hidden" }} className="uuid" id="uuid">
        {uuid}
      </span>
    </React.Fragment>
  );
};

export function clickToBlock() {
  document.addEventListener("click", (e) => {
    const html: any = e.target;
    const htmlContainer = html.parentNode.parentNode;

    if (html instanceof SVGElement) {
      return;
    }

    if (
      html.className === "VerticalAppointment-title" ||
      html.className === "HorizontalAppointment-title" ||
      html.className === "VerticalAppointment-time" ||
      html.className.includes("Appointment-appointment")
    ) {
      if (htmlContainer.className === "VerticalAppointment-container") {
        const pageName = htmlContainer.querySelector(".pageName").textContent;
        const uuid = htmlContainer.querySelector(".uuid").textContent;
        logseq.Editor.scrollToBlockInPage(pageName, uuid);
      } else {
        const pageName = html.querySelector(".pageName").textContent;
        const uuid = html.querySelector(".uuid").textContent;
        logseq.Editor.scrollToBlockInPage(pageName, uuid);
      }
    }
  });
}

export async function mapQueryData() {
  const query = await logseq.DB.datascriptQuery(`[
        :find (pull ?b [*])
        :where
               [?b :block/parent ?parent]
               [?b :block/properties ?p]
               [(get ?p :start-time) ?ty]
               (not [(get ?p :template)])
      ]`);

  let newQueryArr = [];

  for (let i of query) {
    const uuid = i[0]["uuid"]["$uuid$"];
    const blk = await logseq.Editor.getBlock(uuid, {
      includeChildren: true,
    });
    if (blk.page.journalDay) {
      const payload = {
        uuid: i[0].uuid.$uuid$,
        startTime: i[0].properties["start-time"],
        endTime: i[0].properties["end-time"],
        parentId: i[0].page.id,
        content: i[0].content.slice(0, i[0].content.indexOf("\nstart-time")),
      };
      newQueryArr.push(payload);
    }
  }

  let apptsArr = [];
  for (const r of newQueryArr) {
    const journalPage = await logseq.Editor.getPage(r.parentId);
    if (journalPage["journal?"] === false) {
      return;
    }

    // Construct all day
    if (r.startTime === "all-day") {
      const payload = {
        allDay: true,
        startDate: `${getCalTimeFormat(journalPage.journalDay)}`,
        endDate: `${getCalTimeFormat(journalPage.journalDay + 1)}`,
        title: getTitle(r.content, journalPage.originalName, r.uuid),
      };
      apptsArr.push(payload);
    } else {
      // Construct start and end time in the format YYYY-MM-DDTHH:MM
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
  }

  return apptsArr;
}
