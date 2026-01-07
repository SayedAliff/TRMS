import { useState, useEffect } from 'react';
import { Home, HelpCircle, LogOut, UserCheck, Ticket, FileText, UserCog, UserPlus, Edit, Trash2, Phone, MapPin, ChevronLeft, ChevronRight, Bell, User as UserIcon, Lock, Save, X, DollarSign } from 'lucide-react';
import { User } from '../App';
import { SupportTickets } from './SupportTickets';

interface JuniorOfficerDashboardProps {
  user: User;
  onLogout: () => void;
}

type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export function JuniorOfficerDashboard({ user, onLogout }: JuniorOfficerDashboardProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'taxpayers' | 'tax-list' | 'support' | 'profile'>('dashboard');
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<number | null>(null);
  const [showAddTaxpayer, setShowAddTaxpayer] = useState(false);
  const [showEditTaxpayer, setShowEditTaxpayer] = useState(false);
  const [selectedTaxpayerEdit, setSelectedTaxpayerEdit] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const taxpayersPerPage = 5;
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  // Taxpayer state (add all DB fields)
  const [newTaxpayer, setNewTaxpayer] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
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

  // Officer's own profile data (add all DB fields)
  const [officerProfile] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    rank: user.rank,
    branch: user.branch,
    houseNo: user.houseNo,
    street: user.street,
    city: user.city,
    zipCode: user.zipCode,
    phone: user.id === '1000' ? '01711223344' : user.id === '1001' ? '01822334455' : '01933445566'
  });

  const [editedProfile, setEditedProfile] = useState({ ...officerProfile });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // DEMO DATA START
  // TODO: REMOVE DEMO DATA when connecting to Django API. Use API: /api/officer/taxpayers/, /api/officer/taxdata/
  const [taxpayers] = useState<any[]>([
    { id: '5000', firstName: 'Abul', lastName: 'Kalam', dateOfBirth: '1980-01-01', gender: 'Male', houseNo: '55', street: 'Banani', city: 'Dhaka', zipCode: '1213', username: 'abul80', password: '123456', phoneNumber1: '01711111111', phoneNumber2: '01811111111', phoneNumber3: '', zoneCode: '1' },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', dateOfBirth: '1990-05-15', gender: 'Male', houseNo: '12', street: 'Puran', city: 'Dhaka', zipCode: '1100', username: 'bokul90', password: '654321', phoneNumber1: '01922222222', phoneNumber2: '', phoneNumber3: '', zoneCode: '2' }
  ]);
  const [taxpayerTaxData, setTaxpayerTaxData] = useState<any[]>([
    { tin: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city: 'Dhaka', returnId: '20000', assessmentYear: '2024-2025', totalIncome: 500000, taxableAmount: 400000, filingDate: '2024-06-01', taxCategory: 'Individual', taxType: 'Individual', returnStatus: 'Paid', phoneNumber1: '01711111111', zoneName: 'Dhaka North' },
    { tin: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', returnId: '20001', assessmentYear: '2024-2025', totalIncome: 1200000, taxableAmount: 1000000, filingDate: '2024-06-01', taxCategory: 'Corporate', taxType: 'Corporate', returnStatus: 'Pending', phoneNumber1: '01922222222', zoneName: 'Chittagong Central' }
  ]);
  // DEMO DATA END


  useEffect(() => {
    // TODO: Integrate with Django API to fetch taxpayers, tax data, and tickets
    // Example:
    // fetch('/api/officer/taxpayers/')
    // fetch('/api/officer/taxdata/')
    // fetch('/api/support/tickets/')
  }, [user]);

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

  // Support tickets state - simplified to match DB schema
  const [ticketsState, setTicketsState] = useState<Array<{
    ticketId: string;
    issueDescription: string;
    submissionDate: string;
    resolutionStatus: TicketStatus;
    taxpayerTIN: string;
    taxpayerName: string;
  }>>([
    { ticketId: '301', issueDescription: 'Payment not reflected in my account', submissionDate: '2024-06-01', resolutionStatus: 'Open', taxpayerTIN: '5001', taxpayerName: 'Bokul Mia' },
    { ticketId: '302', issueDescription: 'How to file return?', submissionDate: '2024-06-02', resolutionStatus: 'In Progress', taxpayerTIN: '5002', taxpayerName: 'Cina Akter' },
  ]);

  // Count open tickets for notification
  const openTicketCount = ticketsState.filter(t => t.resolutionStatus === 'Open').length;

  // Handler for changing ticket status
  const handleTicketStatusChange = (ticketId: string, newStatus: 'Open' | 'In Progress' | 'Resolved' | 'Closed') => {
    setTicketsState(prev =>
      prev.map(t => t.ticketId === ticketId ? { ...t, resolutionStatus: newStatus } : t)
    );
  };

  // Notification click handler
  const handleNotificationClick = () => {
    setActiveView('support');
    setShowNotificationPopup(false);
  };

  const handleSaveProfile = () => {
    // TODO: Integrate with Django API to update officer profile
    setShowEditProfile(false);
  };

  const handleChangePassword = () => {
    // TODO: Integrate with Django API to change officer password
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Add Taxpayer handler (auto TIN)
  const handleAddTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Django API to add taxpayer
    setShowAddTaxpayer(false);
    setNewTaxpayer({
      firstName: '', lastName: '', dateOfBirth: '', gender: 'Male', houseNo: '', street: '', city: '', zipCode: '', username: '', password: '', phoneNumber1: '', phoneNumber2: '', phoneNumber3: '', zoneCode: '', zoneName: ''
    });
  };

  const handleEditTaxpayer = (taxpayer: any) => {
    setSelectedTaxpayerEdit(taxpayer);
    setNewTaxpayer({
      firstName: taxpayer.firstName || '',
      lastName: taxpayer.lastName || '',
      dateOfBirth: taxpayer.dateOfBirth || '',
      gender: taxpayer.gender || 'Male',
      houseNo: taxpayer.houseNo || '',
      street: taxpayer.street || '',
      city: taxpayer.city || '',
      zipCode: taxpayer.zipCode || '',
      username: taxpayer.username || '',
      password: taxpayer.password || '',
      phoneNumber1: taxpayer.phoneNumber1 || '',
      phoneNumber2: taxpayer.phoneNumber2 || '',
      phoneNumber3: taxpayer.phoneNumber3 || '',
      zoneCode: taxpayer.zoneCode || '',
      zoneName: taxpayer.zoneName || ''
    });
    setShowEditTaxpayer(true);
  };

  const handleUpdateTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Django API to update taxpayer
    setShowEditTaxpayer(false);
    setSelectedTaxpayerEdit(null);
    setNewTaxpayer({
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
  };

  const handleDeleteTaxpayer = () => {
    // TODO: Integrate with Django API to delete taxpayer
    // Example:
    // fetch(`/api/officer/taxpayers/${taxpayer.id}/`, { method: 'DELETE' })
    // ...existing code...
  };

  return (
    <div className="flex h-screen bg-gray-50">
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
              <h2 className="text-xl font-semibold">{officerProfile.firstName} {officerProfile.lastName}</h2>
              <p className="text-sm text-gray-600">Rank: {officerProfile.rank} | Branch: {officerProfile. branch}</p>
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
          {/* Dashboard view */}
          {activeView === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">Welcome, {officerProfile.firstName}!</h2>
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
                    <div className="text-3xl font-bold text-green-700">{taxpayerTaxData.filter(t => t.returnStatus === 'Paid').length}</div>
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
                  <button onClick={() => { setEditedProfile({ ...officerProfile }); setShowEditProfile(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium">
                    <Edit className="w-4 h-4" />Edit Details
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="text-sm text-gray-600 mb-1 block">Officer_ID</label><p className="text-lg font-semibold text-purple-600">{officerProfile.id}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">First_Name</label><p className="text-lg font-semibold">{officerProfile.firstName}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Last_Name</label><p className="text-lg font-semibold">{officerProfile.lastName}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Rank</label><p className="text-lg font-medium">{officerProfile.rank}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Branch</label><p className="text-lg font-medium">{officerProfile.branch}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">House_No</label><p className="text-lg font-medium">{officerProfile.houseNo}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Street</label><p className="text-lg font-medium">{officerProfile.street}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">City</label><p className="text-lg font-medium">{officerProfile.city}</p></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Zip_Code</label><p className="text-lg font-medium">{officerProfile.zipCode}</p></div>
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
                <button onClick={() => setShowAddTaxpayer(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium">
                  <UserPlus className="w-4 h-4" />Add Taxpayer
                </button>
              </div>
              <div className="bg-white rounded-lg shadow border overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50 border-b border-purple-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">TIN</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">First Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Last Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Date of Birth</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Gender</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">House No</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Street</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">City</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Zip Code</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Username</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Phone 1</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Phone 2</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Phone 3</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Zone Code</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-purple-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxpayers.map(t => (
                      <tr key={t.id} className="border-b border-purple-100 hover:bg-purple-50">
                        <td className="px-4 py-3 font-semibold text-purple-800">{t.id}</td>
                        <td className="px-4 py-3">{t.firstName}</td>
                        <td className="px-4 py-3">{t.lastName}</td>
                        <td className="px-4 py-3">{t.dateOfBirth || ''}</td>
                        <td className="px-4 py-3">{t.gender}</td>
                        <td className="px-4 py-3">{t.houseNo || ''}</td>
                        <td className="px-4 py-3">{t.street || ''}</td>
                        <td className="px-4 py-3">{t.city}</td>
                        <td className="px-4 py-3">{t.zipCode || ''}</td>
                        <td className="px-4 py-3">{t.username || ''}</td>
                        <td className="px-4 py-3">{t.phoneNumber1}</td>
                        <td className="px-4 py-3">{t.phoneNumber2 || ''}</td>
                        <td className="px-4 py-3">{t.phoneNumber3 || ''}</td>
                        <td className="px-4 py-3">{t.zoneCode || ''}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button onClick={() => handleEditTaxpayer(t)} className="p-2 hover:bg-purple-100 rounded-lg border border-purple-200"><Edit className="w-4 h-4 text-purple-700" /></button>
                          <button onClick={handleDeleteTaxpayer} className="p-2 hover:bg-purple-100 rounded-lg border border-purple-200"><Trash2 className="w-4 h-4 text-purple-700" /></button>
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
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">TIN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Gender</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">City</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Return ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Assessment Year</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Total Income</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Taxable Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Filing Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTaxpayers.map((t, i) => (
                        <tr
                          key={t.tin}
                          className={i % 2 === 0 ? "bg-purple-50" : "bg-white"}
                        >
                          <td className="px-4 py-3 text-sm font-semibold text-purple-600">{t.tin}</td>
                          <td className="px-4 py-3 text-sm font-medium">{t.firstName} {t.lastName}</td>
                          <td className="px-4 py-3 text-sm">{t.gender}</td>
                          <td className="px-4 py-3 text-sm">{t.city}</td>
                          <td className="px-4 py-3 text-sm font-semibold">#{t.returnId}</td>
                          <td className="px-4 py-3 text-sm">{t.assessmentYear}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-green-700">৳{Number(t.totalIncome).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-orange-600">৳{Number(t.taxableAmount).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">{t.filingDate}</td>
                          <td className="px-4 py-3 text-sm">{t.taxCategory}</td>
                          <td className="px-4 py-3 text-sm font-semibold">
                            {t.returnStatus === 'Pending'
                              ? 'Pending'
                              : t.returnStatus === 'Paid'
                              ? 'Paid'
                              : t.returnStatus === 'Rejected'
                              ? 'Rejected'
                              : ''}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {t.returnStatus === 'Pending' ? (
                              <div className="flex gap-2">
                                <button
                                  className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-xs font-bold"
                                  onClick={e => {
                                    e.preventDefault();
                                    setTaxpayerTaxData(prev =>
                                      prev.map(row =>
                                        row.tin === t.tin
                                          ? { ...row, returnStatus: 'Paid' }
                                          : row
                                      )
                                    );
                                    alert('Payment accepted! Status changed to Paid.');
                                  }}
                                >
                                  Accept
                                </button>
                                <button
                                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-xs font-bold"
                                  onClick={e => {
                                    e.preventDefault();
                                    setTaxpayerTaxData(prev =>
                                      prev.map(row =>
                                        row.tin === t.tin
                                          ? { ...row, returnStatus: 'Rejected' }
                                          : row
                                      )
                                    );
                                    alert('Payment rejected! Status changed to Rejected.');
                                  }}
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination and summary block - only once, outside table */}
                <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50 mt-4">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, taxpayerTaxData.length)} of {taxpayerTaxData.length} entries
                  </div>
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
            </div>
          )}

          {/* Simplified support view */}
          {activeView === 'support' && (
            <SupportTickets
              userType="officer"
              tickets={ticketsState}
              onStatusChange={handleTicketStatusChange}
            />
          )}

          {selectedTaxpayer !== null && (
            <div className="bg-white rounded-lg shadow border p-6">
              <h4 className="text-lg mb-4 font-semibold text-purple-700">Selected Taxpayer Details</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div><label className="text-sm text-gray-600 mb-1 block">TIN</label><p className="text-lg font-semibold text-purple-600">{taxpayerTaxData[selectedTaxpayer].tin}</p></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Full Name</label><p className="text-lg font-semibold">{taxpayerTaxData[selectedTaxpayer].firstName} {taxpayerTaxData[selectedTaxpayer].lastName}</p></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Gender</label><p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].gender}</p></div>
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
                <div><label className="block text-sm mb-2 font-medium">First_Name *</label><input type="text" value={editedProfile.firstName} onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last_Name *</label><input type="text" value={editedProfile.lastName} onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Rank *</label><input type="text" value={editedProfile.rank} onChange={(e) => setEditedProfile({ ...editedProfile, rank: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Branch *</label><input type="text" value={editedProfile.branch} onChange={(e) => setEditedProfile({ ...editedProfile, branch: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">House_No *</label><input type="text" value={editedProfile.houseNo} onChange={(e) => setEditedProfile({ ...editedProfile, houseNo: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Street *</label><input type="text" value={editedProfile.street} onChange={(e) => setEditedProfile({ ...editedProfile, street: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={editedProfile.city} onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zip_Code *</label><input type="text" value={editedProfile.zipCode} onChange={(e) => setEditedProfile({ ...editedProfile, zipCode: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone *</label><input type="tel" value={editedProfile.phone} onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
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
              <div><label className="block text-sm mb-2 font-medium">Current Password *</label><input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">New Password *</label><input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">Confirm Password *</label><input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-sm text-red-600">⚠️ Passwords do not match! </p></div>
              )}
              <div className="flex gap-3 pt-4">
                <button onClick={handleChangePassword} disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword} className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 font-semibold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />Change Password
                </button>
                <button onClick={() => setShowChangePassword(false)} className="px-6 py-3 rounded-lg border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold">Cancel</button>
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
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, firstName: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Date of Birth *</label><input type="date" value={newTaxpayer.dateOfBirth} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, dateOfBirth: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Gender *</label><select value={newTaxpayer.gender} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400"><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">House No *</label><input type="text" value={newTaxpayer.houseNo} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, houseNo: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Street *</label><input type="text" value={newTaxpayer.street} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, street: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={newTaxpayer.city} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zip Code *</label><input type="text" value={newTaxpayer.zipCode} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zipCode: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Username *</label><input type="text" value={newTaxpayer.username} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, username: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Password *</label><input type="password" value={newTaxpayer.password} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, password: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone Number 1 *</label><input type="tel" value={newTaxpayer.phoneNumber1} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone Number 2</label><input type="tel" value={newTaxpayer.phoneNumber2} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber2: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone Number 3</label><input type="tel" value={newTaxpayer.phoneNumber3} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber3: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zone Code *</label><input type="text" value={newTaxpayer.zoneCode} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zoneCode: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-semibold">Add Taxpayer</button>
                <button type="button" onClick={() => setShowAddTaxpayer(false)} className="flex-1 py-3 rounded-lg border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Taxpayer Modal */}
      {showEditTaxpayer && selectedTaxpayerEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b"><h3 className="text-xl font-semibold">Edit Taxpayer #{selectedTaxpayerEdit.id}</h3></div>
            <form onSubmit={handleUpdateTaxpayer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, firstName: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Date of Birth *</label><input type="date" value={newTaxpayer.dateOfBirth} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, dateOfBirth: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Gender *</label><select value={newTaxpayer.gender} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400"><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">House No *</label><input type="text" value={newTaxpayer.houseNo} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, houseNo: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Street *</label><input type="text" value={newTaxpayer.street} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, street: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={newTaxpayer.city} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zip Code *</label><input type="text" value={newTaxpayer.zipCode} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zipCode: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Username *</label><input type="text" value={newTaxpayer.username} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, username: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone Number 1 *</label><input type="tel" value={newTaxpayer.phoneNumber1} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone Number 2</label><input type="tel" value={newTaxpayer.phoneNumber2} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber2: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone Number 3</label><input type="tel" value={newTaxpayer.phoneNumber3} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber3: e.target.value })} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zone Code *</label><input type="text" value={newTaxpayer.zoneCode} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zoneCode: e.target.value })} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-semibold">Update Taxpayer</button>
                <button type="button" onClick={() => { setShowEditTaxpayer(false); setSelectedTaxpayerEdit(null); }} className="flex-1 py-3 rounded-lg border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification popup - only one instance, not duplicated */}
      {/* {showNotificationPopup && officerUnreadCount > 0 && (
        <div className="absolute right-8 top-20 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="p-4">
            {tickets.filter(t => t.unreadForOfficer).map(t => (
              <div
                key={t.id}
                className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100"
                onClick={() => { handleNotificationClick(); setSelectedTicketId(t.id); }}
              >
                <Ticket className="w-5 h-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New ticket from {t.taxpayerName}</p>
                  <p className="text-xs text-gray-600 mt-1">{t.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}