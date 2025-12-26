import { useState } from 'react';
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
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [supportNotifications, setSupportNotifications] = useState(1);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  // Profile edit states
  const [editedProfile, setEditedProfile] = useState({
    firstName: user.id === '5000' ? 'Abul' : user.id === '5001' ? 'Bokul' : user.id === '5002' ?  'Cina' : user.id === '5003' ?  'David' : 'Eva',
    lastName: user.id === '5000' ? 'Kalam' : user.id === '5001' ? 'Mia' : user.id === '5002' ? 'Akter' : user.id === '5003' ? 'Roy' : 'Rahman',
    dateOfBirth: user.id === '5000' ? '15-JAN-1985' : user.id === '5001' ? '20-MAR-1978' : user.id === '5002' ? '10-JUL-1990' : user.id === '5003' ? '05-SEP-1982' : '25-DEC-1988',
    gender: user.id === '5000' ? 'Male' : user.id === '5001' ?  'Male' : user.id === '5002' ? 'Female' : user.id === '5003' ? 'Male' :  'Female',
    houseNo: user.id === '5000' ? '55' : user.id === '5001' ? '12A' : user.id === '5002' ? '78' : user.id === '5003' ? '23' : '45B',
    street: user.id === '5000' ? 'Banani' : user.id === '5001' ? 'Dhanmondi' : user.id === '5002' ? 'Agrabad' : user.id === '5003' ? 'Zindabazar' : 'Shaheb Bazar',
    city: user.id === '5000' ? 'Dhaka' : user.id === '5001' ? 'Dhaka' : user.id === '5002' ? 'Chittagong' : user.id === '5003' ? 'Sylhet' : 'Rajshahi',
    zipCode: user.id === '5000' ? '1213' : user.id === '5001' ? '1209' : user.id === '5002' ? '4100' : user.id === '5003' ? '3100' : '6100',
    phoneNumber1: user.id === '5000' ? '01711111111' : user.id === '5001' ? '01922222222' : user.id === '5002' ? '01733333333' : user.id === '5003' ? '01844444444' : '01555555555',
    phoneNumber2: '',
    zoneName: user.id === '5000' ? 'Dhaka North' : user.id === '5001' ? 'Dhaka South' : user.id === '5002' ? 'Chittagong Zone' : user.id === '5003' ? 'Sylhet Zone' : 'Rajshahi Zone',
    zoneCode: user.id === '5000' ? '100' : user.id === '5001' ? '101' : user.id === '5002' ?  '102' : user.id === '5003' ? '103' : '104'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const taxpayerData = {
    tin: user.id,
    ... editedProfile
  };

  const stats = {
    totalReturns: 3,
    pendingPayments: 1,
    openTickets: supportNotifications
  };

  const handleNotificationClick = () => {
    setActiveView('support');
    setShowNotificationPopup(false);
  };

  const handleSaveProfile = () => {
    // Track changes for audit log
    const changes = [];
    const originalData = {
      firstName: user.id === '5000' ?  'Abul' : user.id === '5001' ?  'Bokul' : user.id === '5002' ?  'Cina' : user.id === '5003' ?  'David' : 'Eva',
      lastName: user.id === '5000' ? 'Kalam' : user.id === '5001' ? 'Mia' : user.id === '5002' ? 'Akter' : user.id === '5003' ? 'Roy' : 'Rahman',
      phoneNumber1: user.id === '5000' ? '01711111111' : user.id === '5001' ? '01922222222' : user.id === '5002' ? '01733333333' : user.id === '5003' ? '01844444444' : '01555555555',
      city: user.id === '5000' ? 'Dhaka' : user.id === '5001' ? 'Dhaka' : user.id === '5002' ? 'Chittagong' : user.id === '5003' ? 'Sylhet' : 'Rajshahi',
    };

    if (editedProfile.firstName !== originalData.firstName) {
      changes.push(`First Name: ${originalData.firstName} → ${editedProfile.firstName}`);
    }
    if (editedProfile.lastName !== originalData. lastName) {
      changes.push(`Last Name: ${originalData.lastName} → ${editedProfile. lastName}`);
    }
    if (editedProfile.phoneNumber1 !== originalData.phoneNumber1) {
      changes.push(`Phone: ${originalData.phoneNumber1} → ${editedProfile.phoneNumber1}`);
    }
    if (editedProfile.city !== originalData.city) {
      changes.push(`City: ${originalData.city} → ${editedProfile.city}`);
    }

    if (changes.length > 0) {
      alert(`Profile updated successfully!\n\nChanges made:\n${changes.join('\n')}\n\nOfficers have been notified of these changes.`);
    } else {
      alert('No changes detected.');
    }
    
    setShowEditProfile(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match! ');
      return;
    }
    if (passwordData.newPassword.length < 4) {
      alert('Password must be at least 4 characters long! ');
      return;
    }
    
    alert(`Password changed successfully!\n\nNew Password: ${passwordData.newPassword}\n\nOfficers have been notified of this security update.`);
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
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-gray-700 hover:bg-blue-50'}`}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button onClick={() => setActiveView('file-return')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'file-return' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-gray-700 hover:bg-blue-50'}`}>
            <FileText className="w-5 h-5" />
            <span>File Tax Return</span>
          </button>
          <button onClick={() => setActiveView('payment-history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'payment-history' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-gray-700 hover:bg-blue-50'}`}>
            <FileText className="w-5 h-5" />
            <span>Payment History</span>
          </button>
          <button onClick={() => setActiveView('support')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'support' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-gray-700 hover:bg-blue-50'}`}>
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
            {supportNotifications > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{supportNotifications}</span>
            )}
          </button>
          <button onClick={() => setActiveView('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'profile' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow' : 'text-gray-700 hover:bg-blue-50'}`}>
            <UserIcon className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow hover:opacity-90 transition-all">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Welcome, {taxpayerData.firstName} {taxpayerData.lastName}</h2>
              <p className="text-sm text-gray-600">TIN: {taxpayerData. tin}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => supportNotifications > 0 && setShowNotificationPopup(! showNotificationPopup)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {supportNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {supportNotifications}
                    </span>
                  )}
                </button>
                
                {showNotificationPopup && supportNotifications > 0 && (
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
                {taxpayerData.firstName[0]}{taxpayerData.lastName[0]}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md: grid-cols-3 gap-6 mb-8">
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
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pending Payments</p>
                      <p className="text-3xl font-bold text-orange-600">{stats. pendingPayments}</p>
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
              </div>
            </>
          )}

          {activeView === 'file-return' && <FileReturnWizard />}
          {activeView === 'payment-history' && <PaymentHistory />}
          {activeView === 'support' && (
            <SupportTickets 
              userType="taxpayer" 
              currentUserTIN={user.id}
              highlightUnread={true}
              onNotificationUpdate={setSupportNotifications}
            />
          )}

          {activeView === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">My Profile</h3>
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-90 transition-all font-medium"
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
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover: opacity-90 transition-all font-medium"
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
                <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold">
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
                <button onClick={handleChangePassword} disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword} className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover: opacity-90 transition-all disabled:opacity-50 font-semibold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
                <button onClick={() => setShowChangePassword(false)} className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold">
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