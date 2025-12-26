import { useState } from 'react';
import { Login } from './components/Login';
import { TaxpayerRegistration } from './components/TaxpayerRegistration';
import { TaxpayerDashboard } from './components/TaxpayerDashboard';
import { JuniorOfficerDashboard } from './components/JuniorOfficerDashboard';
import { SeniorManagerDashboard } from './components/SeniorManagerDashboard';

export type UserType = 'Taxpayer' | 'JuniorOfficer' | 'SeniorManager';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  type: UserType;
  rank: string; // changed from 'rank?: string;' to 'rank: string;'
  branch?: string;
  zoneName?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleBackToLogin = () => {
    setShowRegistration(false);
  };

  if (showRegistration) {
    return <TaxpayerRegistration onBack={handleBackToLogin} onSuccess={handleBackToLogin} />;
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} onShowRegistration={handleShowRegistration} />;
  }

  return (
    <>
      {currentUser.type === 'Taxpayer' ? (
        <TaxpayerDashboard user={currentUser} onLogout={handleLogout} />
      ) : currentUser.type === 'JuniorOfficer' ? (
        <JuniorOfficerDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <SeniorManagerDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
