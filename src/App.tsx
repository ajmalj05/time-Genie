import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WorldTime from './WorldTime';
import CountryDetails from './CountryDetails';
import ClockPage from './ClockPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WorldTime />} />
      <Route path="/country/:countryName" element={<CountryDetails />} />
      <Route path="/clock" element={<ClockPage />} />
    </Routes>
  );



export default App;