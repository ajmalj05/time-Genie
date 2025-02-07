import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Bell, Search, Filter } from 'lucide-react';
import { countries } from './data/countries';
import Layout from './components/Layout';

const WorldTime = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [alarms, setAlarms] = useState<Array<{ time: string; country: string }>>([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      checkAlarms();
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms]);

  // Format time with hours and minutes
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get time for a specific country based on UTC offset
  const getCountryTime = (offset: number) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };

  // Calculate time difference between two countries
  const getTimeDifference = (offset1: number, offset2: number) => {
    return Math.abs(offset1 - offset2);
  };

  // Toggle sound notifications
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  // Filter countries based on search and continent
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = selectedContinent === 'All' ? true : country.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  // Check alarms
  const checkAlarms = () => {
    if (!soundEnabled) return;
    
    const currentTimeStr = formatTime(currentTime);
    alarms.forEach(alarm => {
      if (alarm.time === currentTimeStr) {
        playAlarmSound();
        alert(`Alarm for ${alarm.country}: ${alarm.time}`);
      }
    });
  };

  // Play alarm sound
  const playAlarmSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
  };

  return (
    <Layout
      soundEnabled={soundEnabled}
      onToggleSound={toggleSound}
      showAlarmButton={true}
      onAlarmClick={() => setShowAlarmModal(true)}
    >
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              className="py-2 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
            >
              <option value="All">All Continents</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
      </div>

      {/* Current Time Display */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 cursor-pointer" onClick={() => navigate('/clock')}>
        <div className="flex items-center space-x-4 mb-4">
          <Clock className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Current Time</h2>
        </div>
        <div className="text-4xl font-mono font-bold text-gray-800">
          {formatTime(currentTime)}
        </div>
        <p className="text-sm text-blue-500 mt-2">Click to open full clock view</p>
      </div>

      {/* Time Difference Graph */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Time Differences</h2>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-[auto_repeat(3,1fr)] gap-4">
              <div></div>
              {countries.slice(0, 3).map(country => (
                <div key={country.name} className="text-center font-medium">
                  {country.name}
                </div>
              ))}
              {countries.slice(0, 3).map(country1 => (
                <React.Fragment key={country1.name}>
                  <div className="font-medium">{country1.name}</div>
                  {countries.slice(0, 3).map(country2 => (
                    <div key={`${country1.name}-${country2.name}`} className="text-center">
                      {country1 === country2 ? (
                        '-'
                      ) : (
                        <div className="bg-blue-100 rounded-lg p-2">
                          {getTimeDifference(country1.offset, country2.offset)}h
                        </div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Time Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {filteredCountries.map((country) => (
          <Link
            key={country.name}
            to={`/country/${country.name}`}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-12 h-8 object-cover rounded-md shadow-sm"
              />
              <div>
                <h3 className="font-medium text-gray-900">{country.name}</h3>
                <div className="text-2xl font-mono text-gray-800">
                  {formatTime(getCountryTime(country.offset))}
                </div>
                <p className="text-sm text-gray-500">
                  UTC{country.offset >= 0 ? '+' : ''}{country.offset}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default WorldTime;