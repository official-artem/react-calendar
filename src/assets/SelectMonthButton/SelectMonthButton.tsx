import { memo, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { DayContext } from '../../components/context/DayContext';

const Button = styled.button`
  
`

export default memo(
  function SelectMonthButton() {
    const { setCurrentDate, currentDate } = useContext(DayContext);
    
    const handleClick = useCallback(() => {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      
      setCurrentDate(new Date(currentYear, currentMonth - 1))
    }, [])

    return (
      <Button onClick={handleClick}>-</Button>
    );
  }
)