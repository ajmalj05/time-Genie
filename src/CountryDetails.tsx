import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ArrowLeft, MapPin, Globe2, Users, Building2, Languages, Coins, Info } from 'lucide-react';
import { countries } from './data/countries';
import Layout from './components/Layout';

const CountryDetails = () => {
  const { countryName } = useParams();
  const country = countries.find(c => c.name === countryName);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getLocalTime = () => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * country!.offset));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  if (!country) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Country not found</h1>
            <Link to="/" className="text-blue-500 hover:underline">
              Go back home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to World Time
      </Link>

      {/* Country Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            className="w-20 h-14 object-cover rounded-lg shadow"
          />
          <div>
            <h1 className="text-3xl font-bold">{country.name}</h1>
            <p className="text-gray-600">{formatTime(getLocalTime())}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Capital</p>
              <p className="font-medium">{country.capital}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Population</p>
              <p className="font-medium">{country.population}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">States/Regions</p>
              <p className="font-medium">{country.states}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Languages</p>
              <p className="font-medium">{country.languages.join(', ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Coins className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Currency</p>
              <p className="font-medium">{country.currency}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe2 className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Time Zone</p>
              <p className="font-medium">UTC{country.offset >= 0 ? '+' : ''}{country.offset}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold">Interesting Facts</h2>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {country.facts.map((fact, index) => (
              <li key={index} className="text-gray-700">{fact}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Calendar & Holidays</h2>
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={country.holidays}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CountryDetails;