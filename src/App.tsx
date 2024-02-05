import React, { useContext, useEffect, useState } from 'react';
import './App.css'
import { getMonth } from './utils/utils';
import styled from 'styled-components';
import SideBar from './components/Sidebar';
import Month from './components/Month';
import CalendarHeader from './components/CalendarHeader';
import GlobalContext from './context/GlobalContext';
import { DragDropContext } from 'react-beautiful-dnd';
import EventModal from './components/EventModal';
import { DispatchEvent } from './data/types/dispatchEvent.type';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, savedEvents, dispatchCalEvent } = useContext(GlobalContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnDragEnd = (result: any) => {
    const { destination, draggableId } = result;

  const calendarEvent = savedEvents.find(event => event.id === +(draggableId))

  if (!calendarEvent) {
    return;
  }

    const payload: DispatchEvent = { type: 'update', payload: {
      ...calendarEvent, day: +destination.droppableId
    } }

    dispatchCalEvent(payload);

    // if (!destination || source.droppableId === destination.droppableId) {
    //   return;
    // }
  }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <MainContainer>
        <CalendarHeader />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <CalendarContainer>
            <SideBar />
            <Month month={currentMonth} />
          </CalendarContainer>
        </DragDropContext>
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