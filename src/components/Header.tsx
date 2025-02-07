import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe2, Clock, Bell, Volume2, VolumeX } from 'lucide-react';

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

  return (
    <div className="flex items-center justify-between mb-8">
      <Link to="/" className="flex items-center space-x-2">
        <Globe2 className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">World Time</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/clock')}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Open Clock"
        >
          <Clock className="w-6 h-6 text-gray-600" />
        </button>
        {showAlarmButton && (
          <button
            onClick={onAlarmClick}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Set Alarm"
          >
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
        )}
        {onToggleSound && (
          <button
            onClick={onToggleSound}
            className="p-2 rounded-full hover:bg-gray-100"
            title={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-6 h-6 text-blue-500" />
            ) : (
              <VolumeX className="w-6 h-6 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header