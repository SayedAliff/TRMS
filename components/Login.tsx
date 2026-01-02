import { useState } from 'react';
import { User, UserType } from '../App';
import { Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onShowRegistration: () => void;
}

export function Login({ onLogin, onShowRegistration }: LoginProps) {
  const [userType, setUserType] = useState<UserType>('Taxpayer');
  const [tinOrId, setTinOrId] = useState('');
  const [password, setPassword] = useState('');

  // Mock users matching exact INSERT statements
  // Taxpayers: Login with TIN
  // Officers: Login with Officer_ID
  const mockUsers: Record<string, any> = {
    // Taxpayers (TIN)
    '5000': { id: '5000', firstName: 'Abul', lastName: 'Kalam', type: 'Taxpayer' as UserType, zoneName: 'Dhaka North' },
    '5001': { id: '5001', firstName: 'Bokul', lastName: 'Mia', type: 'Taxpayer' as UserType, zoneName: 'Dhaka' },
    '5002': { id: '5002', firstName: 'Cina', lastName: 'Akter', type: 'Taxpayer' as UserType, zoneName: 'Chittagong' },
    '5003': { id: '5003', firstName: 'David', lastName: 'Roy', type: 'Taxpayer' as UserType, zoneName: 'Sylhet' },
    '5004': { id: '5004', firstName: 'Eva', lastName: 'Rahman', type: 'Taxpayer' as UserType, zoneName: 'Rajshahi' },
    
    // Junior Officers (officer_nakib with junior_officer_role)
    '1000': { id: '1000', firstName: 'Rahim', lastName: 'Uddin', type: 'JuniorOfficer' as UserType, rank: 'Inspector', branch: 'Gulshan' },
    '1002': { id: '1002', firstName: 'Siaam', lastName: 'Khan', type: 'JuniorOfficer' as UserType, rank: 'Officer', branch: 'Motijheel' },
    '1003': { id: '1003', firstName: 'Nadia', lastName: 'Islam', type: 'JuniorOfficer' as UserType, rank: 'Assistant', branch: 'Zindabazar' },
    '1004': { id: '1004', firstName: 'Fahim', lastName: 'Hossain', type: 'JuniorOfficer' as UserType, rank: 'Inspector', branch: 'New Market' },
    
    // Senior Manager (manager_alif with senior_manager_role)
    '1001': { id: '1001', firstName: 'Karim', lastName: 'Ahmed', type: 'SeniorManager' as UserType, rank: 'Commissioner', branch: 'Agrabad' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers[tinOrId];
    
    if (!user) {
      alert('Invalid TIN/Officer ID');
      return;
    }
    
    // Check user type match
    if (userType === 'Taxpayer' && user.type !== 'Taxpayer') {
      alert('This ID belongs to an officer. Please switch to Tax Officer login.');
      return;
    }
    
    if (userType !== 'Taxpayer' && user.type === 'Taxpayer') {
      alert('This TIN belongs to a taxpayer. Please switch to Taxpayer login.');
      return;
    }
    
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex" style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      {/* Left Side - Abstract Background */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          top: '-100px',
          right: '-100px',
          filter: 'blur(60px)'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          bottom: '-50px',
          left: '-50px',
          filter: 'blur(50px)'
        }}></div>
        
        <div className="text-center text-white" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-8">
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <Shield className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl mb-4" style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 800,
            letterSpacing: '2px'
          }}>
            TRMS
          </h1>
          <p className="text-xl opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Tax Record Management System
          </p>
          <p className="text-sm opacity-75" style={{ fontFamily: 'Inter, sans-serif' }}>
            Powered by Oracle 10g
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-10" style={{
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Welcome Back
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Sign in to your account
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex gap-2 mb-8 p-1.5 bg-gray-100 rounded-xl" style={{
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
            }}>
              <button
                onClick={() => setUserType('Taxpayer')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                  userType === 'Taxpayer'
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  background: userType === 'Taxpayer' ? 'linear-gradient(135deg, #2F80ED 0%, #1E5BBF 100%)' : 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Taxpayer
              </button>
              <button
                onClick={() => setUserType('JuniorOfficer')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                  userType === 'JuniorOfficer' || userType === 'SeniorManager'
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  background: userType === 'JuniorOfficer' || userType === 'SeniorManager' ? 'linear-gradient(135deg, #7B68EE 0%, #6a5acd 100%)' : 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Tax Officer
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {userType === 'Taxpayer' ? 'TIN' : 'Officer ID'}
                </label>
                <input
                  type="text"
                  placeholder={userType === 'Taxpayer' ? '5000' : '1000'}
                  value={tinOrId}
                  onChange={(e) => setTinOrId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-current transition-all"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    borderColor: tinOrId ? (userType === 'Taxpayer' ? '#2F80ED' : '#7B68EE') : undefined
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-current transition-all"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    borderColor: password ? (userType === 'Taxpayer' ? '#2F80ED' : '#7B68EE') : undefined
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white transition-all hover:opacity-90 shadow-lg"
                style={{
                  backgroundColor: userType === 'Taxpayer' ? '#2F80ED' : '#7B68EE',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.125rem'
                }}
              >
                Login
              </button>
            </form>

            {/* Registration Link - Only for Taxpayers */}
            {userType === 'Taxpayer' && (
              <div className="mt-6 text-center">
                <button
                  onClick={onShowRegistration}
                  className="text-sm hover:underline"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#2F80ED', fontWeight: 600 }}
                >
                  New Taxpayer? Register Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}