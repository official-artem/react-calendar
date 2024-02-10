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
        payload: []
      });
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <ButtonDownload onClick={handleCLick}>Export</ButtonDownload>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
}

const ButtonDownload = styled.button`
margin-left: 2rem;
  border: 2px solid #585858;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

