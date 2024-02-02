import { DayType } from '../data/types/day.type';

export function GetArrayOfDays(date: Date): DayType[] {
  const currentDate = date;
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonthArray: DayType[] = Array.from(
    { length: new Date(currentYear, currentMonth + 1, 0).getDate() },
    (_, index) => ({
      day: index + 1,
      id: crypto.randomUUID(),
    })
  );

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  for (let i = 0; i < firstDay; ++i) {
    daysInMonthArray.unshift({
      day: null,
      id: crypto.randomUUID(),
    });
  }

  return daysInMonthArray;
}