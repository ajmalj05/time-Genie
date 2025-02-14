import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe2, Clock, Bell, Volume2, VolumeX, Calendar, Clock4, Info } from 'lucide-react';

interface HeaderProps {
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  showAlarmButton?: boolean;
  onAlarmClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  soundEnabled = false,
  onToggleSound,
  showAlarmButton = true,
  onAlarmClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <Link to="/" className="flex items-center space-x-2">
        <Globe2 className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">World Time</h1>
      </Link>
      
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => navigate('/clock')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isActive('/clock')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="hidden md:inline">Clock</span>
        </button>

        <button
          onClick={() => navigate('/calendar')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isActive('/calendar')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="hidden md:inline">Calendar</span>
        </button>

        <button
          onClick={() => navigate('/timezone-difference')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isActive('/timezone-difference')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          <Clock4 className="w-5 h-5" />
          <span className="hidden md:inline">Time Zones</span>
        </button>

        <button
          onClick={() => navigate('/about')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isActive('/about')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="hidden md:inline">About</span>
        </button>

        {showAlarmButton && (
          <button
            onClick={onAlarmClick}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Set Alarm"
          >
            <Bell className="w-5 h-5" />
          </button>
        )}

        {onToggleSound && (
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg hover:bg-gray-100"
            title={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-blue-500" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header