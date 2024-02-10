import { Dispatch, SetStateAction, createContext } from 'react';
import { DispatchEvent } from '../data/types/dispatchEvent.type';
import { EventType } from '../data/types/event.type';
import { SidebarLabel } from '../data/types/label.type';

interface State {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  smallCalendarMonth: number | null;
  setSmallCalendarMonth: React.Dispatch<React.SetStateAction<null | number>>;
  daySelected: Date;
  setDaySelected: React.Dispatch<React.SetStateAction<Date>>;
  showEventModal: boolean;
  setShowEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchCalEvent: React.Dispatch<DispatchEvent>;
  savedEvents: EventType[],
  selectedEvent: null | EventType;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventType | null>>
  labels: SidebarLabel[];
  setLabels: React.Dispatch<React.SetStateAction<SidebarLabel[]>>;
  filteredEvents: EventType[];
  currentMonth: Date[][];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date[][]>>;
}

const GlobalContext = createContext<State>({
  monthIndex: 0,
  setMonthIndex: () => { },
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => { },
  daySelected: new Date(),
  setDaySelected: () => { },
  showEventModal: false,
  setShowEventModal: () => { },
  dispatchCalEvent: () => { },
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  labels: [],
  setLabels: () => {},
  filteredEvents: [],
  currentMonth: [],
  setCurrentMonth: () => {},
})

export default GlobalContext;