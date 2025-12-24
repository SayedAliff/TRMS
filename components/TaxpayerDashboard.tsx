import { useState } from 'react';
import { Home, FileText, DollarSign, HelpCircle, LogOut, User as UserIcon, MapPin, Calendar, CheckCircle, Phone, Mail, CreditCard, AlertCircle } from 'lucide-react';
import { User } from '../App';
import { FileReturnWizard } from './FileReturnWizard';
import { PaymentPage } from './PaymentPage';
import { PaymentHistory } from './PaymentHistory';
import { SupportTickets } from './SupportTickets';
import { ZoneMap } from './ZoneMap';

interface TaxpayerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'file-return' | 'payment-history' | 'support' | 'profile';

export function TaxpayerDashboard({ user, onLogout }: TaxpayerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [hasPendingPayment, setHasPendingPayment] = useState(false); // Set to false after payment
  const [zoneImage, setZoneImage] = useState('');
  
  // Profile edit management
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber1: '',
    city: '',
    street: '',
    houseNo: '',
    zipCode: ''
  });
  
  // Support notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'support', message: 'Your support ticket #12345 has been resolved', time: '2 hours ago', read: false },
  ]);

  // Mock data matching exact Oracle schema and INSERT statements
  const taxpayerData = {
    // From Taxpayer table
    tin: user.id,
    firstName: user.id === '5000' ? 'Abul' : user.id === '5001' ? 'Bokul' : user.id === '5002' ? 'Cina' : user.id === '5003' ? 'David' : 'Eva',
    lastName: user.id === '5000' ? 'Kalam' : user.id === '5001' ? 'Mia' : user.id === '5002' ? 'Akter' : user.id === '5003' ? 'Roy' : 'Rahman',
    dateOfBirth: user.id === '5000' ? '15-JAN-1985' : user.id === '5001' ? '20-MAR-1978' : user.id === '5002' ? '10-JUL-1990' : user.id === '5003' ? '05-SEP-1982' : '25-DEC-1988',
    gender: user.id === '5000' ? 'Male' : user.id === '5001' ? 'Male' : user.id === '5002' ? 'Female' : user.id === '5003' ? 'Male' : 'Female',
    houseNo: user.id === '5000' ? '55' : user.id === '5001' ? '12A' : user.id === '5002' ? '78' : user.id === '5003' ? '23' : '45B',
    street: user.id === '5000' ? 'Banani' : user.id === '5001' ? 'Dhanmondi' : user.id === '5002' ? 'Agrabad' : user.id === '5003' ? 'Zindabazar' : user.id === '5004' ? 'Shaheb Bazar' : 'Main Street',
    city: user.id === '5000' ? 'Dhaka' : user.id === '5001' ? 'Dhaka' : user.id === '5002' ? 'Chittagong' : user.id === '5003' ? 'Sylhet' : 'Rajshahi',
    zipCode: user.id === '5000' ? '1213' : user.id === '5001' ? '1209' : user.id === '5002' ? '4100' : user.id === '5003' ? '3100' : '6100',
    username: user.id === '5000' ? 'abul_taxpayer' : user.id === '5001' ? 'bokul_taxpayer' : user.id === '5002' ? 'cina_taxpayer' : user.id === '5003' ? 'david_taxpayer' : 'eva_taxpayer',
    password: '****', // Masked for security
    phoneNumber1: user.id === '5000' ? '01711111111' : user.id === '5001' ? '01922222222' : user.id === '5002' ? '01733333333' : user.id === '5003' ? '01844444444' : '01555555555',
    phoneNumber2: user.id === '5000' ? '01611111111' : user.id === '5001' ? '01822222222' : user.id === '5002' ? '01633333333' : user.id === '5003' ? '01744444444' : '01455555555',
    phoneNumber3: user.id === '5000' ? '01511111111' : null,
    zoneCode: user.id === '5000' ? '100' : user.id === '5001' ? '100' : user.id === '5002' ? '101' : user.id === '5003' ? '102' : '103',
    zoneName: user.zoneName || 'Dhaka North',
    
    // From Tax_Return table
    assessmentYear: '2024-2025',
    returnStatus: 'Completed',
    totalIncome: user.id === '5000' ? '500,000' : user.id === '5001' ? '1,200,000' : user.id === '5002' ? '350,000' : user.id === '5003' ? '800,000' : '450,000',
    taxableAmount: user.id === '5000' ? '50,000' : user.id === '5001' ? '120,000' : user.id === '5002' ? '35,000' : user.id === '5003' ? '80,000' : '45,000',
    filingDate: '13-DEC-2025',
    taxCategory: user.id === '5000' ? 'Individual' : user.id === '5001' ? 'Corporate' : 'Individual',
    lastPaymentAmount: user.id === '5000' ? '5,000' : '25,000',
    lastPaymentDate: '13-DEC-2025',
    
    // Tax payment history
    taxHistory: [
      { year: '2024-2025', category: 'Individual', totalEarned: '500,000', taxPaid: '5,000' },
      { year: '2023-2024', category: 'Individual', totalEarned: '450,000', taxPaid: '4,500' },
      { year: '2022-2023', category: 'Individual', totalEarned: '400,000', taxPaid: '4,000' },
      { year: '2021-2022', category: 'Individual', totalEarned: '350,000', taxPaid: '3,500' },
    ],
    
    // Pending payment data (from filed return)
    pendingTax: user.id === '5000' ? '50,000' : '120,000',
    pendingYear: '2024-2025'
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#0056b3' }}>
            Taxpayer Portal
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'dashboard' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'
            }`}
            style={{
              background: activeView === 'dashboard' ? 'linear-gradient(135deg, #2F80ED 0%, #1E5BBF 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('file-return')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'file-return' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'
            }`}
            style={{
              background: activeView === 'file-return' ? 'linear-gradient(135deg, #2F80ED 0%, #1E5BBF 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <FileText className="w-5 h-5" />
            <span>File Tax Return</span>
          </button>

          <button
            onClick={() => setActiveView('payment-history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'payment-history' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'
            }`}
            style={{
              background: activeView === 'payment-history' ? 'linear-gradient(135deg, #2F80ED 0%, #1E5BBF 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <span className="text-xl">৳</span>
            <span>Payment History</span>
          </button>

          <button
            onClick={() => setActiveView('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'support' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'
            }`}
            style={{
              background: activeView === 'support' ? 'linear-gradient(135deg, #2F80ED 0%, #1E5BBF 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'profile' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'
            }`}
            style={{
              background: activeView === 'profile' ? 'linear-gradient(135deg, #2F80ED 0%, #1E5BBF 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <UserIcon className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-white transition-all hover:opacity-90 shadow-md"
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 600 
            }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Welcome, {user.firstName} {user.lastName}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              {user.firstName} {user.lastName}
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#0056b3' }}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeView === 'dashboard' && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Personal Info Card */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e3f2fd' }}>
                      <UserIcon className="w-5 h-5" style={{ color: '#0056b3' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Personal Information</h3>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>TIN: {taxpayerData.tin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>Phone: {taxpayerData.phoneNumber1}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>Zone: {taxpayerData.zoneName}</span>
                    </div>
                  </div>
                </div>

                {/* Current Tax Status Card */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fff3e0' }}>
                      <Calendar className="w-5 h-5" style={{ color: '#f57c00' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Current Tax Status</h3>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerData.assessmentYear}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: '#fff3e0',
                        color: '#f57c00',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                      }}
                    >
                      {taxpayerData.returnStatus}
                    </span>
                  </div>
                </div>

                {/* Last Payment Card */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e8f5e9' }}>
                      <CheckCircle className="w-5 h-5" style={{ color: '#2e7d32' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Last Payment</h3>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerData.lastPaymentAmount} BDT</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayerData.lastPaymentDate}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
                <h3 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Quick Actions</h3>
                <button
                  onClick={() => setActiveView('file-return')}
                  className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#0056b3',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                  }}
                >
                  File New Return
                </button>
              </div>

              {/* Notifications */}
              {notifications.length > 0 && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
                  <h3 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Notifications</h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 rounded-lg border-l-4 transition-all cursor-pointer hover:bg-gray-50 ${
                          notification.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'
                        }`}
                        onClick={() => {
                          setNotifications(notifications.map(n => 
                            n.id === notification.id ? { ...n, read: true } : n
                          ));
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
                            <div className="flex-1">
                              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: notification.read ? 400 : 600, color: notification.read ? '#616161' : '#212121' }}>
                                {notification.message}
                              </p>
                              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pending Payment Alert */}
              {hasPendingPayment && (
                <div className="bg-white rounded-lg shadow border-l-4 p-6 mb-8" style={{ borderColor: '#f57c00' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fff3e0' }}>
                      <AlertCircle className="w-6 h-6" style={{ color: '#f57c00' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#f57c00' }}>
                        Pending Payment
                      </h3>
                      <p className="text-gray-600 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                        You have filed your tax return but haven't completed the payment yet.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Assessment Year</p>
                            <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerData.pendingYear}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Tax Amount Due</p>
                            <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#f57c00' }}>{taxpayerData.pendingTax} BDT</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Total Income</p>
                            <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerData.totalIncome} BDT</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Tax Category</p>
                            <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerData.taxCategory}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveView('payment-history')}
                        className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                        style={{
                          backgroundColor: '#f57c00',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600
                        }}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Zone Map */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Your Tax Zone</h3>
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5" style={{ color: '#0056b3' }} />
                    <div>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Tax Zone</p>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerData.zoneName}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>Zone Code: {taxpayerData.zoneCode}</p>
                    <p>Location: {taxpayerData.city}</p>
                    <p>Address: House {taxpayerData.houseNo}, {taxpayerData.street}, {taxpayerData.city} - {taxpayerData.zipCode}</p>
                  </div>
                </div>
                
                {/* Map with Real Image */}
                <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                  {/* Map Background Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1632941084677-b83bb4c78066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaGFrYSUyMGJhbmdsYWRlc2glMjBtYXB8ZW58MXx8fHwxNzY1OTcxMjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Dhaka Map"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient for better visibility */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)' }}></div>
                  
                  {/* Zone Marker */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center animate-pulse" style={{ backgroundColor: '#0056b3', boxShadow: '0 0 0 8px rgba(47, 128, 237, 0.3), 0 0 0 16px rgba(47, 128, 237, 0.1)' }}>
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <div className="bg-white px-6 py-3 rounded-lg shadow-xl border-2" style={{ borderColor: '#0056b3' }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0056b3', fontSize: '1.125rem' }}>{taxpayerData.zoneName}</p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.city}</p>
                        <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayerData.street}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeView === 'file-return' && <FileReturnWizard userTaxCategory={taxpayerData.taxCategory} onPaymentRequired={() => setActiveView('payment-history')} />}
          {activeView === 'payment-history' && <PaymentHistory />}
          {activeView === 'support' && <SupportTickets userType="taxpayer" currentUserTIN={user.id} />}
          {activeView === 'profile' && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl" style={{ background: 'linear-gradient(135deg, #2F80ED 0%, #1E5BBF 100%)' }}>
                    {taxpayerData.firstName[0]}{taxpayerData.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerData.firstName} {taxpayerData.lastName}</h3>
                    <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>TIN: {taxpayerData.tin}</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h4 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>First Name</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Last Name</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Date of Birth</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Gender</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.gender}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h4 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <Phone className="w-4 h-4" />
                      Phone Number 1
                    </label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.phoneNumber1}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <Phone className="w-4 h-4" />
                      Phone Number 2
                    </label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.phoneNumber2}</p>
                  </div>
                  {taxpayerData.phoneNumber3 && (
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Phone className="w-4 h-4" />
                        Phone Number 3
                      </label>
                      <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.phoneNumber3}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h4 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Address Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>House Number</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.houseNo}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Street</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.street}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>City</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.city}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Zip Code</label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.zipCode}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <MapPin className="w-4 h-4" />
                      Tax Zone
                    </label>
                    <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerData.zoneName} (Zone Code: {taxpayerData.zoneCode})</p>
                  </div>
                </div>
              </div>

              {/* Tax Payment History */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h4 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Tax Payment History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Year</th>
                        <th className="px-4 py-3 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Category</th>
                        <th className="px-4 py-3 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Total Earned</th>
                        <th className="px-4 py-3 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Tax Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxpayerData.taxHistory.map((record, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{record.year}</td>
                          <td className="px-4 py-3" style={{ fontFamily: 'Inter, sans-serif' }}>{record.category}</td>
                          <td className="px-4 py-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{record.totalEarned} BDT</td>
                          <td className="px-4 py-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2e7d32' }}>{record.taxPaid} BDT</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}