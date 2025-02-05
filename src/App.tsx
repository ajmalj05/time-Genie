import React, { useState, useEffect } from 'react';
import { Globe2, MapPin, Clock, Bell, Info, Volume2, VolumeX, Github, Linkedin, Twitter, Mail } from 'lucide-react';

// Enhanced country data with more details
const countries = [
  {
    name: 'United States',
    timezone: 'America/New_York',
    offset: -4,
    capital: 'Washington, D.C.',
    population: '331 million',
    states: 50,
    languages: ['English'],
    currency: 'US Dollar (USD)',
    facts: [
      'The US spans six time zones in its main territory',
      'Daylight Saving Time was first introduced in 1918'
    ],
    flag: 'https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'United Kingdom',
    timezone: 'Europe/London',
    offset: 1,
    capital: 'London',
    population: '67 million',
    states: 4,
    languages: ['English'],
    currency: 'Pound Sterling (GBP)',
    facts: [
      'The UK uses British Summer Time (BST) from March to October',
      'Big Ben is the nickname for the Great Bell of the clock at Westminster'
    ],
    flag: 'https://images.unsplash.com/photo-1562939568-dd7409591289?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Japan',
    timezone: 'Asia/Tokyo',
    offset: 9,
    capital: 'Tokyo',
    population: '125 million',
    states: 47,
    languages: ['Japanese'],
    currency: 'Japanese Yen (JPY)',
    facts: [
      'Japan does not observe Daylight Saving Time',
      'Japan is known for its precise train schedules'
    ],
    flag: 'https://images.unsplash.com/photo-1513171920216-2640b288471b?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Australia',
    timezone: 'Australia/Sydney',
    offset: 10,
    capital: 'Canberra',
    population: '26 million',
    states: 6,
    languages: ['English'],
    currency: 'Australian Dollar (AUD)',
    facts: [
      'Australia has three main time zones',
      'Some regions observe Daylight Saving Time while others do not'
    ],
    flag: 'https://images.unsplash.com/photo-1587302186428-d1c8127f5c7a?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=1200'
  }
];

// Add time difference cities data
const timeDifferenceCities = [
  { name: 'Los Angeles', offset: -7 },
  { name: 'Chicago', offset: -5 },
  { name: 'New York', offset: -4 },
  { name: 'Toronto', offset: -4 },
  { name: 'São Paulo', offset: -3 },
  { name: 'London', offset: 1 },
  { name: 'Paris', offset: 2 },
  { name: 'Cairo', offset: 3 },
  { name: 'Dubai', offset: 4 },
  { name: 'Mumbai', offset: 5.5 },
  { name: 'Singapore', offset: 8 },
  { name: 'Tokyo', offset: 9 },
  { name: 'Sydney', offset: 11 }
];

function App() {
  const [time, setTime] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [alarms, setAlarms] = useState<{ time: string; enabled: boolean }[]>([]);
  const [newAlarm, setNewAlarm] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alarmHours, setAlarmHours] = useState('00');
  const [alarmMinutes, setAlarmMinutes] = useState('00');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      checkAlarms();
    }, 1000);
    return () => clearInterval(timer);
  }, [alarms]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCountryTime = (offset: number) => {
    const localTime = new Date();
    const utc = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };

  const addAlarm = () => {
    const time = `${alarmHours}:${alarmMinutes}`;
    if (time) {
      setAlarms([...alarms, { time, enabled: true }]);
      setAlarmHours('00');
      setAlarmMinutes('00');
    }
  };

  const toggleAlarm = (index: number) => {
    const newAlarms = [...alarms];
    newAlarms[index].enabled = !newAlarms[index].enabled;
    setAlarms(newAlarms);
  };

  const removeAlarm = (index: number) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  const checkAlarms = () => {
    const currentTime = time.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '00'
    });

    alarms.forEach(alarm => {
      if (alarm.enabled && alarm.time === currentTime && soundEnabled) {
        playAlarmSound();
        alert('Alarm!');
      }
    });
  };

  const playAlarmSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
  };

  const getTimeDifferenceWidth = (offset: number) => {
    const maxOffset = Math.max(...timeDifferenceCities.map(city => Math.abs(city.offset)));
    return `${(Math.abs(offset) / maxOffset) * 100}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span className="text-xl font-bold">World Time Explorer</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Current Location Time */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Your Location</h2>
            </div>
            <div className="text-7xl font-bold tracking-tight mb-4 font-mono">
              {formatTime(time)}
            </div>
            <div className="text-xl text-gray-600">
              {formatDate(time)}
            </div>
          </div>

          {/* Country Selector and Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Globe2 className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Country Explorer</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <select
                  value={selectedCountry.name}
                  onChange={(e) => setSelectedCountry(countries.find(c => c.name === e.target.value) || countries[0])}
                  className="w-full p-2 rounded-lg border bg-transparent mb-4"
                >
                  {countries.map(country => (
                    <option key={country.name} value={country.name}>{country.name}</option>
                  ))}
                </select>
                <img
                  src={selectedCountry.image}
                  alt={`${selectedCountry.name} landscape`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">Capital</h3>
                    <p>{selectedCountry.capital}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">Population</h3>
                    <p>{selectedCountry.population}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">States/Regions</h3>
                    <p>{selectedCountry.states}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">Languages</h3>
                    <p>{selectedCountry.languages.join(', ')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">Currency</h3>
                    <p>{selectedCountry.currency}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">Time Zone</h3>
                    <p>{selectedCountry.timezone}</p>
                  </div>
                </div>
                <div className="text-3xl font-mono mb-4">
                  {formatTime(getCountryTime(selectedCountry.offset))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Interesting Facts
                  </h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selectedCountry.facts.map((fact, index) => (
                      <li key={index} className="text-gray-600">{fact}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Alarm Clock */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Bell className="w-5 h-5" />
                  <h3 className="font-semibold">Alarm Clock</h3>
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                    <select
                      value={alarmHours}
                      onChange={(e) => setAlarmHours(e.target.value)}
                      className="w-full p-2 rounded-lg border bg-transparent"
                    >
                      {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
                    <select
                      value={alarmMinutes}
                      onChange={(e) => setAlarmMinutes(e.target.value)}
                      className="w-full p-2 rounded-lg border bg-transparent"
                    >
                      {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(minute => (
                        <option key={minute} value={minute}>{minute}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={addAlarm}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add Alarm
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {alarms.map((alarm, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <span className="font-mono">{alarm.time}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAlarm(index)}
                          className={`p-1 rounded-full ${alarm.enabled ? 'text-green-500' : 'text-gray-400'}`}
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeAlarm(index)}
                          className="p-1 text-red-500 hover:text-red-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* World Clock */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Globe2 className="w-6 h-6" />
              <h2 className="text-xl font-semibold">World Clock</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {countries.map((country) => (
                <div key={country.name} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="w-8 h-6 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{country.name}</div>
                      <div className="text-2xl font-mono">
                        {formatTime(getCountryTime(country.offset))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Time Difference Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-pink-600">Time Difference</h2>
          <p className="text-gray-600 mb-4">from {selectedCountry.name}</p>
          <div className="space-y-3">
            {timeDifferenceCities.map((city) => {
              const difference = city.offset - selectedCountry.offset;
              const isNegative = difference < 0;
              return (
                <div key={city.name} className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium">{city.name}</div>
                  <div className="flex-1 h-8 flex items-center">
                    <div className="w-1/2 flex justify-end">
                      {isNegative && (
                        <div
                          style={{ width: getTimeDifferenceWidth(difference) }}
                          className="h-3 bg-pink-200 rounded-l"
                        />
                      )}
                    </div>
                    <div className="w-px h-full bg-pink-300" />
                    <div className="w-1/2">
                      {!isNegative && difference > 0 && (
                        <div
                          style={{ width: getTimeDifferenceWidth(difference) }}
                          className="h-3 bg-pink-200 rounded-r"
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-20 text-sm font-mono">
                    {difference === 0 ? 'UTC' : `${difference > 0 ? '+' : ''}${difference} hours`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer with Personal Details */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About the Developer</h3>
              <p className="text-gray-400 mb-4">
                Hi, I'm John Doe, a passionate full-stack developer with expertise in
                building modern web applications. I love creating tools that make
                people's lives easier.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">World Time Explorer</h3>
              <p className="text-gray-400 mb-4">
                A comprehensive tool for exploring time zones, country information,
                and managing your global schedule. Built with React, TypeScript,
                and Tailwind CSS.
              </p>
              <p className="text-gray-400">
                © {new Date().getFullYear()} World Time Explorer. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;