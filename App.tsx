import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { TaxpayerRegistration } from './components/TaxpayerRegistration';
import { TaxpayerDashboard } from './components/TaxpayerDashboard';
import { JuniorOfficerDashboard } from './components/JuniorOfficerDashboard';
import { SeniorManagerDashboard } from './components/SeniorManagerDashboard';

// Use snake_case and backend-aligned user type
export type UserRole = 'taxpayer' | 'officer' | 'manager';

export interface User {
  id: number;
  tin?: string;
  officer_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  user_type: UserRole;
  rank?: string;
  branch?: string;
  zone_id?: number;
  zone_name?: string;
  house_no?: string;
  street?: string;
  city?: string;
  zip_code?: string;
  status?: string;
  password?: string;
  date_of_birth?: string;
  gender?: string;
  username?: string;
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

  // Use backend's user_type for role-based dashboard
  return (
    <>
      {currentUser.user_type === 'taxpayer' ? (
        <TaxpayerDashboard
          user={{ tin: currentUser.tin ?? '' }}
          onLogout={handleLogout}
        />
      ) : currentUser.user_type === 'officer' ? (
        <JuniorOfficerDashboard
          user={{
            officer_id: currentUser.officer_id ?? '',
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            rank: currentUser.rank ?? '',
            branch: currentUser.branch ?? '', // Ensure string, not undefined
            house_no: currentUser.house_no ?? '',
            street: currentUser.street ?? '',
            city: currentUser.city ?? '',
            zip_code: currentUser.zip_code ?? '',
            password: currentUser.password ?? '',
          }}
          onLogout={handleLogout}
        />
      ) : (
        <SeniorManagerDashboard
          user={{
            ...currentUser,
            id: String(currentUser.id),
            firstName: currentUser.first_name,
            lastName: currentUser.last_name,
            houseNo: currentUser.house_no ?? '',
            zipCode: currentUser.zip_code ?? '',
            rank: currentUser.rank ?? '',
            branch: currentUser.branch ?? '',
            street: currentUser.street ?? '', // Ensure string, not undefined
            city: currentUser.city ?? '', // Ensure string, not undefined
            password: currentUser.password ?? '',
          }}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;
