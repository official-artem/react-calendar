import { useContext } from 'react';
import './App.css'
import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';
import ModalWindow from './components/ModalWindow/ModalWindow';
import { DayContext } from './components/context/DayContext';

function App() {
  const { day } = useContext(DayContext);

  return (
    <>
      <Header />

        <Calendar />

        {day && <ModalWindow />}
    </>
  )
}

export default App
