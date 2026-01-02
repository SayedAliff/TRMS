import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { TaxpayerRegistration } from './components/TaxpayerRegistration';
import { TaxpayerDashboard } from './components/TaxpayerDashboard';
import { JuniorOfficerDashboard } from './components/JuniorOfficerDashboard';
import { SeniorManagerDashboard } from './components/SeniorManagerDashboard';

export type UserType = 'Taxpayer' | 'JuniorOfficer' | 'SeniorManager';

export interface User {
  id: string;
  odapyerId?: number;
  officerId?: number;
  tin?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  type: UserType;
  rank: string;
  branch: string;
  zoneId?: number;
  zoneName?: string;
  houseNo: string;
  street: string;
  city: string;
  zipCode: string;
  status?: string;
  password: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('trms_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('trms_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('trms_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('trms_user');
    localStorage.removeItem('trms_token');
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleBackToLogin = () => {
    setShowRegistration(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
