import "@logseq/libs";
import { createRoot } from "react-dom/client";

import { handleClosePopup } from "./handleClosePopup";
import { CalendarApp } from "./CalendarApp";

const main = async () => {
  console.log("logseq-calview-plugin loaded.");

  handleClosePopup();

  window.setTimeout(async () => {
    const userConfigs = await logseq.App.getUserConfigs();
    logseq.updateSettings({
      preferredDateFormat: userConfigs.preferredDateFormat,
      preferredThemeMode: userConfigs.preferredThemeMode,
    });
    console.log(
      `Settings updated to ${userConfigs.preferredDateFormat} and theme mode is ${userConfigs.preferredThemeMode}`,
    );
  }, 1000);

  logseq.provideModel({
    async show() {
      createRoot(document.getElementById("app") as HTMLElement).render(
        <CalendarApp />,
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
