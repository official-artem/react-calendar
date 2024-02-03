import { DayType } from '../data/types/day.type';

export function GetArrayOfDays(date: Date): DayType[] {
  const currentDate = date;
  const currentMonth = currentDate.getUTCMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonthArray: DayType[] = [];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  for (let i = 0; i < firstDay; ++i) {
    daysInMonthArray.unshift({
      day: null,
      id: crypto.randomUUID(),
      labels: [],
      tasks: [],
    });
  }

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  for (let day = 1; day <= lastDayOfMonth; ++day) {
    daysInMonthArray.push({
      day: new Date(currentYear, currentMonth, day, 2),
      id: crypto.randomUUID(),
      labels: [],
      tasks: []
    });
  }

  return daysInMonthArray;
}