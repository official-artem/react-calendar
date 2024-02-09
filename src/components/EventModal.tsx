import { useCallback, useContext, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import GlobalContext from '../context/GlobalContext';
import { labels } from '../data/labels';
import { EventType } from '../data/types/event.type';
import { DispatchEvent } from '../data/types/dispatchEvent.type';
import { Label as LabelType} from '../data/types/label.type';

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent
  } = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
  const [selectedLabel, setSelectedLabel] = useState<LabelType>(() => {
    if (selectedEvent) {
      labels.find(label => label.title === selectedEvent.label.title);
    }

    return labels[0];
  });

  const handleClickClose = useCallback(() => {
    setShowEventModal(false);
    setSelectedEvent(null)
  }, [setSelectedEvent, setShowEventModal]);

  const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setTitle(value);
  }, []);

  const handleChangeDescription = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setDescription(value);
  }, []);

  const formattedDate = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };

    const value = daySelected?.toLocaleDateString('en-US', options);

    return value;
  }, [daySelected]);

  const handleSelectLabel = useCallback((label: LabelType) => {
    setSelectedLabel(label);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const calendarEvent: EventType = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.getTime(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    console.log(new Date(+calendarEvent.id))
    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }

    setShowEventModal(false);
  }, [
    daySelected,
    description,
    dispatchCalEvent,
    selectedEvent,
    selectedLabel,
    setShowEventModal,
    title
  ]);

  const handleDeleteEvent = useCallback((event: DispatchEvent) => {
    dispatchCalEvent(event);
    setShowEventModal(false);
  }, [dispatchCalEvent, setShowEventModal]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Icon className='material-symbols-outlined'>
            drag_handle
          </Icon>
          <div>
            {selectedEvent && (
              <Icon
                onClick={() => handleDeleteEvent({ type: 'delete', payload: selectedEvent })}
                className='material-symbols-outlined'
              >
                delete
              </Icon>
            )}
            <button onClick={handleClickClose}>
              <Icon className='material-symbols-outlined'>
                close
              </Icon>
            </button>
          </div>
        </Header>
        <BodyModal>
          <GridContainer>
            <div></div>
            <Input
              type='text'
              name='title'
              placeholder='Add title'
              required
              onChange={handleChangeTitle}
              value={title}
              $inputType={'title'}
            />
            <Icon className='material-symbols-outlined'>
              schedule
            </Icon>
            <CurrentDay>{formattedDate}</CurrentDay>
            <Icon className='material-symbols-outlined'>
              segment
            </Icon>
            <Input
              type='text'
              name='title'
              placeholder='Add a description'
              onChange={handleChangeDescription}
              value={description}
            />
            <Icon className='material-symbols-outlined'>
              bookmark_border
            </Icon>
            <LabelContainer>
              {labels.map((label) => (
                <Label onClick={() => handleSelectLabel(label)} key={label.id} $color={label.hexFormat}>

                  {selectedLabel.hexFormat === label.hexFormat && (
                    <Icon className='material-symbols-outlined' $labelStyles={true}>
                      check
                    </Icon>
                  )}
                </Label>
              ))}
            </LabelContainer>
          </GridContainer>
        </BodyModal>
        <Footer>
          <FooterButton type="submit">Save</FooterButton>
        </Footer>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 25%;
`;

const Header = styled.header`
  background-color: #f7fafc;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.span<{ $labelStyles?: boolean; }>`
  color: #cbd5e0;
  cursor: pointer;

  ${(props) => props.$labelStyles && css`
    color: #fff;
    font-size: 0.875rem;
  `}
`;

const BodyModal = styled.div`
  padding: 0.75rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: center;
  gap: 1.75rem;
`;

const Input = styled.input<{ $inputType?: string; }>`
  padding: 0.75rem;
  border: 0;
  color: #4a5568;
  padding-bottom: 0.5rem;
  width: 100%;
  border-bottom: 0.25rem solid;
  border-color: #edf2f7;

  ${(props) => props.$inputType && css`
    font-weight: 600;
    font-size: 1.25rem;
  `}
  
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const CurrentDay = styled.p``;

const LabelContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

const Label = styled.span<{ $color: string; }>`
  background-color: ${props => props.$color};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  justify-content: end;
  border-top: 1px solid #d6dde4;
  padding: 0.75rem;
  margin-top: 1.25rem;
`;

const FooterButton = styled.button`
  background-color: #4299e1;
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  color: #fff;

  &:hover {
    background-color: #2c5282;
  }
`;