import React, { useContext, useEffect, useState } from 'react';
import './App.css'
import { getMonth } from './utils/utils';
import styled from 'styled-components';
import SideBar from './components/Sidebar';
import Month from './components/Month';
import CalendarHeader from './components/CalendarHeader';
import GlobalContext from './context/GlobalContext';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

useEffect(() => {
  setCurrentMonth(getMonth(monthIndex))
}, [monthIndex])

  return (
    <React.Fragment>
      <MainContainer>
        <CalendarHeader />
        <CalendarContainer>
          <SideBar />
          <Month month={currentMonth}/>
        </CalendarContainer>
      </MainContainer>
    </React.Fragment>
  )
}

export default App

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex: 1;
`;