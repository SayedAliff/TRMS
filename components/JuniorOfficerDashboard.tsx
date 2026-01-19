import { useState, useEffect } from 'react';
import { Home, HelpCircle, LogOut, UserCheck, Ticket, FileText, UserCog, Edit, ChevronLeft, ChevronRight, Bell, User as UserIcon, Lock, Save, X } from 'lucide-react';
import { SupportTickets } from './SupportTickets';
import { userAPI, taxReturnAPI, supportAPI } from '../lib/api';

interface JuniorOfficerDashboardProps {
  user: {
    officer_id: string;
    first_name: string;
    last_name: string;
    rank: string;
    branch: string;
    house_no: string;
    street: string;
    city: string;
    zip_code: string;
    password: string;
  };
  onLogout: () => void;
}

type View = 'dashboard' | 'taxpayers' | 'tax-list' | 'support' | 'profile';

export function JuniorOfficerDashboard({ user, onLogout }: JuniorOfficerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Data from backend
  const [officerProfile, setOfficerProfile] = useState<any>(null);
  const [taxpayers, setTaxpayers] = useState<any[]>([]);
  const [returns, setReturns] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [editedProfile, setEditedProfile] = useState<any>(null);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Add a state for taxpayer form data
  const [, setTaxpayerForm] = useState<any>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    houseNo: '',
    street: '',
    city: '',
    zipCode: '',
    username: '',
    password: '',
    phoneNumber1: '',
    phoneNumber2: '',
    phoneNumber3: '',
    zoneCode: '',
    zoneName: ''
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const taxpayersPerPage = 5;

  useEffect(() => {
    // Officer profile
    userAPI.get_by_officer_id(user.officer_id).then(setOfficerProfile);
    // Taxpayers assigned to this officer
    userAPI.get_taxpayers().then(setTaxpayers);
    // Returns assigned to this officer
    taxReturnAPI.list('').then(setReturns);
    // Support tickets assigned to this officer
    supportAPI.list().then(setTickets);
  }, [user.officer_id]);

  useEffect(() => {
    setEditedProfile(officerProfile);
  }, [officerProfile]);

  const openTicketCount = tickets.filter((t: any) => t.status === 'open').length;

  const totalPages = Math.ceil(taxpayers.length / taxpayersPerPage);
  const startIndex = (currentPage - 1) * taxpayersPerPage;
  const endIndex = startIndex + taxpayersPerPage;
  const currentTaxpayers = taxpayers.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNotificationClick = () => {
    setActiveView('support');
    setShowNotificationPopup(false);
  };

  const handleSaveProfile = async () => {
    try {
      const updated = await userAPI.update_profile(editedProfile);
      setOfficerProfile(updated);
      setShowEditProfile(false);
    } catch (e) {
      // handle error
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) return;
    if (passwordData.new_password !== passwordData.confirm_password) return;
    try {
      await userAPI.change_password({
        old_password: passwordData.current_password,
        new_password: passwordData.new_password
      });
      setShowChangePassword(false);
      setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
    } catch (e) {
      // handle error
    }
  };

  // Add Taxpayer handler (auto TIN)




  if (!officerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-purple-700">Junior Officer Portal</h1>
        </div>
        <nav className="flex-1 p-4">
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'dashboard' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-purple-700 hover:bg-purple-100 border border-purple-200'}`}>
            <Home className="w-5 h-5" /><span>Dashboard</span>
          </button>
          <button onClick={() => setActiveView('taxpayers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'taxpayers' ?  'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-purple-700 hover:bg-purple-100 border border-purple-200'}`}>
            <UserCog className="w-5 h-5" /><span>Manage Taxpayers</span>
          </button>
          <button onClick={() => setActiveView('tax-list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'tax-list' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-purple-700 hover:bg-purple-100 border border-purple-200'}`}>
            <FileText className="w-5 h-5" /><span>Tax List</span>
          </button>
          <button
            onClick={() => setActiveView('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'support' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-purple-700 hover:bg-purple-100 border border-purple-200'}`}
          >
            <HelpCircle className="w-5 h-5" /><span>Support Tickets</span>
            {openTicketCount > 0 && (
              <span className="ml-auto bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {openTicketCount}
              </span>
            )}
          </button>
          <button onClick={() => setActiveView('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'profile' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-purple-700 hover:bg-purple-100 border border-purple-200'}`}>
            <UserIcon className="w-5 h-5" /><span>My Profile</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow hover:opacity-90 transition-all">
            <LogOut className="w-5 h-5" /><span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{officerProfile.first_name} {officerProfile.last_name}</h2>
              <p className="text-sm text-gray-600">Rank: {officerProfile.rank} | Branch: {officerProfile.branch}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => openTicketCount > 0 && setShowNotificationPopup(!showNotificationPopup)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {openTicketCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {openTicketCount}
                    </span>
                  )}
                </button>
                {showNotificationPopup && openTicketCount > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200"><h3 className="font-semibold">Notifications</h3></div>
                    <div className="p-4">
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100" onClick={handleNotificationClick}>
                        <Ticket className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{openTicketCount} open support ticket(s)</p>
                          <p className="text-xs text-gray-600 mt-1">Click to view and update status.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{officerProfile.first_name} {officerProfile.last_name}</p>
                <p className="text-xs text-gray-500">Officer ID: {officerProfile.officer_id}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {officerProfile.first_name[0]}{officerProfile.last_name[0]}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">Welcome, {officerProfile.first_name}!</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow border p-6 flex flex-col items-center">
                    <UserCheck className="w-8 h-8 text-purple-600 mb-2" />
                    <div className="text-3xl font-bold text-purple-700">{taxpayers.length}</div>
                    <div className="text-gray-600 mt-1">Total Taxpayers</div>
                  </div>
                  <div className="bg-white rounded-lg shadow border p-6 flex flex-col items-center">
                    <Ticket className="w-8 h-8 text-orange-600 mb-2" />
                    <div className="text-3xl font-bold text-orange-600">{openTicketCount}</div>
                    <div className="text-gray-600 mt-1">Open Support Tickets</div>
                  </div>
                  <div className="bg-white rounded-lg shadow border p-6 flex flex-col items-center">
                    <span className="w-8 h-8 flex items-center justify-center text-green-600 text-3xl mb-2 font-bold">৳</span>
                    <div className="text-3xl font-bold text-green-700">{returns.filter(r => r.status === 'paid').length}</div>
                    <div className="text-gray-600 mt-1">Returns Paid</div>
                  </div>
                </div>
              </div>
              {/* Removed Recent Activity block */}
            </div>
          )}

          {activeView === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">My Profile</h3>
                  <button onClick={() => setShowEditProfile(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium">
                    <Edit className="w-4 h-4" />Edit Details
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="text-sm text-gray-600 mb-1 block">Officer ID</label><p className="text-lg font-semibold text-purple-600">{officerProfile.officer_id}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">First Name</label><p className="text-lg font-semibold">{officerProfile.first_name}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Last Name</label><p className="text-lg font-semibold">{officerProfile.last_name}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Rank</label><p className="text-lg font-medium">{officerProfile.rank}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Branch</label><p className="text-lg font-medium">{officerProfile.branch}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">House No</label><p className="text-lg font-medium">{officerProfile.house_no}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Street</label><p className="text-lg font-medium">{officerProfile.street}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">City</label><p className="text-lg font-medium">{officerProfile.city}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Zip Code</label><p className="text-lg font-medium">{officerProfile.zip_code}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Phone</label><p className="text-lg font-medium">{officerProfile.phone}</p></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Security</h3>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium"
                  >
                    <Lock className="w-4 h-4" />Change Password
                  </button>
                </div>
                <p className="text-sm text-gray-600">Keep your account secure by regularly updating your password.</p>
              </div>
            </div>
          )}

          {activeView === 'taxpayers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Manage Taxpayers</h3>
              </div>
              <div className="bg-white rounded-lg shadow border overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50 border-b border-purple-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">TIN</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">First Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Last Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Gender</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">City</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Zone Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTaxpayers.map((t, idx) => (
                      <tr key={t.tin || idx} className="border-b border-purple-100 hover:bg-purple-50">
                        <td className="px-4 py-3 font-semibold text-purple-800">{t.tin}</td>
                        <td className="px-4 py-3">{t.first_name}</td>
                        <td className="px-4 py-3">{t.last_name}</td>
                        <td className="px-4 py-3">{t.gender}</td>
                        <td className="px-4 py-3">{t.city}</td>
                        <td className="px-4 py-3">{t.phone_number_1}</td>
                        <td className="px-4 py-3">{t.zone_code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50 mt-4">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, taxpayers.length)} of {taxpayers.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handlePrevious} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg border flex items-center gap-2 font-medium ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' :  'hover:bg-gray-100'}`}>
                    <ChevronLeft className="w-4 h-4" />Previous
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setCurrentPage(p)} className={`w-10 h-10 rounded-lg font-semibold ${currentPage === p ? 'bg-purple-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100 border'}`}>{p}</button>
                    ))}
                  </div>
                  <button onClick={handleNext} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg border flex items-center gap-2 font-medium ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
                    Next<ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'tax-list' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border p-6">
                <h3 className="text-xl mb-4 font-semibold text-purple-700">Tax List - All Taxpayers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">TIN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Assessment Year</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Total Income</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Taxable Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {returns.map((r, i) => (
                        <tr
                          key={r.id}
                          className={i % 2 === 0 ? "bg-purple-50" : "bg-white"}
                        >
                          <td className="px-4 py-3 text-sm font-semibold text-purple-600">{r.tin}</td>
                          <td className="px-4 py-3 text-sm">{r.assessment_year}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-green-700">৳{Number(r.total_income).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-orange-600">৳{Number(r.taxable_amount).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-semibold">{r.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeView === 'support' && (
            <SupportTickets
              userType="officer"
              tickets={tickets}
            />
          )}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Edit My Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={editedProfile?.first_name || ''} onChange={(e) => setEditedProfile({ ...editedProfile, first_name: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={editedProfile?.last_name || ''} onChange={(e) => setEditedProfile({ ...editedProfile, last_name: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Rank *</label><input type="text" value={editedProfile?.rank || ''} onChange={(e) => setEditedProfile({ ...editedProfile, rank: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Branch *</label><input type="text" value={editedProfile?.branch || ''} onChange={(e) => setEditedProfile({ ...editedProfile, branch: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">House No *</label><input type="text" value={editedProfile?.house_no || ''} onChange={(e) => setEditedProfile({ ...editedProfile, house_no: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Street *</label><input type="text" value={editedProfile?.street || ''} onChange={(e) => setEditedProfile({ ...editedProfile, street: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={editedProfile?.city || ''} onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zip Code *</label><input type="text" value={editedProfile?.zip_code || ''} onChange={(e) => setEditedProfile({ ...editedProfile, zip_code: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone *</label><input type="tel" value={editedProfile?.phone || ''} onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-semibold flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />Save Changes
                </button>
                <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 rounded-lg border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Change Password</h3>
              <button onClick={() => setShowChangePassword(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm mb-2 font-medium">Current Password *</label><input type="password" value={passwordData.current_password} onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">New Password *</label><input type="password" value={passwordData.new_password} onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">Confirm Password *</label><input type="password" value={passwordData.confirm_password} onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              {passwordData.new_password && passwordData.confirm_password && passwordData.new_password !== passwordData.confirm_password && (
                <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-sm text-red-600">⚠️ Passwords do not match! </p></div>
              )}
              <div className="flex gap-3 pt-4">
                <button onClick={handleChangePassword} disabled={!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password} className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 font-semibold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />Change Password
                </button>
                <button onClick={() => setShowChangePassword(false)} className="px-6 py-3 rounded-lg border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function setShowAddTaxpayer(_arg0: boolean) {
  throw new Error('Function not implemented.');
}
function setSelectedTaxpayerEdit(_taxpayer: any) {
  throw new Error('Function not implemented.');
}

