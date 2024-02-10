import { ReactNode, useEffect, useMemo, useReducer, useState } from 'react';
import { DispatchEvent } from '../data/types/dispatchEvent.type';
import { EventType } from '../data/types/event.type';
import GlobalContext from './GlobalContext';
import { SidebarLabel } from '../data/types/label.type';

function savedEventsReducer(state: EventType[], { type, payload, destIndex }: DispatchEvent) {
  switch (type) {
    case 'push':
      return [...state, payload];

    case 'update':
      return state.map(evt => evt.id === payload.id ? payload : evt);

    case 'delete':
      return state.filter(evt => evt.id !== payload.id);

    case 'move':
      {
        if (destIndex === undefined) {
          console.log(1);
          return [...state]
        }

        const updated = [...state];
        updated.filter(event => event.id !== payload.id);
        updated.splice(destIndex, 0, payload);
        
        return updated;
      }

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
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [labels, setLabels] = useState<SidebarLabel[]>([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents);
  const filteredEvents = useMemo(() => {
    return savedEvents.filter(evt =>
      labels
        .filter(lbl => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label.title));
  }, [labels, savedEvents])

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map(evt => evt.label.title))]
        .map(label => {
          const currentLabel = prevLabels.find(lbl => lbl.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true
          };
        });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) setSelectedEvent(null)
  }, [showEventModal])

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
    labels,
    setLabels,
    filteredEvents
  }), [
    daySelected, 
    filteredEvents, 
    labels, 
    monthIndex, 
    savedEvents, 
    selectedEvent, 
    showEventModal, 
    smallCalendarMonth
  ]);

  return (
    <GlobalContext.Provider value={obj}>
      {children}
    </GlobalContext.Provider>
  );
}