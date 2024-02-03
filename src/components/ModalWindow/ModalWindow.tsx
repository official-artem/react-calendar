import { memo, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DayContext } from '../context/DayContext';

const Background = styled.div`
  position: fixed;
  background-color: rgba(64, 61, 60, 0.8);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Window = styled.div`
  position: relative;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
`;

const LabelsContainer = styled.div`
  
`;

const CloseIcon = styled.button`
  position: absolute;
  content: '';
  background-image: url('/cross.icon.svg');
  width: 1.5rem;
  height: 1.5rem;
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: center;
  background-color: white;
  padding: 1rem;
  border-radius: 50%;
  top: -0.5rem;
  right: -0.5rem;
  transition: transform 0.2s ease-in;
  cursor: pointer;

  &:hover {
    transform: scale(1.2)
  }
`;

const InputLabel = styled.input`

`
export default memo(function ModalWindow() {
  const { setDay, day: selectedDay, setDays } = useContext(DayContext);
  const [formattedDate, setFormattedDate] = useState('');


  useEffect(() => {
    return setFormattedDate(() => {
      if (selectedDay?.day) {
        const date = new Date(selectedDay.day);

        const stringDay = date.toLocaleString('en-US', {day: '2-digit'})
        const stringMonth = date.toLocaleString('en-US', { month: 'long' });

        return (`${stringDay} ${stringMonth}`);
      }

      return ''
    });
  }, [selectedDay?.day]);

  const handleClick = () => {
    setDay(null)
  }

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDays([])
  }, [])

  return (
    <Background>
      <Window>
        <h1>{formattedDate}</h1>

        <LabelsContainer>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor='label'>
              <h3>Current tasks:</h3>
            </label>
            <InputLabel id='label' />
            <button>Add</button>
          </form>
          {selectedDay?.tasks.map(task => (
            <p key={task}>{task}</p>
          ))}
        </LabelsContainer >
        <CloseIcon onClick={handleClick} />
      </Window>
    </Background>
  );
});