import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock as ClockIcon, Bell, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Layout from './components/Layout';

const ClockPage = () => {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState<Array<{ time: string; label: string; enabled: boolean }>>([]);
  const [newAlarm, setNewAlarm] = useState({ time: '', label: '' });
  const [showAnalogClock, setShowAnalogClock] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      checkAlarms();
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms]);

  const checkAlarms = () => {
    const currentTimeStr = time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    alarms.forEach(alarm => {
      if (alarm.enabled && alarm.time === currentTimeStr) {
        playAlarmSound();
        alert(`Alarm: ${alarm.label}`);
      }
    });
  };

  const playAlarmSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
  };

  const addAlarm = () => {
    if (newAlarm.time && newAlarm.label) {
      setAlarms([...alarms, { ...newAlarm, enabled: true }]);
      setNewAlarm({ time: '', label: '' });
    }
  };

  const toggleAlarm = (index: number) => {
    const updatedAlarms = [...alarms];
    updatedAlarms[index].enabled = !updatedAlarms[index].enabled;
    setAlarms(updatedAlarms);
  };

  const deleteAlarm = (index: number) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  const renderAnalogClock = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourDegrees = (hours % 12) * 30 + minutes / 2;
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;

    return (
      <div className="relative w-80 h-80 rounded-full border-4 border-gray-800 mx-auto mb-8">
        {/* Clock numbers */}
        {[...Array(12)].map((_, i) => {
          const rotation = i * 30;
          const angle = (rotation - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 140 + 160;
          const y = Math.sin(angle) * 140 + 160;
          return (
            <div
              key={i}
              className="absolute font-bold text-xl"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          );
        })}

        {/* Clock hands */}
        <div
          className="absolute w-1 h-16 bg-black origin-bottom"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `rotate(${hourDegrees}deg)`
          }}
        />
        <div
          className="absolute w-0.5 h-24 bg-black origin-bottom"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `rotate(${minuteDegrees}deg)`
          }}
        />
        <div
          className="absolute w-0.5 h-28 bg-red-500 origin-bottom"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `rotate(${secondDegrees}deg)`
          }}
        />
        <div className="absolute w-3 h-3 bg-black rounded-full" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
    );
  };

  return (
    <Layout>
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to World Time
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <ClockIcon className="w-8 h-8 mr-2 text-blue-500" />
            Clock
          </h1>
          <button
            onClick={() => setShowAnalogClock(!showAnalogClock)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Switch to {showAnalogClock ? 'Digital' : 'Analog'}
          </button>
        </div>

        {showAnalogClock ? (
          renderAnalogClock()
        ) : (
          <div className="text-center mb-8">
            <div className="text-7xl font-mono font-bold text-gray-800">
              {time.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })}
            </div>
            <div className="text-xl text-gray-500 mt-2">
              {time.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        )}
      </div>

      {/* Alarms Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-blue-500" />
          Alarms
        </h2>

        <div className="flex gap-4 mb-6">
          <input
            type="time"
            value={newAlarm.time}
            onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Alarm label"
            value={newAlarm.label}
            onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={addAlarm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add Alarm
          </button>
        </div>

        <div className="space-y-4">
          {alarms.map((alarm, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-xl font-mono">{alarm.time}</div>
                <div className="text-gray-600">{alarm.label}</div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alarm.enabled}
                    onChange={() => toggleAlarm(index)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
                <button
                  onClick={() => deleteAlarm(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClockPage;