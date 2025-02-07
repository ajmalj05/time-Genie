import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  showAlarmButton?: boolean;
  onAlarmClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  soundEnabled,
  onToggleSound,
  showAlarmButton,
  onAlarmClick
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          showAlarmButton={showAlarmButton}
          onAlarmClick={onAlarmClick}
        />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout