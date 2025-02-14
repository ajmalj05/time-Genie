import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WorldTime from './WorldTime';
import CountryDetails from './CountryDetails';
import ClockPage from './ClockPage';
import CalendarPage from './pages/CalendarPage';
import TimezoneDifference from './pages/TimezoneDifference';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WorldTime />} />
      <Route path="/country/:countryName" element={<CountryDetails />} />
      <Route path="/clock" element={<ClockPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/timezone-difference" element={<TimezoneDifference />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;