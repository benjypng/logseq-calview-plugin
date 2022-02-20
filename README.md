# Overview

This plugin offers a calendar from within Logseq that captures your blocks with event parameters in a calendar view. The below views are available:

- Daily
- Weekly
- Monthly

# Usage

Events are picked up by the calendar as long as they have block properties containing `start-time` and `end-time`, and times must be in 24-hr format. When used together with the [logseq-datenlp-plugin](https://github.com/hkgnp/logseq-datenlp-plugin), you can trigger the appropriate syntax by turning on `semi auto-parsing` and triggering it by including `@from` in your sentence. E.g. `Go to the gym @from 8am to 12pm`. This will automatically produce the below template:

```
Go to the gym
start-time:: 08:00
end-time:: 12:00
```

# Customising the Start and End Hour of the Day

By default, the calendar starts the day at 8am and ends the day at 8pm. If you want to change this, make the following changes to your plugin settings, and restart Logseq. The example below assumes your calendar starts at 7am and ends at 9pm.

```
{
    "startEndHour": {
        "startDayHour": 7,
        "endDayHour": 21
    }
}
```

# Installation

If not available from the marketplace, please [download the latest release](https://github.com/hkgnp/logseq-calview-plugin) and manually load it into Logseq after unzipping the file.

# Credits

[React-Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler/)
