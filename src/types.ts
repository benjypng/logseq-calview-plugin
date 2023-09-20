import { EventObject } from "@toast-ui/calendar/types/types/events";

export type settings = {
  preferredDateFormat: string;
  preferredThemeMode: string;
};

export type CalendarProps = {
  allEvents: EventObject[];
};
