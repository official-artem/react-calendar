import React, { useContext, useEffect } from 'react';
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
import { EventType } from './data/types/event.type';

function App() {
  const { monthIndex, currentMonth, setCurrentMonth, showEventModal, savedEvents, dispatchCalEvent } = useContext(GlobalContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnDragEnd = (result: any) => {
    const { destination, draggableId } = result;

    const selectedEvent = savedEvents.find(event => event.id === +(draggableId)) as EventType;

      const payload: DispatchEvent = {
        type: 'move', destIndex: +(destination.index),
        payload: {
          ...selectedEvent, day: +destination.droppableId
        }
      };

      console.log(result)

      dispatchCalEvent(payload);
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