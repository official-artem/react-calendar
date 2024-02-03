import { ReactNode, useState } from 'react';
import GlobalContext from './GlobalContext';
export default function ContextWrapper({ children }: { children: ReactNode; }) {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex}}>
      {children}
    </GlobalContext.Provider>
  );
}