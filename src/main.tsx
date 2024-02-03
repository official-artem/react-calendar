import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css';
import ContextWrapper from './context/ContextWrapper.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ContextWrapper>
      <App />
    </ContextWrapper>
)
