import { memo, useMemo } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  day: Date;
  rowIdx: number;
}

const LOCALES_PARAMS = 'en-US';

export default memo(
  function Day({ day, rowIdx }: Readonly<Props>) {
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

    return (
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
      </Container>
    );
  }
)

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