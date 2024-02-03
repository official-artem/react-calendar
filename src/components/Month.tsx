import React from 'react';
import styled from 'styled-components';
import Day from './Day';

interface Props {
  month: Date[][];
}

export default function Month({ month }: Props) {
  return (
    <Container>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i}/>
          ))}
        </React.Fragment>
      ))}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;