
import styled from 'styled-components';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';

export default function SideBar() {
  return (
    <AsideContainer>
      <CreateEventButton />
      <SmallCalendar />
    </AsideContainer>
  );
}

const AsideContainer = styled.aside`
  border: 1px solid;
  padding: 1.25rem;
  width: 16rem;
`;