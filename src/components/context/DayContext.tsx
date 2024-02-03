import React, { 
  ReactNode, 
  createContext,
  useMemo,
  useState, 
} from 'react';
import { DayType } from '../../data/types/day.type';
import { useLocalStorage } from '../hooks/useLocalStorage';


interface State {
  day: DayType | null,
  currentDate: Date,
  updateDayTasks: () => void
  setDay: (item: DayType | null) => void
  setCurrentDate: (date: Date) => void
  days: DayType[];
  setDays: (v: DayType[]) => void
}

const initialState: State = {
  day: null,
  currentDate: new Date(),
  updateDayTasks: () => {},
  setDay: () => {},
  setCurrentDate: () => {},
  days: [],
  setDays: () => {}
}

export const DayContext = createContext(initialState);

interface Props {
  children: ReactNode
}

export const DayProvider: React.FC<Props> = ({ children }) => {
  const [day, setDay] = useState<DayType | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [days, setDays] = useLocalStorage<DayType[]>('key', [])

  const state: State = useMemo(() => ({
      day,
      currentDate,
      updateDayTasks: () => { },
      setDay,
      setCurrentDate,
      days,
      setDays
  }), [day, currentDate])

  return (
    <DayContext.Provider value={state}>
      {children}
    </DayContext.Provider>
  )
}