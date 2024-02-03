import { memo, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DayContext } from '../context/DayContext';
import { DayType } from '../../data/types/day.type';

const Container = styled.div`
  background-color: yellow;
  height: 100%;
  position: relative;
  cursor: pointer;
`

const DayIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-weight: bold;
`

interface Props {
  selectedDay: DayType
}

export default memo(
  function Day({ selectedDay }: Readonly<Props>) {
    const { setDay } = useContext(DayContext);
    const [numberOfDay, setNumberOfDay] = useState(0);


    const handleClick = useCallback(() => {
      setDay(selectedDay);
    }, [selectedDay, setDay])

    useEffect(() => {
      if (selectedDay?.day) {
        setNumberOfDay(new Date(selectedDay.day).getDate());
      }
    }, [selectedDay.day]);

    return (
      <Container onClick={handleClick}>
        <DayIcon>{numberOfDay}</DayIcon>
      </Container>
    );
  }
)