import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

export const callSettings = () => {
    const settings: SettingSchemaDesc[] = [
        {
            key: "startDayHour",
            type: "number",
            default: 8,
            title: "Day View's Start Time",
            description: "Default start time of the calendar in day view",
        },
        {
            key: "endDayHour",
            type: "number",
            default: 20,
            title: "Day View's Start Time",
            description: "Default end time of the calendar in day view",
        },
        {
            key: "defaultWidth",
            type: "number",
            default: 600,
            title: "Default width",
            description: "Sets the default width of the calendar view",
        },
    ];

    logseq.useSettingsSchema(settings);
};
