import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import GlobalContext from '../context/GlobalContext';
import { EventType } from '../data/types/event.type';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  day: Date;
  rowIdx: number;
}

const LOCALES_PARAMS = 'en-US';
const EVENT_FORMAT: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: '2-digit'
}

export default memo(
  function Day({ day, rowIdx }: Readonly<Props>) {
    const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext);
    const [dayEvents, setDayEvents] = useState<EventType[]>([]);

    useEffect(() => {
      const events = filteredEvents.filter(evt => {
        const formattedValue = new Date(evt.day).toLocaleDateString(LOCALES_PARAMS, EVENT_FORMAT);
        const formattedDay = day.toLocaleDateString(LOCALES_PARAMS, EVENT_FORMAT);

        return formattedDay === formattedValue;
      });

      setDayEvents(events);
    }, [day, filteredEvents]);

    const getCurrentDay = useMemo(() => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      return new Date(currentYear, currentMonth, currentDay).getTime() === new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).getTime();
    }, [day])

    const formattedDate = useMemo(() => {
      const dayOfWeek = day.toLocaleDateString(LOCALES_PARAMS, { weekday: 'short' }).toUpperCase();
      const dayOfMonth = day.toLocaleDateString(LOCALES_PARAMS, { day: '2-digit' });

      return { dayOfWeek, dayOfMonth };
    }, [day]);

    const handleCLick = useCallback(() => {
      setDaySelected(day);
      setShowEventModal(true);
    }, [day, setDaySelected, setShowEventModal])

    return (
      <Droppable droppableId={String(day.getTime())}>
        {(provided) => (
            <Container>
          <Header>
            {rowIdx === 0 && (
              <Title>
                {formattedDate.dayOfWeek}
              </Title>
            )}
            <DayText $selected={getCurrentDay}>
              {formattedDate.dayOfMonth}
            </DayText>
          </Header>
            <Div ref={provided.innerRef} {...provided.droppableProps} onClick={handleCLick}>
            {dayEvents.map((event, index) => (
              <Draggable key={event.id} draggableId={String(event.id)} index={index}>
                {(provided) => (
                  <Event
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => setSelectedEvent(event)}
                    $bgColor={event.label.hexFormat}
                  >
                    {event.title}
                  </Event>
                )}
              </Draggable>
            ))}
          </Div>
        {provided.placeholder}
          </Container>
    )}
      </Droppable >
    );
  }
)

const Event = styled.div<{ $bgColor: string; }>`
  background-color: ${(props) => props.$bgColor};
  padding: 0.25rem;
  margin-right: 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
  margin: 0 auto;
`;

const Div = styled.div`
  flex: 1;
  cursor: pointer;
  overflow: hidden
`

const Container = styled.div`
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
`;

const DayText = styled.text<{ $selected?: boolean }>`
  font-size: 0.875rem;
  padding: 0.25rem;
  text-align: center;

  ${(props) => props.$selected && css`
    background-color: #2563eb;
    color: #fff;
    border-radius: 9999px;
    width: 1.75rem;
  `}
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;