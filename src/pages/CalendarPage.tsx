import React from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ArrowLeft, Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import { countries } from '../data/countries';

const CalendarPage = () => {
  // Combine all holidays from all countries
  const allHolidays = countries.flatMap(country => 
    country.holidays.map(holiday => ({
      ...holiday,
      title: `${holiday.title} (${country.name})`,
      backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }))
  );

  return (
    <Layout>
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to World Time
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-8">
          <Calendar className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">World Holidays Calendar</h1>
        </div>

        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={allHolidays}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridYear'
            }}
            views={{
              dayGridMonth: { buttonText: 'Month' },
              dayGridYear: { buttonText: 'Year' }
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;