import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { DayContext } from '../context/DayContext';
import { Background, CloseIcon, InputLabel, LabelsContainer, Window } from './ModalWindow';

export default memo(function ModalWindow() {
  const { setDay, day: selectedDay } = useContext(DayContext);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    return setFormattedDate(() => {
      if (selectedDay?.day) {
        const date = new Date(selectedDay.day);

        const stringDay = date.toLocaleString('en-US', { day: '2-digit' });
        const stringMonth = date.toLocaleString('en-US', { month: 'long' });

        return (`${stringDay} ${stringMonth}`);
      }

      return '';
    });
  }, []);

  const handleClick = () => {
    setDay(null);
  };

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedDay) {
      setDay(selectedDay?.tasks.push(String(e.currentTarget.value)));
    }
  }, []);

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
        </LabelsContainer>
        <CloseIcon onClick={handleClick} />
      </Window>
    </Background>
  );
});
