
import styled from 'styled-components';
import CreateEventButton from './CreateEventButton';

export default function SideBar() {
  return (
    <AsideContainer>
      <CreateEventButton />
    </AsideContainer>
  );
}

const AsideContainer = styled.aside`
  border: 1px solid;
  padding: 1.25rem;
  width: 16rem;
`;