import styled from 'styled-components';
import logo from '/calendar-icon.svg';
import { useCallback, useContext, useMemo } from 'react';
import GlobalContext from '../context/GlobalContext';
import DownloadJSON from './downloadJson';

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const formattedCurrentData = useMemo(() => {
    const currentYear = new Date().getFullYear();

    return new Date(currentYear, monthIndex).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [monthIndex]);

  const handlePrevMonth = useCallback(() => {
    setMonthIndex(monthIndex - 1);
  }, [monthIndex, setMonthIndex]);

  const handleNextMonth = useCallback(() => {
    setMonthIndex(monthIndex + 1);
  }, [monthIndex, setMonthIndex]);

  const handleReset = useCallback(() => {
    if (monthIndex === new Date().getMonth()) {
      console.log(1);
        setMonthIndex(monthIndex + Math.random())
        return;
    }

    setMonthIndex(new Date().getMonth())
  }, [monthIndex, setMonthIndex]);

  return (
    <Header>
      <Logo src={logo} alt='calendar' />
      <Title>Calendar</Title>
      
      <Container>
        <ArrowButton onClick={handlePrevMonth}>
          <ArrowIcon className="material-symbols-outlined">
            chevron_left
          </ArrowIcon>
        </ArrowButton>
        <TodayButton onClick={handleReset}>Today</TodayButton>
        <ArrowButton onClick={handleNextMonth}>
          <ArrowIcon className="material-symbols-outlined">
            chevron_right
          </ArrowIcon>
        </ArrowButton>
      </Container>

      <YearTitle>{formattedCurrentData}</YearTitle>

      <DownloadJSON />
    </Header>
  );
}

const Container = styled.div`
  display: flex;
`

const Header = styled.header`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between
`;



const Logo = styled.img`
  margin-right: 0.5rem;
  width: 3rem;
  height: 3rem;
`;

const Title = styled.h1`
  margin-right: 2.5rem;
  font-size: 1.25rem;
  color: #6b7280;
  font-weight: bold;
`;

const TodayButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #333030;
  border-radius: 0.5rem;
  color: #333030;
  cursor: pointer;
`;

const ArrowIcon = styled.span`
  cursor: pointer;
  color: #4b5563;
  margin-inline: 0.5rem;
`;

const YearTitle = styled.h2`
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #6b7280;
  width: 10rem;
`;

const ArrowButton = styled.button``;