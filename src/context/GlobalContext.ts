import { Dispatch, SetStateAction, createContext } from 'react';

interface State {
  monthIndex: number,
  setMonthIndex: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<State>({
  monthIndex: 0,
  setMonthIndex: () => {}
})

export default GlobalContext;