import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import { countries } from '../data/countries';

const TimezoneDifference = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [currentTime] = useState(new Date());

  const addCountry = (countryName: string) => {
    if (selectedCountries.length < 5 && !selectedCountries.includes(countryName)) {
      setSelectedCountries([...selectedCountries, countryName]);
    }
  };

  const removeCountry = (countryName: string) => {
    setSelectedCountries(selectedCountries.filter(c => c !== countryName));
  };

  const getCountryTime = (offset: number) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeDifference = (offset1: number, offset2: number) => {
    return Math.abs(offset1 - offset2);
  };

  return (
    <Layout>
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to World Time
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-4 mb-8">
          <Clock className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Time Zone Difference Calculator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Countries (max 5)</h2>
            <div className="space-y-2">
              {countries.map(country => (
                <button
                  key={country.name}
                  onClick={() => addCountry(country.name)}
                  disabled={selectedCountries.includes(country.name)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedCountries.includes(country.name)
                      ? 'bg-gray-100 text-gray-500'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  {country.name} (UTC{country.offset >= 0 ? '+' : ''}{country.offset})
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Time Differences</h2>
            {selectedCountries.length > 0 ? (
              <div className="space-y-4">
                {selectedCountries.map((countryName, i) => {
                  const country = countries.find(c => c.name === countryName)!;
                  return (
                    <div key={country.name} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{country.name}</h3>
                          <p className="text-gray-600">
                            {formatTime(getCountryTime(country.offset))}
                          </p>
                        </div>
                        <button
                          onClick={() => removeCountry(country.name)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                      {selectedCountries.slice(i + 1).map(otherCountryName => {
                        const otherCountry = countries.find(c => c.name === otherCountryName)!;
                        return (
                          <div key={`${country.name}-${otherCountry.name}`} className="mt-2 pl-4 border-l-2 border-gray-200">
                            <div className="flex items-center space-x-2">
                              <span>{country.name}</span>
                              <ArrowRight className="w-4 h-4" />
                              <span>{otherCountry.name}</span>
                              <span className="text-blue-500 font-medium">
                                {getTimeDifference(country.offset, otherCountry.offset)}h
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">Select countries to see time differences</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimezoneDifference;