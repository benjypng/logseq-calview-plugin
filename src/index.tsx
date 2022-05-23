import "@logseq/libs";
import { handleClosePopup } from "./handleClosePopup";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { callSettings } from "./callSettings";

const main = async () => {
  console.log("logseq-calview-plugin loaded.");

  handleClosePopup();

  callSettings();

  window.setTimeout(async () => {
    const userConfigs = await logseq.App.getUserConfigs();

    logseq.updateSettings({
      preferredDateFormat: userConfigs.preferredDateFormat,
      preferredThemeMode: userConfigs.preferredThemeMode,
    });

    console.log(
      `Settings updated to ${userConfigs.preferredDateFormat} and theme mode is ${userConfigs.preferredThemeMode}`
    );
  }, 1000);

  let state = false;
  logseq.provideModel({
    async show() {
      const setTheme = createTheme({
        palette: {
          mode: logseq.settings.preferredThemeMode,
        },
      });

      if (state === false) {
        state = true;
      } else {
        state = false;
      }
      console.log(state);

      ReactDOM.render(
        <React.StrictMode>
          <ThemeProvider theme={setTheme}>
            <App
              state={state}
              preferredThemeMode={logseq.settings.preferredThemeMode}
            />
          </ThemeProvider>
        </React.StrictMode>,
        document.getElementById("app")
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
