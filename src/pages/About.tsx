import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Globe2, Clock, Calendar, Users } from 'lucide-react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to World Time
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-8">
          <Info className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">About World Time</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              World Time aims to connect people across time zones by providing accurate,
              real-time information about different countries and their local times.
              We believe in making global coordination easier and more efficient.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Globe2 className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">World Clock</h3>
                  <p className="text-gray-600">Track time across multiple countries and time zones simultaneously</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Time Difference Calculator</h3>
                  <p className="text-gray-600">Easily calculate time differences between any countries</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Global Calendar</h3>
                  <p className="text-gray-600">Keep track of holidays and important dates worldwide</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Country Information</h3>
                  <p className="text-gray-600">Detailed information about countries, including facts and cultural insights</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. World Clock</h3>
                <p className="text-gray-600">
                  View current times across different countries from the home page.
                  Use the search and filter options to find specific locations quickly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Time Difference Calculator</h3>
                <p className="text-gray-600">
                  Select up to 5 countries to compare their time differences.
                  Perfect for planning international meetings and calls.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Calendar</h3>
                <p className="text-gray-600">
                  Browse through international holidays and important dates.
                  Plan your schedule around global events and celebrations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Country Details</h3>
                <p className="text-gray-600">
                  Click on any country to view detailed information including
                  facts, holidays, and cultural insights.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-600">
                If you have any questions or feedback, please don't hesitate to
                reach out through our contact form or social media channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;