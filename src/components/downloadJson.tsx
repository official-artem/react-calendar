import styled from 'styled-components';
import { downloadJsonFile } from '../utils/downloadJSON';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { toArrayDates, toStringDates } from '../utils/purseDataArray';


export default function DownloadJSON() {
  const { currentMonth, setCurrentMonth, savedEvents, dispatchCalEvent } = useContext(GlobalContext);

  const handleCLick = () => {
    const jsonMonth = toStringDates(currentMonth, savedEvents);

    downloadJsonFile(JSON.stringify(jsonMonth), 'Calendar');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target?.result;

      if (typeof contents !== 'string') {
        return;
      }

      const [events, month] = toArrayDates(contents);

      setCurrentMonth(month);
      dispatchCalEvent({
        type: 'import',
        events: events,
        payload: {
          id: 0,
          index: 0,
          title: '',
          label: {id: 0, title: '', hexFormat: ''},
          description: '',
          day: 0,
        }
      });
    };

    reader.readAsText(file);
  };

  return (
    <Container>
      <ButtonDownload onClick={handleCLick}>Export</ButtonDownload>
      <ImportLabel htmlFor='file-upload'>
        Import
        <ImportInput type="file" accept=".json" onChange={handleFileChange} id="file-upload" />
      </ImportLabel>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1rem;
`

const ButtonDownload = styled.button`
  margin-left: 2rem;
  border: 2px solid #585858;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ImportLabel = styled.label`
  cursor: pointer;
  border: 2px solid #585858;
  border-radius: 0.5rem;
  padding: 0.25rem;
`

const ImportInput = styled.input`
display: none`

