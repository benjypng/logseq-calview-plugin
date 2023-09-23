import { BlockEntity } from "@logseq/libs/dist/LSPlugin.user";
import { EventObject } from "@toast-ui/calendar/types/types/events";

const getYYYYMMDD = (journalDayInNumber: number) => {
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

const constructEventTime = async (
  blk: BlockEntity,
  journalDay: number,
): Promise<{ start: string; end: string } | undefined> => {
  const yearmonthday = getYYYYMMDD(journalDay);
  return {
    start: `${yearmonthday}T${blk.properties!["start-time"]}`,
    end: `${yearmonthday}T${blk.properties!["end-time"]}`,
  };
};

export const findEvents = async (): Promise<EventObject[] | undefined> => {
  const query = await logseq.DB.datascriptQuery(`[
        :find (pull ?b [*])
        :where
               [?b :block/page ?page]
               [?page :block/journal? true]
               [?b :block/parent ?parent]
               [?b :block/properties ?p]
               [(get ?p :start-time) ?ty]
               (not [(get ?p :template)])
      ]`);
  // Cannot use map because of a promise
  // Query arr is a Block in an Array
  let queryArr: Partial<EventObject>[] = [];
  for (const q of query) {
    if (!q[0]) throw new Error("No blocks found in query");

    const page = await logseq.Editor.getPage(q[0].page.id);
    if (!page || !page.journalDay) continue;

    if (page.journalDay) {
      queryArr.push({
        id: q[0].uuid,
        title: q[0].content
          .substring(0, q[0].content.indexOf("start-time::"))
          .trim(),
        start: (await constructEventTime(q[0], page.journalDay))?.start + ":00",
        end: (await constructEventTime(q[0], page.journalDay))?.end + ":00",
        isAllDay: q[0].properties!["start-time"] === "all-day",
      });
    }
  }
  return queryArr;
};
