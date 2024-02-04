import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { getMonth } from '../utils/utils';
import GlobalContext from '../context/GlobalContext';

const LOCALES_OPTION = 'en-US';

export default function SmallCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  const currentDate = useMemo(() => {
    const currentDate = new Date(new Date().getFullYear(), currentMonthIndex);
    return currentDate.toLocaleDateString(LOCALES_OPTION, { month: 'long', year: 'numeric' });
  }, [currentMonthIndex]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  }, [currentMonthIndex]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  }, [currentMonthIndex]);

  const getDayClass = useCallback((day: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    };
    const nowDay = new Date().toLocaleDateString(LOCALES_OPTION, options);
    const currDay = day.toLocaleDateString(LOCALES_OPTION, options);
    const selectedDay = daySelected?.toLocaleDateString(LOCALES_OPTION, options);

    if (nowDay === currDay) {
      return 'one';
    } else if (currDay == selectedDay)
      return 'two';
  }, [daySelected]);

  const handleDayCLick = (day: Date) => {
    setSmallCalendarMonth(currentMonthIndex);
    setDaySelected(day);
  };

  return (
    <Container>
      <Header>
        <Title>
          {currentDate}
        </Title>
        <ArrowsContainer>
          <button onClick={handlePrevMonth}>
            <Icon className="material-symbols-outlined">
              chevron_left
            </Icon>
          </button>
          <button onClick={handleNextMonth}>
            <Icon className="material-symbols-outlined">
              chevron_right
            </Icon>
          </button>
        </ArrowsContainer>
      </Header>
      <CalendarContainer>
        {currentMonth[0].map((day, idx) => (
          <Day key={idx}>
            {day.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
          </Day>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <RowButton
                key={idx}
                $selected={getDayClass(day)}
                onClick={() => handleDayCLick(day)}
              >
                <Row>{day.toLocaleDateString('en-US', { day: '2-digit' })}</Row>
              </RowButton>
            ))}
          </React.Fragment>
        ))}
      </CalendarContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2.25rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  color: #a0aec0;
  font-weight: bold;
`;

const Icon = styled.span`
  cursor: pointer;
  color: #718096;
  margin: 0 0.25rem;
`;

const ArrowsContainer = styled.div``;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const Day = styled.span`
  font-size: 0.875rm;
  padding: 0.25rem;
  text-align: center
`;

const RowButton = styled.button<{ $selected?: string; }>`
  padding: 0.5rem 0;
  width: 100%;
  cursor: pointer;

  ${(props) => props.$selected === 'one' && css`
    background-color: #4299e1;
    border-radius: 9999px;
    color: #fff;
  `}
  ${(props) => props.$selected === 'two' && css`
    background-color: #ebf8ff;
    border-radius: 9999px;
    color: #3182ce;
    font-weight: bold;
  `}
`;

const Row = styled.span`
  font-size: 0.875rem;
`;