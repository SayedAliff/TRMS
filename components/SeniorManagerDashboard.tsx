import { useState } from 'react';
import { Home, Users, Shield, HelpCircle, LogOut, UserPlus, Edit, Trash2, TrendingUp, TrendingDown, UserCog, FileText, CheckCircle, XCircle, Phone, MapPin, Key, Bell } from 'lucide-react';
import { User } from '../App';
import { AuditLogs } from './AuditLogs';
import { SupportTickets } from './SupportTickets';

interface SeniorManagerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'officers' | 'taxpayers' | 'tax-list' | 'audit-logs' | 'support';

export function SeniorManagerDashboard({ user, onLogout }: SeniorManagerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [showAddOfficer, setShowAddOfficer] = useState(false);
  const [showEditOfficer, setShowEditOfficer] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState<any>(null);
  const [showAddTaxpayer, setShowAddTaxpayer] = useState(false);
  const [showEditTaxpayer, setShowEditTaxpayer] = useState(false);
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<any>(null);
  const [showChangePasswordOfficer, setShowChangePasswordOfficer] = useState(false);
  const [showChangePasswordTaxpayer, setShowChangePasswordTaxpayer] = useState(false);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [supportNotifications, setSupportNotifications] = useState(2);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  
  const [newOfficer, setNewOfficer] = useState({
    firstName: '',
    lastName: '',
    rank: 'Inspector',
    branch: ''
  });
  
  const [newTaxpayer, setNewTaxpayer] = useState({
    firstName: '',
    lastName:  '',
    gender: 'Male',
    city: '',
    phoneNumber1: '',
    zoneName: ''
  });

  const [juniorOfficers, setJuniorOfficers] = useState([
    { id: '1000', firstName: 'Rahim', lastName: 'Uddin', rank: 'Inspector', branch: 'Gulshan' },
    { id:  '1002', firstName: 'Siaam', lastName: 'Khan', rank: 'Officer', branch: 'Motijheel' },
    { id: '1003', firstName:  'Nadia', lastName: 'Islam', rank: 'Assistant', branch: 'Zindabazar' },
    { id: '1004', firstName: 'Fahim', lastName: 'Hossain', rank: 'Inspector', branch: 'New Market' },
  ]);
  
  const [taxpayers, setTaxpayers] = useState([
    { id: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city: 'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North' },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka South' },
    { id: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName: 'Chittagong Zone' },
    { id: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet Zone' },
    { id: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi Zone' },
  ]);

  const comprehensiveTaxData = [
    { tin: '5000', taxpayerName: 'Abul Kalam', gender: 'Male', city: 'Dhaka', phone: '01711111111', zone: 'Dhaka North', returnId: '200', assessmentYear: '2024-2025', totalIncome: '500000', taxableAmount: '50000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin', assignedOfficerId: '1000', assignedOfficerName: 'Rahim Uddin', ticketsResolved: 2, category: 'Individual' },
    { tin: '5001', taxpayerName: 'Bokul Mia', gender: 'Male', city:  'Dhaka', phone:  '01922222222', zone:  'Dhaka South', returnId: '201', assessmentYear: '2024-2025', totalIncome: '1200000', taxableAmount: '120000', paymentStatus: 'Paid', paymentConfirmedBy: '1002', paymentConfirmedByName: 'Siaam Khan', assignedOfficerId: '1002', assignedOfficerName: 'Siaam Khan', ticketsResolved: 3, category: 'Corporate' },
    { tin: '5002', taxpayerName:  'Cina Akter', gender: 'Female', city: 'Chittagong', phone: '01733333333', zone: 'Chittagong Zone', returnId: '202', assessmentYear: '2024-2025', totalIncome: '350000', taxableAmount: '35000', paymentStatus: 'Pending', paymentConfirmedBy:  null, paymentConfirmedByName: '-', assignedOfficerId: '1003', assignedOfficerName: 'Nadia Islam', ticketsResolved: 1, category: 'Individual' },
    { tin: '5003', taxpayerName: 'David Roy', gender: 'Male', city: 'Sylhet', phone: '01844444444', zone: 'Sylhet Zone', returnId: '203', assessmentYear: '2024-2025', totalIncome: '800000', taxableAmount: '80000', paymentStatus: 'Paid', paymentConfirmedBy:  '1003', paymentConfirmedByName: 'Nadia Islam', assignedOfficerId: '1003', assignedOfficerName: 'Nadia Islam', ticketsResolved: 0, category: 'Individual' },
    { tin: '5004', taxpayerName:  'Eva Rahman', gender: 'Female', city: 'Rajshahi', phone: '01555555555', zone: 'Rajshahi Zone', returnId: '204', assessmentYear:  '2024-2025', totalIncome: '450000', taxableAmount: '45000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin', assignedOfficerId:  '1004', assignedOfficerName:  'Fahim Hossain', ticketsResolved: 1, category:  'Individual' }
  ];

  const stats = {
    totalOfficers: juniorOfficers.length,
    totalTaxpayers: taxpayers.length,
    pendingAudits: 3,
    totalRevenue: '330,000'
  };

  const handleNotificationClick = () => {
    setActiveView('support');
    setShowNotificationPopup(false);
  };

  const handleAddOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    const nextOfficerId = (1000 + juniorOfficers.length + 1).toString();
    setJuniorOfficers([... juniorOfficers, { id: nextOfficerId, ... newOfficer }]);
    alert(`Officer Added!\nID: ${nextOfficerId}\nName: ${newOfficer.firstName} ${newOfficer.lastName}`);
    setShowAddOfficer(false);
    setNewOfficer({ firstName:  '', lastName: '', rank: 'Inspector', branch: '' });
  };

  const handleEditOfficer = (officer: any) => {
    setSelectedOfficer(officer);
    setNewOfficer({ firstName: officer.firstName, lastName: officer.lastName, rank: officer.rank, branch: officer.branch });
    setShowEditOfficer(true);
  };

  const handleUpdateOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    setJuniorOfficers(juniorOfficers.map(off => off.id === selectedOfficer. id ? { ...off, ...newOfficer } :  off));
    alert(`Officer #${selectedOfficer.id} Updated! `);
    setShowEditOfficer(false);
    setSelectedOfficer(null);
    setNewOfficer({ firstName:  '', lastName: '', rank: 'Inspector', branch: '' });
  };

  const handlePromote = (officer: any) => {
    const rankOrder = ['Assistant', 'Officer', 'Inspector', 'Senior Manager'];
    const idx = rankOrder.indexOf(officer. rank);
    if (idx < rankOrder.length - 1) {
      const newRank = rankOrder[idx + 1];
      setJuniorOfficers(juniorOfficers.map(off => off.id === officer.id ? { ...off, rank: newRank } : off));
      alert(`Officer #${officer.id} promoted to ${newRank}!`);
    }
  };

  const handleDemote = (officer: any) => {
    const rankOrder = ['Assistant', 'Officer', 'Inspector', 'Senior Manager'];
    const idx = rankOrder.indexOf(officer.rank);
    if (idx > 0) {
      const newRank = rankOrder[idx - 1];
      setJuniorOfficers(juniorOfficers.map(off => off.id === officer. id ? { ...off, rank: newRank } : off));
      alert(`Officer #${officer.id} demoted to ${newRank}!`);
    }
  };

  const handleDelete = (officer: any) => {
    if (confirm(`Delete Officer #${officer.id}?`)) {
      setJuniorOfficers(juniorOfficers.filter(off => off. id !== officer.id));
      alert(`Officer #${officer.id} deleted!`);
    }
  };

  const handleChangePasswordOfficer = (officer: any) => {
    setSelectedUserForPassword(officer);
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePasswordOfficer(true);
  };

  const handleSubmitPasswordOfficer = (e: React. FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { alert('Passwords do not match!'); return; }
    if (newPassword.length < 4) { alert('Password must be 4+ chars!'); return; }
    alert(`Password changed for Officer #${selectedUserForPassword.id}!\nNew: ${newPassword}`);
    setShowChangePasswordOfficer(false);
    setSelectedUserForPassword(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddTaxpayer = (e:  React.FormEvent) => {
    e.preventDefault();
    const nextTaxpayerId = (5000 + taxpayers.length).toString();
    setTaxpayers([...taxpayers, { id: nextTaxpayerId, ...newTaxpayer }]);
    alert(`Taxpayer Added!\nTIN: ${nextTaxpayerId}\nName: ${newTaxpayer.firstName} ${newTaxpayer.lastName}`);
    setShowAddTaxpayer(false);
    setNewTaxpayer({ firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };

  const handleEditTaxpayer = (taxpayer: any) => {
    setSelectedTaxpayer(taxpayer);
    setNewTaxpayer({ firstName: taxpayer.firstName, lastName: taxpayer.lastName, gender: taxpayer.gender, city: taxpayer.city, phoneNumber1: taxpayer.phoneNumber1, zoneName: taxpayer.zoneName });
    setShowEditTaxpayer(true);
  };

  const handleUpdateTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    setTaxpayers(taxpayers.map(tax => tax.id === selectedTaxpayer.id ? { ...tax, ... newTaxpayer } : tax));
    alert(`Taxpayer #${selectedTaxpayer. id} Updated!`);
    setShowEditTaxpayer(false);
    setSelectedTaxpayer(null);
    setNewTaxpayer({ firstName:  '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };

  const handleDeleteTaxpayer = (taxpayer: any) => {
    if (confirm(`Delete Taxpayer TIN #${taxpayer.id}?`)) {
      setTaxpayers(taxpayers. filter(tax => tax.id !== taxpayer.id));
      alert(`Taxpayer TIN #${taxpayer.id} deleted!`);
    }
  };

  const handleChangePasswordTaxpayer = (taxpayer: any) => {
    setSelectedUserForPassword(taxpayer);
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePasswordTaxpayer(true);
  };

  const handleSubmitPasswordTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { alert('Passwords do not match!'); return; }
    if (newPassword.length < 4) { alert('Password must be 4+ chars!'); return; }
    alert(`Password changed for Taxpayer TIN #${selectedUserForPassword.id}!\nNew: ${newPassword}`);
    setShowChangePasswordTaxpayer(false);
    setSelectedUserForPassword(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-red-700">Senior Manager Portal</h1>
          </div>
          <nav className="flex-1 p-4">
            <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'dashboard' ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' : 'text-gray-700 hover:bg-red-50'}`}>
              <Home className="w-5 h-5" /><span>Dashboard</span>
            </button>
            <button onClick={() => setActiveView('officers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'officers' ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' : 'text-gray-700 hover: bg-red-50'}`}>
              <Users className="w-5 h-5" /><span>Manage Officers</span>
            </button>
            <button onClick={() => setActiveView('taxpayers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'taxpayers' ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' :  'text-gray-700 hover:bg-red-50'}`}>
              <UserCog className="w-5 h-5" /><span>Manage Taxpayers</span>
            </button>
            <button onClick={() => setActiveView('tax-list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'tax-list' ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' :  'text-gray-700 hover:bg-red-50'}`}>
              <FileText className="w-5 h-5" /><span>Tax List</span>
            </button>
            <button onClick={() => setActiveView('audit-logs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'audit-logs' ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' : 'text-gray-700 hover:bg-red-50'}`}>
              <Shield className="w-5 h-5" /><span>Audit Logs</span>
            </button>
            <button onClick={() => setActiveView('support')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'support' ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' : 'text-gray-700 hover:bg-red-50'}`}>
              <HelpCircle className="w-5 h-5" /><span>Support</span>
              {supportNotifications > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{supportNotifications}</span>}
            </button>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow hover:opacity-90">
              <LogOut className="w-5 h-5" /><span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-sm text-gray-600">Rank: {user.rank} | Branch: {user.branch}</p>
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
                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100" onClick={handleNotificationClick}>
                          <Bell className="w-5 h-5 text-red-600 mt-0.5" />
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
                  <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">Officer ID: {user.id}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white">{user.firstName[0]}{user.lastName[0]}</div>
              </div>
            </div>
          </header>

          <div className="p-8">
            {activeView === 'dashboard' && (
              <>
                <div className="mb-6 p-4 rounded-lg bg-red-50">
                  <p className="text-sm font-semibold text-red-700">Role: senior_manager_role</p>
                  <p className="text-xs text-gray-600 mt-1">Permissions: ALL on Taxpayer, Tax_Return, Payment, Audit_Log | Full CRUD on Officers</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center"><Users className="w-6 h-6 text-red-700" /></div>
                      <div><p className="text-sm text-gray-500 mb-1">Junior Officers</p><p className="text-3xl font-bold text-red-700">{stats.totalOfficers}</p></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"><Users className="w-6 h-6 text-blue-700" /></div>
                      <div><p className="text-sm text-gray-500 mb-1">Total Taxpayers</p><p className="text-3xl font-bold text-blue-700">{stats.totalTaxpayers}</p></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center"><Shield className="w-6 h-6 text-red-700" /></div>
                      <div><p className="text-sm text-gray-500 mb-1">Pending Audits</p><p className="text-3xl font-bold text-red-700">{stats.pendingAudits}</p></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center"><Users className="w-6 h-6 text-green-700" /></div>
                      <div><p className="text-sm text-gray-500 mb-1">Total Revenue</p><p className="text-3xl font-bold text-green-700">{stats.totalRevenue} BDT</p></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'officers' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Manage Junior Officers</h3>
                  <button onClick={() => setShowAddOfficer(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 text-white hover: opacity-90">
                    <UserPlus className="w-4 h-4" />Add Officer
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        {['Officer ID', 'Name', 'Rank', 'Branch', 'Actions'].map(h => (
                          <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {juniorOfficers.map(o => (
                        <tr key={o.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4">#{o.id}</td>
                          <td className="px-6 py-4 font-medium">{o.firstName} {o.lastName}</td>
                          <td className="px-6 py-4">{o.rank}</td>
                          <td className="px-6 py-4">{o.branch}</td>
                          <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleEditOfficer(o)} className="p-2 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4 text-blue-600" /></button>
                            <button onClick={() => handleChangePasswordOfficer(o)} className="p-2 hover:bg-purple-50 rounded-lg"><Key className="w-4 h-4 text-purple-600" /></button>
                            <button onClick={() => handlePromote(o)} className="p-2 hover:bg-green-50 rounded-lg"><TrendingUp className="w-4 h-4 text-green-600" /></button>
                            <button onClick={() => handleDemote(o)} className="p-2 hover:bg-orange-50 rounded-lg"><TrendingDown className="w-4 h-4 text-orange-600" /></button>
                            <button onClick={() => handleDelete(o)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-600" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'taxpayers' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Manage Taxpayers</h3>
                  <button onClick={() => setShowAddTaxpayer(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 text-white hover:opacity-90">
                    <UserPlus className="w-4 h-4" />Add Taxpayer
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
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
                        <tr key={t.id} className="border-b hover: bg-gray-50">
                          <td className="px-6 py-4">#{t. id}</td>
                          <td className="px-6 py-4 font-medium">{t.firstName} {t.lastName}</td>
                          <td className="px-6 py-4">{t.gender}</td>
                          <td className="px-6 py-4">{t.city}</td>
                          <td className="px-6 py-4">{t.phoneNumber1}</td>
                          <td className="px-6 py-4">{t.zoneName}</td>
                          <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleEditTaxpayer(t)} className="p-2 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4 text-blue-600" /></button>
                            <button onClick={() => handleChangePasswordTaxpayer(t)} className="p-2 hover:bg-purple-50 rounded-lg"><Key className="w-4 h-4 text-purple-600" /></button>
                            <button onClick={() => handleDeleteTaxpayer(t)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-600" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'tax-list' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl mb-2 font-semibold text-blue-600">Tax List - All Taxpayers</h3>
                  <p className="text-sm text-gray-600">Complete overview with officer assignments and payment confirmations</p>
                </div>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  {juniorOfficers.map(o => {
                    const oTax = comprehensiveTaxData.filter(t => t.assignedOfficerId === o.id);
                    const tickets = oTax.reduce((s, t) => s + t.ticketsResolved, 0);
                    const payments = comprehensiveTaxData.filter(t => t.paymentConfirmedBy === o.id).length;
                    return (
                      <div key={o.id} className="bg-white rounded-lg shadow border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">{o.firstName[0]}{o.lastName[0]}</div>
                          <div>
                            <p className="text-sm font-semibold">{o.firstName} {o. lastName}</p>
                            <p className="text-xs text-gray-500">ID: {o.id}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs"><span className="text-gray-600">Taxpayers:</span><span className="font-semibold text-blue-600">{oTax.length}</span></div>
                          <div className="flex justify-between text-xs"><span className="text-gray-600">Payments:</span><span className="font-semibold text-green-600">{payments}</span></div>
                          <div className="flex justify-between text-xs"><span className="text-gray-600">Tickets:</span><span className="font-semibold text-orange-600">{tickets}</span></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b-2">
                        <tr>
                          {['TIN', 'Name', 'Gender', 'City', 'Zone', 'Return ID', 'Income', 'Tax', 'Officer', 'Payment', 'Confirmed', 'Tickets']. map(h => (
                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comprehensiveTaxData.map(r => (
                          <tr key={r.tin} className="border-b hover: bg-blue-50">
                            <td className="px-4 py-3 text-sm font-semibold text-blue-600">{r.tin}</td>
                            <td className="px-4 py-3 text-sm font-medium">{r.taxpayerName}</td>
                            <td className="px-4 py-3 text-sm">{r.gender}</td>
                            <td className="px-4 py-3 text-sm"><div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gray-400" />{r.city}</div></td>
                            <td className="px-4 py-3 text-sm">{r.zone}</td>
                            <td className="px-4 py-3 text-sm font-semibold">#{r.returnId}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-green-700">৳{Number(r.totalIncome).toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-orange-600">৳{Number(r.taxableAmount).toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm"><div><p className="font-semibold text-purple-600">{r.assignedOfficerName}</p><p className="text-xs text-gray-500">ID: {r.assignedOfficerId}</p></div></td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${r.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {r.paymentStatus === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}{r.paymentStatus}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">{r.paymentConfirmedBy ?  <div><p className="font-medium">{r.paymentConfirmedByName}</p><p className="text-xs text-gray-500">ID: {r.paymentConfirmedBy}</p></div> : <span className="text-gray-400">-</span>}</td>
                            <td className="px-4 py-3 text-sm text-center"><span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${r.ticketsResolved > 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>{r.ticketsResolved}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'audit-logs' && <AuditLogs />}
            {activeView === 'support' && <SupportTickets userType="officer" currentOfficerID={user.id} currentOfficerName={`${user.firstName} ${user. lastName}`} currentOfficerRank={user.rank} highlightUnread={true} onNotificationUpdate={setSupportNotifications} />}
          </div>
        </main>
      </div>

      {/* MODALS */}
      {showAddOfficer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b"><h3 className="text-xl font-semibold">Add New Officer</h3></div>
            <form onSubmit={handleAddOfficer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newOfficer.firstName} onChange={(e) => setNewOfficer({...newOfficer, firstName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newOfficer.lastName} onChange={(e) => setNewOfficer({... newOfficer, lastName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Rank *</label><select value={newOfficer.rank} onChange={(e) => setNewOfficer({...newOfficer, rank: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400"><option>Inspector</option><option>Officer</option><option>Assistant</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">Branch *</label><input type="text" value={newOfficer.branch} onChange={(e) => setNewOfficer({...newOfficer, branch: e. target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
              </div>
              <div className="flex gap-3"><button type="submit" className="flex-1 py-3 rounded-lg bg-red-700 text-white hover:opacity-90">Add</button><button type="button" onClick={() => setShowAddOfficer(false)} className="flex-1 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50">Cancel</button></div>
            </form>
          </div>
        </div>
      )}

      {showEditOfficer && selectedOfficer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b"><h3 className="text-xl font-semibold">Edit Officer #{selectedOfficer.id}</h3></div>
            <form onSubmit={handleUpdateOfficer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newOfficer.firstName} onChange={(e) => setNewOfficer({...newOfficer, firstName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newOfficer.lastName} onChange={(e) => setNewOfficer({...newOfficer, lastName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Rank *</label><select value={newOfficer.rank} onChange={(e) => setNewOfficer({...newOfficer, rank: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus: outline-none focus:border-red-400"><option>Inspector</option><option>Officer</option><option>Assistant</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">Branch *</label><input type="text" value={newOfficer.branch} onChange={(e) => setNewOfficer({...newOfficer, branch: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
              </div>
              <div className="flex gap-3"><button type="submit" className="flex-1 py-3 rounded-lg bg-red-700 text-white hover:opacity-90">Update</button><button type="button" onClick={() => setShowEditOfficer(false)} className="flex-1 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50">Cancel</button></div>
            </form>
          </div>
        </div>
      )}

      {showChangePasswordOfficer && selectedUserForPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Key className="w-5 h-5 text-purple-600" /></div><h3 className="text-xl font-semibold">Change Password</h3></div><p className="text-sm text-gray-600 mt-2">Officer:  {selectedUserForPassword.firstName} {selectedUserForPassword.lastName}</p></div>
            <form onSubmit={handleSubmitPasswordOfficer} className="p-6 space-y-4">
              <div><label className="block text-sm mb-2 font-medium">New Password *</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={4} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">Confirm *</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={4} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-sm text-red-600">⚠️ Passwords do not match! </p></div>}
              <div className="flex gap-3"><button type="button" onClick={() => { setShowChangePasswordOfficer(false); setSelectedUserForPassword(null); setNewPassword(''); setConfirmPassword(''); }} className="flex-1 py-3 rounded-lg border-2 text-gray-700">Cancel</button><button type="submit" className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:opacity-90">Change</button></div>
            </form>
          </div>
        </div>
      )}

      {showAddTaxpayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b"><h3 className="text-xl font-semibold">Add New Taxpayer</h3></div>
            <form onSubmit={handleAddTaxpayer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({...newTaxpayer, firstName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({...newTaxpayer, lastName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Gender *</label><select value={newTaxpayer.gender} onChange={(e) => setNewTaxpayer({...newTaxpayer, gender: e.target. value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400"><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={newTaxpayer. city} onChange={(e) => setNewTaxpayer({...newTaxpayer, city: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone *</label><input type="tel" value={newTaxpayer. phoneNumber1} onChange={(e) => setNewTaxpayer({...newTaxpayer, phoneNumber1: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zone *</label><input type="text" value={newTaxpayer.zoneName} onChange={(e) => setNewTaxpayer({...newTaxpayer, zoneName:  e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
              </div>
              <div className="flex gap-3"><button type="submit" className="flex-1 py-3 rounded-lg bg-red-700 text-white hover:opacity-90">Add</button><button type="button" onClick={() => setShowAddTaxpayer(false)} className="flex-1 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50">Cancel</button></div>
            </form>
          </div>
        </div>
      )}

      {showEditTaxpayer && selectedTaxpayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b"><h3 className="text-xl font-semibold">Edit Taxpayer #{selectedTaxpayer. id}</h3></div>
            <form onSubmit={handleUpdateTaxpayer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-2 font-medium">First Name *</label><input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({...newTaxpayer, firstName: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus: outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Last Name *</label><input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({...newTaxpayer, lastName: e.target. value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Gender *</label><select value={newTaxpayer.gender} onChange={(e) => setNewTaxpayer({...newTaxpayer, gender: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400"><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div><label className="block text-sm mb-2 font-medium">City *</label><input type="text" value={newTaxpayer.city} onChange={(e) => setNewTaxpayer({...newTaxpayer, city: e.target. value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Phone *</label><input type="tel" value={newTaxpayer.phoneNumber1} onChange={(e) => setNewTaxpayer({...newTaxpayer, phoneNumber1: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
                <div><label className="block text-sm mb-2 font-medium">Zone *</label><input type="text" value={newTaxpayer.zoneName} onChange={(e) => setNewTaxpayer({...newTaxpayer, zoneName: e.target. value})} required className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-400" /></div>
              </div>
              <div className="flex gap-3"><button type="submit" className="flex-1 py-3 rounded-lg bg-green-600 text-white hover:opacity-90">Update</button><button type="button" onClick={() => { setShowEditTaxpayer(false); setSelectedTaxpayer(null); }} className="flex-1 py-3 rounded-lg border-2 text-gray-700 hover:bg-gray-50">Cancel</button></div>
            </form>
          </div>
        </div>
      )}

      {showChangePasswordTaxpayer && selectedUserForPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Key className="w-5 h-5 text-purple-600" /></div><h3 className="text-xl font-semibold">Change Password</h3></div><p className="text-sm text-gray-600 mt-2">Taxpayer: {selectedUserForPassword.firstName} {selectedUserForPassword.lastName}</p></div>
            <form onSubmit={handleSubmitPasswordTaxpayer} className="p-6 space-y-4">
              <div><label className="block text-sm mb-2 font-medium">New Password *</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={4} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus: border-purple-400" /></div>
              <div><label className="block text-sm mb-2 font-medium">Confirm *</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={4} className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-400" /></div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && <div className="bg-red-50 border border-red-200 rounded p-3"><p className="text-sm text-red-600">⚠️ Passwords do not match!</p></div>}
              <div className="flex gap-3"><button type="button" onClick={() => { setShowChangePasswordTaxpayer(false); setSelectedUserForPassword(null); setNewPassword(''); setConfirmPassword(''); }} className="flex-1 py-3 rounded-lg border-2 text-gray-700">Cancel</button><button type="submit" className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:opacity-90">Change</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}