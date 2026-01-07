import { useState, useEffect } from 'react';
import { Home, FileText, HelpCircle, LogOut, User as UserIcon, Bell, Edit, Lock, Save, X } from 'lucide-react';
import { User } from '../App';
import { FileReturnWizard } from './FileReturnWizard';
import { PaymentHistory } from './PaymentHistory';
import { SupportTickets } from './SupportTickets';

interface TaxpayerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'file-return' | 'payment-history' | 'support' | 'profile';

export function TaxpayerDashboard({ user, onLogout }:  TaxpayerDashboardProps) {
  // Placeholder for backend-fetched data
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // DEMO DATA START
  // TODO: REMOVE DEMO DATA when connecting to Django API. Use API: /api/taxpayer/profile/, /api/taxpayer/stats/, /api/taxpayer/payments/
  const defaultTaxpayerData = {
    tin: '5000',
    firstName: 'Abul',
    lastName: 'Kalam',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    houseNo: '55',
    street: 'Banani',
    city: 'Dhaka',
    zipCode: '1213',
    phoneNumber1: '01711111111',
    phoneNumber2: '01811111111',
    phoneNumber3: '',
    zoneName: 'Dhaka North',
    zoneCode: '1',
    username: 'abul80',
    password: '123456'
  };

  const [editedProfile, setEditedProfile] = useState<any>(defaultTaxpayerData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [taxpayerData] = useState<any>(defaultTaxpayerData);

  // Demo stats
  const [stats] = useState<any>({
    totalReturns: 1,
    openTickets: 1,
    totalPaid: 5000
  });
  // DEMO DATA END

  useEffect(() => {
    // TODO: Integrate with Django API to fetch taxpayer profile, stats, and payment history
    // Example:
    // fetch('/api/taxpayer/profile/')
    // fetch('/api/taxpayer/stats/')
    // fetch('/api/taxpayer/payments/')
  }, [user]);

  const handleNotificationClick = () => {
    setActiveView('support');
    setShowNotificationPopup(false);
  };

  const handleSaveProfile = () => {
    // TODO: Integrate with Django API to update taxpayer profile
    setShowEditProfile(false);
  };

  const handleChangePassword = () => {
    // TODO: Integrate with Django API to change taxpayer password
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-blue-700">Taxpayer Portal</h1>
        </div>
        <nav className="flex-1 p-4">
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-blue-700 hover:bg-blue-100 border border-blue-200'}`}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button onClick={() => setActiveView('file-return')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'file-return' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-blue-700 hover:bg-blue-100 border border-blue-200'}`}>
            <FileText className="w-5 h-5" />
            <span>File Tax Return</span>
          </button>
          <button onClick={() => setActiveView('payment-history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'payment-history' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-blue-700 hover:bg-blue-100 border border-blue-200'}`}>
            <FileText className="w-5 h-5" />
            <span>Payment History</span>
          </button>
          <button onClick={() => setActiveView('support')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'support' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-blue-700 hover:bg-blue-100 border border-blue-200'}`}>
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
            {1 > 0 && (
              <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">1</span>
            )}
          </button>
          <button onClick={() => setActiveView('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'profile' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-blue-700 hover:bg-blue-100 border border-blue-200'}`}>
            <UserIcon className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow hover:opacity-90 transition-all">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Welcome, {taxpayerData?.firstName} {taxpayerData?.lastName}
              </h2>
              <p className="text-sm text-gray-600">TIN: {taxpayerData?.tin}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => 1 > 0 && setShowNotificationPopup(!showNotificationPopup)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {1 > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {1}
                    </span>
                  )}
                </button>
                
                {showNotificationPopup && 1 > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors" onClick={handleNotificationClick}>
                        <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">New reply on your support ticket</p>
                          <p className="text-xs text-gray-600 mt-1">An officer has responded to your ticket.  Click to view.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {(taxpayerData?.firstName?.[0] || '')}{(taxpayerData?.lastName?.[0] || '')}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Returns Filed</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.totalReturns}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Open Support Tickets</p>
                      <p className="text-3xl font-bold text-green-600">{stats.openTickets}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                      <p className="text-3xl font-bold text-blue-700">৳{stats.totalPaid?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Removed Recent Activity Section */}
            </>
          )}

          {activeView === 'file-return' && <FileReturnWizard />}
          {activeView === 'payment-history' && <PaymentHistory />}
          {activeView === 'support' && (
            <SupportTickets 
              userType="taxpayer" 
              currentUserTIN={user.id}
            />
          )}

          {activeView === 'profile' && taxpayerData && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">My Profile</h3>
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Details
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">TIN</label>
                    <p className="text-lg font-semibold text-blue-600">{taxpayerData.tin}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                    <p className="text-lg font-semibold">{taxpayerData.firstName} {taxpayerData.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Date of Birth</label>
                    <p className="text-lg font-medium">{taxpayerData.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                    <p className="text-lg font-medium">{taxpayerData.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Address</label>
                    <p className="text-lg font-medium">{taxpayerData.houseNo}, {taxpayerData.street}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">City</label>
                    <p className="text-lg font-medium">{taxpayerData.city} - {taxpayerData.zipCode}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
                    <p className="text-lg font-medium">{taxpayerData.phoneNumber1}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Tax Zone</label>
                    <p className="text-lg font-medium">{taxpayerData.zoneName} ({taxpayerData.zoneCode})</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Security</h3>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium"
                  >
                    <Lock className="w-4 h-4" />
                    Change Password
                  </button>
                </div>
                <p className="text-sm text-gray-600">Keep your account secure by regularly updating your password.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Edit Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 font-medium">First Name *</label>
                  <input type="text" value={editedProfile.firstName} onChange={(e) => setEditedProfile({...editedProfile, firstName: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Last Name *</label>
                  <input type="text" value={editedProfile.lastName} onChange={(e) => setEditedProfile({...editedProfile, lastName: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Date of Birth *</label>
                  <input type="text" value={editedProfile.dateOfBirth} onChange={(e) => setEditedProfile({...editedProfile, dateOfBirth:  e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus: border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Gender *</label>
                  <select value={editedProfile.gender} onChange={(e) => setEditedProfile({...editedProfile, gender: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">House No *</label>
                  <input type="text" value={editedProfile.houseNo} onChange={(e) => setEditedProfile({...editedProfile, houseNo: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Street *</label>
                  <input type="text" value={editedProfile.street} onChange={(e) => setEditedProfile({...editedProfile, street: e.target. value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">City *</label>
                  <input type="text" value={editedProfile.city} onChange={(e) => setEditedProfile({...editedProfile, city: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Zip Code *</label>
                  <input type="text" value={editedProfile.zipCode} onChange={(e) => setEditedProfile({...editedProfile, zipCode: e. target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Phone Number 1 *</label>
                  <input type="tel" value={editedProfile.phoneNumber1} onChange={(e) => setEditedProfile({...editedProfile, phoneNumber1: e. target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Phone Number 2</label>
                  <input type="tel" value={editedProfile.phoneNumber2} onChange={(e) => setEditedProfile({... editedProfile, phoneNumber2: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus: border-blue-400" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-semibold flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 rounded-lg border-2 border-blue-600 text-blue-700 hover:bg-blue-50 transition-all font-semibold">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Change Password</h3>
              <button onClick={() => setShowChangePassword(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm mb-2 font-medium">Current Password *</label>
                <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus: outline-none focus:border-purple-400" placeholder="Enter current password" />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium">New Password *</label>
                <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus: border-purple-400" placeholder="Enter new password" />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium">Confirm New Password *</label>
                <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" placeholder="Re-enter new password" />
              </div>
              {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData. confirmPassword && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">⚠️ Passwords do not match! </p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button onClick={handleChangePassword} disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword} className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50 font-semibold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
                <button onClick={() => setShowChangePassword(false)} className="px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-700 hover:bg-blue-50 transition-all font-semibold">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}