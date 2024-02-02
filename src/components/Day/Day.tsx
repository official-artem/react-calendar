import styled from 'styled-components';

const Container = styled.div`
  background-color: yellow;
  height: 100%;
  position: relative;
`

const DayIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-weight: bold;
`

export default function Day({ numberOfDay }: { numberOfDay: number }) {
return (
  <Container>
    <DayIcon>{numberOfDay}</DayIcon>
  </Container>
)
}