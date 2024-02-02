import styled from 'styled-components';

const Container = styled.header`
  height: var(--header-height);
`;

export default function Header() {
  
  return (
    <Container>
      React-Calendar
    </Container>
  )
}