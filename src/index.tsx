import "@logseq/libs";
import { createRoot } from "react-dom/client";

import { handleClosePopup } from "./utils/handleClosePopup";
import { CalendarApp } from "./features/CalendarApp";
import { findEvents } from "./features/libs";

const main = async () => {
  console.log("logseq-calview-plugin loaded.");

  handleClosePopup();

  setTimeout(async () => {
    const userConfigs = await logseq.App.getUserConfigs();
    logseq.updateSettings({
      preferredDateFormat: userConfigs.preferredDateFormat,
      preferredThemeMode: userConfigs.preferredThemeMode,
    });
    console.log(
      `logseq-calview-plugin: Settings updated to ${userConfigs.preferredDateFormat} and theme mode is ${userConfigs.preferredThemeMode}`,
    );
  }, 1000);

  logseq.provideModel({
    async show() {
      const allEvents = await findEvents();
      if (!allEvents) {
        await logseq.UI.showMsg("No events found", "error");
        return;
      }
      createRoot(document.getElementById("app") as HTMLElement).render(
        <CalendarApp allEvents={allEvents} />,
      );
      logseq.showMainUI();
    },
  });

  // Register UI
  logseq.App.registerUIItem("toolbar", {
    key: "logseq-calview-plugin",
    template: `
            <a data-on-click="show" class="button">
              <i class="ti ti-calendar-time"></i>
            </a>
      `,
  });
};

logseq.ready(main).catch(console.error);
