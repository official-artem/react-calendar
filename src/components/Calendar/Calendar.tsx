import { memo, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetArrayOfDays } from '../../utils/getDaysArray';
import EmptyDay from '../EmptyDay/EmptyDay';
import Day from '../Day/Day';
import { DayType } from '../../data/types/day.type';
import SelectMonthButton from '../../assets/SelectMonthButton/SelectMonthButton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DayContext } from '../context/DayContext';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 3rem auto;
  height: var(--calendar-height)
`;

const DayOfWeek = styled.div`
  background-color: #7c7c7c;
  padding: 1rem 0;
  text-align: center;
  border-inline: 0.5px solid #6b6b6b
`

const DayOfMonth = styled.div`
  text-align: center;
  border-right: 1px solid #6b6b6b;
  border-bottom: 1px solid #6b6b6b
`

const MonthInfo = styled.div`
  
`
export default memo(
  function Calendar() {
    const [daysInMonth, setDaysInMonth] = useLocalStorage<DayType[]>('days', []);
    const [selectedMonth, setSelectedMonth] = useState<string>('Month');
    const { days, setDays, currentDate } = useContext(DayContext);

    useEffect(() => {
      setSelectedMonth(currentDate.toLocaleString('en-US', { month: 'long' }));

      if (!days.length) {
        setDays(GetArrayOfDays(currentDate));
      }

    }, [currentDate, days, daysInMonth, setDays, setDaysInMonth]);
    console.log(1111)
    return (
      <>
        <MonthInfo>
          <SelectMonthButton />
          <SelectMonthButton />

          {selectedMonth}
        </MonthInfo>
        <Container className="calendar">
          <DayOfWeek>Sun</DayOfWeek>
          <DayOfWeek>Mon</DayOfWeek>
          <DayOfWeek>Tue</DayOfWeek>
          <DayOfWeek>Wed</DayOfWeek>
          <DayOfWeek>Thu</DayOfWeek>
          <DayOfWeek>Fri</DayOfWeek>
          <DayOfWeek>Sat</DayOfWeek>

          {days.map((item) => {
            if (!item.day) {
              return (
                <DayOfMonth key={item.id}><EmptyDay /></DayOfMonth>
              );
            }

            return (
              <DayOfMonth key={item.id}>
                <Day selectedDay={item} />
              </DayOfMonth>
            );
          })}
        </Container>
      </>
    );
  }
)