import { ReactNode, useEffect, useMemo, useReducer, useState } from 'react';
import { DispatchEvent } from '../data/types/dispatchEvent.type';
import { EventType } from '../data/types/event.type';
import GlobalContext from './GlobalContext';

function savedEventsReducer(state: EventType[], { type, payload }: DispatchEvent) {
  switch (type) {
    case 'push':
      return [...state, payload];

    case 'update':
      return state.map(evt => evt.id === payload.id ? payload : evt);

    case 'delete':
      return state.filter(evt => evt.id !== payload.id);

    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];

  return parsedEvents;
}

export default function ContextWrapper({ children }: Readonly<{ children: ReactNode; }>) {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<null | number>(null);
  const [daySelected, setDaySelected] = useState<Date>(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | EventType>(null);
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  const obj = useMemo(() => ({
    monthIndex,
    setMonthIndex,
    smallCalendarMonth,
    setSmallCalendarMonth,
    daySelected,
    setDaySelected,
    showEventModal,
    setShowEventModal,
    dispatchCalEvent,
    savedEvents,
    selectedEvent,
    setSelectedEvent,
  }), [daySelected, monthIndex, savedEvents, selectedEvent, showEventModal, smallCalendarMonth]);

  return (
    <GlobalContext.Provider value={obj}>
      {children}
    </GlobalContext.Provider>
  );
}