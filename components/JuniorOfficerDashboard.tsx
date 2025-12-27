import { useState } from 'react';
import { Home, HelpCircle, LogOut, UserCheck, Ticket, FileText, UserCog, UserPlus, Edit, Trash2, Phone, MapPin, DollarSign, ChevronLeft, ChevronRight, Bell, User as UserIcon, Lock, Save, X } from 'lucide-react';
import { User } from '../App';
import { SupportTickets } from './SupportTickets';

interface JuniorOfficerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'taxpayers' | 'tax-list' | 'support' | 'profile';

export function JuniorOfficerDashboard({ user, onLogout }: JuniorOfficerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<number | null>(null);
  const [showAddTaxpayer, setShowAddTaxpayer] = useState(false);
  const [showEditTaxpayer, setShowEditTaxpayer] = useState(false);
  const [selectedTaxpayerEdit, setSelectedTaxpayerEdit] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const taxpayersPerPage = 5;
  const [supportNotifications, setSupportNotifications] = useState(2);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  const [newTaxpayer, setNewTaxpayer] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    city: '',
    phoneNumber1: '',
    zoneName: ''
  });

  // Officer's own profile data
  const [officerProfile, setOfficerProfile] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    rank: user.rank,
    branch: user.branch,
    phone: user.id === '1000' ? '01711223344' : user.id === '1001' ? '01822334455' : '01933445566'
  });

  const [editedProfile, setEditedProfile] = useState({ ...officerProfile });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const stats = {
    totalTaxpayers:  5,
    openTickets: supportNotifications,
    resolvedToday: 2
  };

  const recentActivity = [
    { id: 1, text: 'New ticket #303 from TIN 5003', time: '1 hour ago' },
    { id: 2, text: 'New ticket #301 from TIN 5001', time: '2 hours ago' },
    { id: 3, text: 'Taxpayer profile updated:   TIN 5002', time:   '5 hours ago' },
  ];

  const [taxpayers, setTaxpayers] = useState([
    { id: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city: 'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North' },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka South' },
    { id: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName:   'Chittagong Zone' },
    { id: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet Zone' },
    { id: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi Zone' },
  ]);

  const taxpayerTaxData = [
    { tin: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city:   'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North', zoneCode: '100', returnId: '200', assessmentYear: '2024-2025', totalIncome: '500000', taxableAmount: '50000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Salaried Individual', officerId: '1000', returnStatus: 'Completed' },
    { tin: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city:  'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka North', zoneCode: '100', returnId: '201', assessmentYear: '2024-2025', totalIncome: '1200000', taxableAmount: '120000', filingDate: '13-DEC-2025', taxCategory: 'Corporate', taxType: 'Limited Company', officerId: '1000', returnStatus: 'Completed' },
    { tin: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName: 'Chittagong', zoneCode: '101', returnId: '202', assessmentYear: '2024-2025', totalIncome: '350000', taxableAmount: '35000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Business Owner', officerId: '1001', returnStatus: 'Pending' },
    { tin: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet', zoneCode: '102', returnId: '203', assessmentYear: '2024-2025', totalIncome: '800000', taxableAmount: '80000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Professional', officerId: '1002', returnStatus: 'Completed' },
    { tin: '5004', firstName: 'Eva', lastName: 'Rahman', gender:   'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi', zoneCode: '103', returnId: '204', assessmentYear: '2024-2025', totalIncome: '450000', taxableAmount: '45000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Self Employed', officerId: '1000', returnStatus: 'Completed' }
  ];

  const totalPages = Math.ceil(taxpayerTaxData.length / taxpayersPerPage);
  const startIndex = (currentPage - 1) * taxpayersPerPage;
  const endIndex = startIndex + taxpayersPerPage;
  const currentTaxpayers = taxpayerTaxData.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedTaxpayer(null);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedTaxpayer(null);
    }
  };

  const handleNotificationClick = () => {
    setActiveView('support');
    setShowNotificationPopup(false);
  };

  const handleSaveProfile = () => {
    // Track changes
    const changes = [];
    if (editedProfile.firstName !== officerProfile.firstName) {
      changes.push(`First Name: ${officerProfile.firstName} → ${editedProfile.firstName}`);
    }
    if (editedProfile.lastName !== officerProfile.lastName) {
      changes.push(`Last Name: ${officerProfile.lastName} → ${editedProfile.lastName}`);
    }
    if (editedProfile.branch !== officerProfile.branch) {
      changes.push(`Branch: ${officerProfile.branch} → ${editedProfile.branch}`);
    }
    if (editedProfile.phone !== officerProfile.phone) {
      changes.push(`Phone: ${officerProfile.phone} → ${editedProfile.phone}`);
    }

    if (changes.length > 0) {
      setOfficerProfile({ ...editedProfile });
      alert(`Profile updated successfully!\n\nChanges:\n${changes.join('\n')}\n\n✅ Senior Manager has been notified of these changes.`);
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
      alert('Password must be at least 4 characters! ');
      return;
    }
    
    alert(`Password changed successfully!\n\nOfficer: ${officerProfile.firstName} ${officerProfile.lastName}\nID: ${officerProfile.id}\n\n✅ Senior Manager has been notified of this security update.`);
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAddTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    const nextTaxpayerId = (5000 + taxpayers.length).toString();
    const newTax = { id: nextTaxpayerId, ...newTaxpayer };
    setTaxpayers([...  taxpayers, newTax]);
    alert(`Taxpayer Added!\nTIN: ${nextTaxpayerId}\nName: ${newTaxpayer.firstName} ${newTaxpayer.lastName}`);
    setShowAddTaxpayer(false);
    setNewTaxpayer({ firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };

  const handleEditTaxpayer = (taxpayer: any) => {
    setSelectedTaxpayerEdit(taxpayer);
    setNewTaxpayer({ firstName: taxpayer.firstName, lastName: taxpayer.lastName, gender: taxpayer.gender, city: taxpayer.city, phoneNumber1: taxpayer.phoneNumber1, zoneName: taxpayer.zoneName });
    setShowEditTaxpayer(true);
  };

  const handleUpdateTaxpayer = (e:   React.FormEvent) => {
    e.preventDefault();
    const updatedTaxpayers = taxpayers.map(tax => tax.id === selectedTaxpayerEdit.id ? { ...tax, ...newTaxpayer } : tax);
    setTaxpayers(updatedTaxpayers);
    alert(`Taxpayer #${selectedTaxpayerEdit.id} Updated! `);
    setShowEditTaxpayer(false);
    setSelectedTaxpayerEdit(null);
    setNewTaxpayer({ firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };

  const handleDeleteTaxpayer = (taxpayer: any) => {
    if (confirm(`Are you sure you want to delete Taxpayer TIN #${taxpayer.id}?`)) {
      const updatedTaxpayers = taxpayers.filter(tax => tax.  id !== taxpayer.id);
      setTaxpayers(updatedTaxpayers);
      alert(`Taxpayer TIN #${taxpayer.id} deleted!`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-purple-700">Junior Officer Portal</h1>
        </div>
        <nav className="flex-1 p-4">
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'dashboard' ?   'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <Home className="w-5 h-5" /><span>Dashboard</span>
          </button>
          <button onClick={() => setActiveView('taxpayers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'taxpayers' ?  'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <UserCog className="w-5 h-5" /><span>Manage Taxpayers</span>
          </button>
          <button onClick={() => setActiveView('tax-list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'tax-list' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <FileText className="w-5 h-5" /><span>Tax List</span>
          </button>
          <button onClick={() => setActiveView('support')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'support' ?  'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <HelpCircle className="w-5 h-5" /><span>Support Tickets</span>
            {supportNotifications > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{supportNotifications}</span>}
          </button>
          <button onClick={() => setActiveView('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'profile' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
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
              <h2 className="text-xl font-semibold">{officerProfile.firstName} {officerProfile.lastName}</h2>
              <p className="text-sm text-gray-600">Rank: {officerProfile.rank} | Branch: {officerProfile. branch}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => supportNotifications > 0 && setShowNotificationPopup(! showNotificationPopup)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  {supportNotifications > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{supportNotifications}</span>}
                </button>
                {showNotificationPopup && supportNotifications > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200"><h3 className="font-semibold">Notifications</h3></div>
                    <div className="p-4">
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100" onClick={handleNotificationClick}>
                        <Ticket className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{supportNotifications} new support tickets</p>
                          <p className="text-xs text-gray-600 mt-1">Taxpayers need assistance.  Click to view.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{officerProfile.firstName} {officerProfile.lastName}</p>
                <p className="text-xs text-gray-500">Officer ID: {officerProfile.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {officerProfile.firstName[0]}{officerProfile.lastName[0]}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'dashboard' && (
            <>
              <div className="mb-6 p-4 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-sm font-semibold text-purple-700">Role: junior_officer_role</p>
                <p className="text-xs text-gray-600 mt-1">Permissions: SELECT, INSERT on Taxpayer | SELECT on Tax_Return, Payment</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"><UserCheck className="w-6 h-6 text-blue-600" /></div>
                    <div><p className="text-sm text-gray-500 mb-1">Total Taxpayers</p><p className="text-3xl font-bold text-blue-600">{stats.totalTaxpayers}</p></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center"><Ticket className="w-6 h-6 text-orange-600" /></div>
                    <div><p className="text-sm text-gray-500 mb-1">Open Tickets</p><p className="text-3xl font-bold text-orange-600">{stats. openTickets}</p></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center"><Ticket className="w-6 h-6 text-green-600" /></div>
                    <div><p className="text-sm text-gray-500 mb-1">Resolved Today</p><p className="text-3xl font-bold text-green-600">{stats.resolvedToday}</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg mb-4 font-semibold">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 rounded-full mt-2 bg-purple-600"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeView === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">My Profile</h3>
                  <button onClick={() => { setEditedProfile({ ...officerProfile }); setShowEditProfile(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover: opacity-90 font-medium">
                    <Edit className="w-4 h-4" />Edit Details
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="text-sm text-gray-600 mb-1 block">Officer ID</label><p className="text-lg font-semibold text-purple-600">{officerProfile.id}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Full Name</label><p className="text-lg font-semibold">{officerProfile.firstName} {officerProfile.lastName}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Rank</label><p className="text-lg font-medium">{officerProfile.rank}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Branch</label><p className="text-lg font-medium">{officerProfile.branch}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Phone</label><p className="text-lg font-medium">{officerProfile.phone}</p></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Security</h3>
                  <button onClick={() => setShowChangePassword(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover: opacity-90 font-medium">
                    <Lock className="w-4 h-4" />Change Password
                  </button>
                </div>
                <p className="text-sm text-gray-600">Keep your account secure by regularly updating your password.</p>
              </div>
            </div>
          )}

          {/* Tax List and other views - keep existing code */}
          {activeView === 'taxpayers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Manage Taxpayers</h3>
                <button onClick={() => setShowAddTaxpayer(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover: opacity-90 font-medium">
                  <UserPlus className="w-4 h-4" />Add Taxpayer
                </button>
              </div>
              <div className="bg-white rounded-lg shadow border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {['TIN', 'Name', 'Gender', 'City', 'Phone', 'Zone', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {taxpayers.map(t => (
                      <tr key={t.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">#{t.id}</td>
                        <td className="px-6 py-4 font-medium">{t.firstName} {t.lastName}</td>
                        <td className="px-6 py-4">{t.gender}</td>
                        <td className="px-6 py-4">{t.city}</td>
                        <td className="px-6 py-4">{t.phoneNumber1}</td>
                        <td className="px-6 py-4">{t.zoneName}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button onClick={() => handleEditTaxpayer(t)} className="p-2 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4 text-blue-600" /></button>
                          <button onClick={() => handleDeleteTaxpayer(t)} className="p-2 hover: bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                        {['TIN', 'Name', 'Gender', 'City', 'Phone', 'Zone', 'Return ID', 'Assessment Year', 'Total Income', 'Taxable Amount', 'Filing Date', 'Category', 'Status']. map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentTaxpayers.map((t, i) => (
                        <tr key={t.tin} onClick={() => setSelectedTaxpayer(selectedTaxpayer === startIndex + i ? null : startIndex + i)} className="border-b hover:bg-purple-50 cursor-pointer">
                          <td className="px-4 py-3 text-sm font-semibold text-purple-600">{t.tin}</td>
                          <td className="px-4 py-3 text-sm font-medium">{t.firstName} {t. lastName}</td>
                          <td className="px-4 py-3 text-sm">{t.gender}</td>
                          <td className="px-4 py-3 text-sm">{t.city}</td>
                          <td className="px-4 py-3 text-sm">{t.phoneNumber1}</td>
                          <td className="px-4 py-3 text-sm">{t.zoneName} ({t.zoneCode})</td>
                          <td className="px-4 py-3 text-sm font-semibold">#{t.returnId}</td>
                          <td className="px-4 py-3 text-sm">{t.assessmentYear}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-green-700">৳{Number(t.totalIncome).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-orange-600">৳{Number(t.taxableAmount).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">{t.filingDate}</td>
                          <td className="px-4 py-3 text-sm">{t.taxCategory}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${t.returnStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{t.returnStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50 mt-4">
                  <div className="text-sm text-gray-600">Showing {startIndex + 1} to {Math.min(endIndex, taxpayerTaxData.length)} of {taxpayerTaxData.length} entries</div>
                  <div className="flex items-center gap-2">
                    <button onClick={handlePrevious} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg border flex items-center gap-2 font-medium ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' :  'hover:bg-gray-100'}`}>
                      <ChevronLeft className="w-4 h-4" />Previous
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => { setCurrentPage(p); setSelectedTaxpayer(null); }} className={`w-10 h-10 rounded-lg font-semibold ${currentPage === p ? 'bg-purple-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100 border'}`}>{p}</button>
                      ))}
                    </div>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg border flex items-center gap-2 font-medium ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
                      Next<ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {selectedTaxpayer !== null && (
                <div className="bg-white rounded-lg shadow border p-6">
                  <h4 className="text-lg mb-4 font-semibold text-purple-700">Selected Taxpayer Details</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div><label className="text-sm text-gray-600 mb-1 block">TIN</label><p className="text-lg font-semibold text-purple-600">{taxpayerTaxData[selectedTaxpayer].tin}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Full Name</label><p className="text-lg font-semibold">{taxpayerTaxData[selectedTaxpayer].firstName} {taxpayerTaxData[selectedTaxpayer].lastName}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Gender</label><p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer]. gender}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">City</label><p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].city}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><Phone className="w-4 h-4" />Phone</label><p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].phoneNumber1}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><MapPin className="w-4 h-4" />Zone</label><p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].zoneName}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Return ID</label><p className="text-lg font-semibold">#{taxpayerTaxData[selectedTaxpayer].returnId}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Assessment Year</label><p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].assessmentYear}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><DollarSign className="w-4 h-4" />Total Income</label><p className="text-lg font-semibold text-green-700">৳{Number(taxpayerTaxData[selectedTaxpayer].totalIncome).toLocaleString()}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><DollarSign className="w-4 h-4" />Taxable Amount</label><p className="text-lg font-semibold text-orange-600">৳{Number(taxpayerTaxData[selectedTaxpayer].taxableAmount).toLocaleString()}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Tax Category</label><p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].taxCategory}</p></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Tax Type</label><p className="text-lg font-semibold text-purple-600">{taxpayerTaxData[selectedTaxpayer].taxType}</p></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'support' && (
            <SupportTickets userType="officer" currentOfficerID={officerProfile.id} currentOfficerName={`${officerProfile.firstName} ${officerProfile.lastName}`} currentOfficerRank={officerProfile.rank} highlightUnread={true} onNotificationUpdate={setSupportNotifications} />
          )}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Edit My Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 font-medium">First Name *</label>
                  <input type="text" value={editedProfile.firstName} onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Last Name *</label>
                  <input type="text" value={editedProfile.lastName} onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Branch *</label>
                  <input type="text" value={editedProfile.branch} onChange={(e) => setEditedProfile({ ...editedProfile, branch: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium">Phone *</label>
                  <input type="tel" value={editedProfile.phone} onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:opacity-90 font-semibold flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />Save Changes
                </button>
                <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50 font-semibold">Cancel</button>
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
              <div><label className="block text-sm mb-2 font-medium">Current Password *</label><input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target. value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">New Password *</label><input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">Confirm Password *</label><input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
              {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData. confirmPassword && (
                <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-sm text-red-600">⚠️ Passwords do not match! </p></div>
              )}
              <div className="flex gap-3 pt-4">
                <button onClick={handleChangePassword} disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword} className="flex-1 py-3 rounded-lg bg-red-600 text-white hover: opacity-90 disabled:opacity-50 font-semibold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />Change Password
                </button>
                <button onClick={() => setShowChangePassword(false)} className="px-6 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50 font-semibold">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Taxpayer modals - keep existing code */}
      {showAddTaxpayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b"><h3 className="text-xl font-semibold">Add New Taxpayer</h3></div>
            <form onSubmit={handleAddTaxpayer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({...newTaxpayer, firstName: e. target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({...newTaxpayer, lastName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus: outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Gender *</label><select value={newTaxpayer.gender} onChange={(e) => setNewTaxpayer({...newTaxpayer, gender: e.target. value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400"><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={newTaxpayer.city} onChange={(e) => setNewTaxpayer({... newTaxpayer, city:  e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone *</label><input type="tel" value={newTaxpayer.phoneNumber1} onChange={(e) => setNewTaxpayer({...newTaxpayer, phoneNumber1: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zone *</label><input type="text" value={newTaxpayer.zoneName} onChange={(e) => setNewTaxpayer({...newTaxpayer, zoneName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:opacity-90 font-semibold">Add Taxpayer</button>
                <button type="button" onClick={() => setShowAddTaxpayer(false)} className="flex-1 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50 font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditTaxpayer && selectedTaxpayerEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b"><h3 className="text-xl font-semibold">Edit Taxpayer #{selectedTaxpayerEdit. id}</h3></div>
            <form onSubmit={handleUpdateTaxpayer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({... newTaxpayer, firstName:  e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({...newTaxpayer, lastName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus: outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Gender *</label><select value={newTaxpayer. gender} onChange={(e) => setNewTaxpayer({...newTaxpayer, gender: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400"><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={newTaxpayer.city} onChange={(e) => setNewTaxpayer({...newTaxpayer, city: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus: outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone *</label><input type="tel" value={newTaxpayer.phoneNumber1} onChange={(e) => setNewTaxpayer({...newTaxpayer, phoneNumber1: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zone *</label><input type="text" value={newTaxpayer.zoneName} onChange={(e) => setNewTaxpayer({...newTaxpayer, zoneName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus: outline-none focus:border-purple-400" /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 rounded-lg bg-green-600 text-white hover: opacity-90 font-semibold">Update Taxpayer</button>
                <button type="button" onClick={() => { setShowEditTaxpayer(false); setSelectedTaxpayerEdit(null); }} className="flex-1 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50 font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}