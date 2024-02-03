import styled from 'styled-components';

export default function CreateEventButton() {
  return (
    <EventButton>
      <span className="material-symbols-outlined">add</span>
      <CreateText>Create</CreateText>
    </EventButton>
  );
}

const EventButton = styled.button`
  border: 1px solid gray;
  padding: 0.5rem;
  border-radius: 9999px;
  display: flex;
  cursor: pointer;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06); 
  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const CreateText = styled.span`
  padding-left: 1.25rem;
  padding-right: 1.75rem;
`;