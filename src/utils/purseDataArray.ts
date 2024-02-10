import { EventType } from './../data/types/event.type';

interface JsonDay {
  day: number;
  events: EventType[];
}

type JsonBody = JsonDay[][];

export function toStringDates(arr: Date[][], savedEvents: EventType[]) {
  const copiedObject = structuredClone(arr)
    .map(week => {
      return week.map(day => {
        const date = new Date(day).getTime();
        const events = savedEvents.filter(event => event.day === date);

        return {
          day: date,
          events,
        };
      });
    });

  return JSON.stringify(copiedObject);
}

export function toArrayDates(dto: string): [EventType[], Date[][]] {
  const parsedMonth: JsonBody = JSON.parse(JSON.parse(dto));


  const events: EventType[] = [];
  parsedMonth.forEach(week => week.forEach(day => events.push(...day.events)));

  const month: Date[][] = parsedMonth.map(week => week.map(day => new Date(+day.day)));

  return [events, month];
}