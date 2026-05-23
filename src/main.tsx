import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.tsx';
import { ProgramOfEvent } from './pages/ProgramOfEvent.tsx';
import { CeremonyDetails } from './CeremonyDetails.tsx';
import { GiftRegistry } from './pages/GiftRegistry.tsx';
import { Gallery } from './pages/Gallery.tsx';
import { DiningMenu } from './pages/DiningMenu.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/program-of-event' element={<ProgramOfEvent />} />
          <Route path='/ceremony-details' element={<CeremonyDetails />} />
          <Route path='/gift-registry' element={<GiftRegistry />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/dining-menu' element={<DiningMenu />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
