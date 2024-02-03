import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css';
import { DayProvider } from './components/context/DayContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DayProvider>
    <App />
  </DayProvider>
)
