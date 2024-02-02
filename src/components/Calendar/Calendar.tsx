import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetArrayOfDays } from '../../utils/getDaysArray';
import EmptyDay from '../EmptyDay/EmptyDay';
import Day from '../Day/Day';
import { DayType } from '../../data/types/day.type';


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
export default function Calendar() {
  const [daysInMonth, setDaysInMonth] = useState<DayType[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    
    setDaysInMonth(GetArrayOfDays(currentDate))
  }, []);

  return (
    <Container className="calendar">
        <DayOfWeek>Sun</DayOfWeek>
        <DayOfWeek>Mon</DayOfWeek>
        <DayOfWeek>Tue</DayOfWeek>
        <DayOfWeek>Wed</DayOfWeek>
        <DayOfWeek>Thu</DayOfWeek>
        <DayOfWeek>Fri</DayOfWeek>
        <DayOfWeek>Sat</DayOfWeek>

    {daysInMonth.map(({ day, id }) => {
      if (!day) {
        return (
          <DayOfMonth key={id}><EmptyDay /></DayOfMonth>
        )
      }

      return (
        <DayOfMonth key={id}>
          <Day numberOfDay={day} />
        </DayOfMonth>
      )
    })}
    </Container>
  );
}