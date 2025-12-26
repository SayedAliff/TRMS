import { useState } from 'react';
import { Home, HelpCircle, LogOut, UserCheck, Ticket, FileText, UserCog, UserPlus, Edit, Trash2, Phone, MapPin, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { User } from '../App';
import { SupportTickets } from './SupportTickets';

interface JuniorOfficerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'taxpayers' | 'tax-list' | 'support';

export function JuniorOfficerDashboard({ user, onLogout }: JuniorOfficerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<number | null>(null);
  const [showAddTaxpayer, setShowAddTaxpayer] = useState(false);
  const [showEditTaxpayer, setShowEditTaxpayer] = useState(false);
  const [selectedTaxpayerEdit, setSelectedTaxpayerEdit] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const taxpayersPerPage = 5;
  
  const [newTaxpayer, setNewTaxpayer] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    city: '',
    phoneNumber1: '',
    zoneName: ''
  });

  const stats = {
    totalTaxpayers: 5,
    openTickets: 3,
    resolvedToday: 2
  };

  const recentActivity = [
    { id: 1, text: 'New ticket #303 from TIN 5003', time: '1 hour ago' },
    { id: 2, text: 'Ticket #300 resolved for TIN 5000', time: '3 hours ago' },
    { id: 3, text: 'New taxpayer registered:  TIN 5004', time: '1 day ago' },
  ];

  const [taxpayers, setTaxpayers] = useState([
    { id: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city: 'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North' },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka South' },
    { id: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName:  'Chittagong Zone' },
    { id: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet Zone' },
    { id: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi Zone' },
  ]);

  const taxpayerTaxData = [
    { tin: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city:  'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North', zoneCode: '100', returnId: '200', assessmentYear: '2024-2025', totalIncome: '500000', taxableAmount: '50000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Salaried Individual', officerId: '1000', returnStatus: 'Completed' },
    { tin: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka North', zoneCode: '100', returnId: '201', assessmentYear: '2024-2025', totalIncome: '1200000', taxableAmount: '120000', filingDate: '13-DEC-2025', taxCategory: 'Corporate', taxType: 'Limited Company', officerId: '1000', returnStatus: 'Completed' },
    { tin: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName: 'Chittagong', zoneCode: '101', returnId: '202', assessmentYear: '2024-2025', totalIncome: '350000', taxableAmount: '35000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Business Owner', officerId: '1001', returnStatus: 'Pending' },
    { tin: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet', zoneCode: '102', returnId: '203', assessmentYear: '2024-2025', totalIncome: '800000', taxableAmount: '80000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Professional', officerId: '1002', returnStatus: 'Completed' },
    { tin: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi', zoneCode: '103', returnId: '204', assessmentYear: '2024-2025', totalIncome: '450000', taxableAmount: '45000', filingDate: '13-DEC-2025', taxCategory: 'Individual', taxType: 'Self Employed', officerId: '1000', returnStatus: 'Completed' }
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

  const handleAddTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    const nextTaxpayerId = (5000 + taxpayers.length).toString();
    const newTax = { id: nextTaxpayerId, ...newTaxpayer };
    setTaxpayers([... taxpayers, newTax]);
    alert(`Taxpayer Added Successfully!\n\nTIN: ${nextTaxpayerId}\nName: ${newTaxpayer.firstName} ${newTaxpayer.lastName}`);
    setShowAddTaxpayer(false);
    setNewTaxpayer({ firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };

  const handleEditTaxpayer = (taxpayer: any) => {
    setSelectedTaxpayerEdit(taxpayer);
    setNewTaxpayer({ firstName: taxpayer.firstName, lastName: taxpayer.lastName, gender: taxpayer.gender, city: taxpayer.city, phoneNumber1: taxpayer.phoneNumber1, zoneName: taxpayer.zoneName });
    setShowEditTaxpayer(true);
  };

  const handleUpdateTaxpayer = (e:  React.FormEvent) => {
    e.preventDefault();
    const updatedTaxpayers = taxpayers.map(tax => tax.id === selectedTaxpayerEdit.id ? { ...tax, ...newTaxpayer } : tax);
    setTaxpayers(updatedTaxpayers);
    alert(`Taxpayer #${selectedTaxpayerEdit.id} Updated Successfully! `);
    setShowEditTaxpayer(false);
    setSelectedTaxpayerEdit(null);
    setNewTaxpayer({ firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };

  const handleDeleteTaxpayer = (taxpayer: any) => {
    if (confirm(`Are you sure you want to delete Taxpayer TIN #${taxpayer.id}?`)) {
      const updatedTaxpayers = taxpayers.filter(tax => tax. id !== taxpayer.id);
      setTaxpayers(updatedTaxpayers);
      alert(`Taxpayer TIN #${taxpayer.id} deleted successfully!`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-purple-700">Junior Officer Portal</h1>
        </div>
        <nav className="flex-1 p-4">
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'dashboard' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button onClick={() => setActiveView('taxpayers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'taxpayers' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <UserCog className="w-5 h-5" />
            <span>Manage Taxpayers</span>
          </button>
          <button onClick={() => setActiveView('tax-list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'tax-list' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <FileText className="w-5 h-5" />
            <span>Tax List</span>
          </button>
          <button onClick={() => setActiveView('support')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeView === 'support' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-50'}`}>
            <HelpCircle className="w-5 h-5" />
            <span>Support Tickets</span>
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
              <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-gray-600">Rank: {user.rank} | Branch: {user.branch}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">Officer ID: {user.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {user. firstName[0]}{user.lastName[0]}
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
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Taxpayers</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.totalTaxpayers}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Ticket className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Open Tickets</p>
                      <p className="text-3xl font-bold text-orange-600">{stats.openTickets}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <Ticket className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Resolved Today</p>
                      <p className="text-3xl font-bold text-green-600">{stats.resolvedToday}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg mb-4 font-semibold">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity. id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
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

          {activeView === 'taxpayers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Manage Taxpayers</h3>
                <button onClick={() => setShowAddTaxpayer(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover: opacity-90 transition-all font-medium">
                  <UserPlus className="w-4 h-4" />
                  Add Taxpayer
                </button>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">TIN</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Gender</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">City</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Zone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxpayers.map((taxpayer) => (
                      <tr key={taxpayer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm">#{taxpayer.id}</td>
                        <td className="px-6 py-4 text-sm font-medium">{taxpayer.firstName} {taxpayer.lastName}</td>
                        <td className="px-6 py-4 text-sm">{taxpayer.gender}</td>
                        <td className="px-6 py-4 text-sm">{taxpayer.city}</td>
                        <td className="px-6 py-4 text-sm">{taxpayer.phoneNumber1}</td>
                        <td className="px-6 py-4 text-sm">{taxpayer.zoneName}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button onClick={() => handleEditTaxpayer(taxpayer)} className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button onClick={() => handleDeleteTaxpayer(taxpayer)} className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {showAddTaxpayer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-semibold">Add New Taxpayer</h3>
                      <p className="text-sm text-gray-600 mt-1">TIN will be auto-generated</p>
                    </div>
                    <form onSubmit={handleAddTaxpayer} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2 font-medium">First Name *</label>
                          <input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, firstName: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Last Name *</label>
                          <input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Gender *</label>
                          <select value={newTaxpayer. gender} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus: border-purple-400 transition-colors">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">City *</label>
                          <input type="text" value={newTaxpayer.city} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Phone Number *</label>
                          <input type="tel" value={newTaxpayer.phoneNumber1} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Zone Name *</label>
                          <input type="text" value={newTaxpayer.zoneName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zoneName: e. target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors" />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button type="submit" className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover: opacity-90 transition-all font-semibold">Add Taxpayer</button>
                        <button type="button" onClick={() => setShowAddTaxpayer(false)} className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {showEditTaxpayer && selectedTaxpayerEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-semibold">Edit Taxpayer #{selectedTaxpayerEdit. id}</h3>
                    </div>
                    <form onSubmit={handleUpdateTaxpayer} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2 font-medium">First Name *</label>
                          <input type="text" value={newTaxpayer.firstName} onChange={(e) => setNewTaxpayer({ ... newTaxpayer, firstName:  e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Last Name *</label>
                          <input type="text" value={newTaxpayer.lastName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Gender *</label>
                          <select value={newTaxpayer.gender} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus: outline-none focus:border-purple-400 transition-colors">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">City *</label>
                          <input type="text" value={newTaxpayer. city} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus: border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Phone Number *</label>
                          <input type="tel" value={newTaxpayer.phoneNumber1} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target. value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus: outline-none focus:border-purple-400 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2 font-medium">Zone Name *</label>
                          <input type="text" value={newTaxpayer.zoneName} onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zoneName: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus: border-purple-400 transition-colors" />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button type="submit" className="flex-1 py-3 rounded-lg bg-green-600 text-white hover: opacity-90 transition-all font-semibold">Update Taxpayer</button>
                        <button type="button" onClick={() => { setShowEditTaxpayer(false); setSelectedTaxpayerEdit(null); }} className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'tax-list' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl mb-2 font-semibold text-purple-700">Tax List - All Taxpayers</h3>
                    <p className="text-sm text-gray-600">Complete tax return details for all registered taxpayers</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">TIN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Gender</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">City</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Zone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Return ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Assessment Year</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Total Income</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Taxable Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Filing Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTaxpayers.map((taxpayer, index) => (
                        <tr key={taxpayer.tin} className="border-b border-gray-100 hover:bg-purple-50 transition-colors cursor-pointer" onClick={() => setSelectedTaxpayer(selectedTaxpayer === startIndex + index ? null : startIndex + index)}>
                          <td className="px-4 py-3 text-sm font-semibold text-purple-600">{taxpayer.tin}</td>
                          <td className="px-4 py-3 text-sm font-medium">{taxpayer.firstName} {taxpayer.lastName}</td>
                          <td className="px-4 py-3 text-sm">{taxpayer.gender}</td>
                          <td className="px-4 py-3 text-sm">{taxpayer.city}</td>
                          <td className="px-4 py-3 text-sm">{taxpayer.phoneNumber1}</td>
                          <td className="px-4 py-3 text-sm">{taxpayer.zoneName} ({taxpayer.zoneCode})</td>
                          <td className="px-4 py-3 text-sm font-semibold">#{taxpayer.returnId}</td>
                          <td className="px-4 py-3 text-sm">{taxpayer.assessmentYear}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-green-700">৳{Number(taxpayer.totalIncome).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-orange-600">৳{Number(taxpayer.taxableAmount).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">{taxpayer.filingDate}</td>
                          <td className="px-4 py-3 text-sm">{taxpayer.taxCategory}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${taxpayer.returnStatus === 'Completed' ?  'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {taxpayer.returnStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50 mt-4 rounded-b-lg">
                  <div className="text-sm text-gray-600 font-medium">
                    Showing {startIndex + 1} to {Math.min(endIndex, taxpayerTaxData.length)} of {taxpayerTaxData.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handlePrevious} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition-all font-medium ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' :  'hover:bg-gray-100'}`}>
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} onClick={() => { setCurrentPage(page); setSelectedTaxpayer(null); }} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all font-semibold ${currentPage === page ? 'bg-purple-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 border border-gray-300'}`}>
                          {page}
                        </button>
                      ))}
                    </div>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition-all font-medium ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' :  'hover:bg-gray-100'}`}>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {selectedTaxpayer !== null && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h4 className="text-lg mb-4 font-semibold text-purple-700">Selected Taxpayer Details</h4>
                  <div className="grid grid-cols-1 md: grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">TIN</label>
                      <p className="text-lg font-semibold text-purple-600">{taxpayerTaxData[selectedTaxpayer].tin}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                      <p className="text-lg font-semibold">{taxpayerTaxData[selectedTaxpayer].firstName} {taxpayerTaxData[selectedTaxpayer].lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                      <p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].gender}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">City</label>
                      <p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].city}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><Phone className="w-4 h-4" />Phone Number</label>
                      <p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].phoneNumber1}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><MapPin className="w-4 h-4" />Tax Zone</label>
                      <p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer]. zoneName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Return ID</label>
                      <p className="text-lg font-semibold">#{taxpayerTaxData[selectedTaxpayer].returnId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Assessment Year</label>
                      <p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].assessmentYear}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><DollarSign className="w-4 h-4" />Total Income</label>
                      <p className="text-lg font-semibold text-green-700">৳{Number(taxpayerTaxData[selectedTaxpayer].totalIncome).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2"><DollarSign className="w-4 h-4" />Taxable Amount</label>
                      <p className="text-lg font-semibold text-orange-600">৳{Number(taxpayerTaxData[selectedTaxpayer].taxableAmount).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Tax Category</label>
                      <p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer]. taxCategory}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Tax Type</label>
                      <p className="text-lg font-semibold text-purple-600">{taxpayerTaxData[selectedTaxpayer].taxType}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Assigned Officer ID</label>
                      <p className="text-lg font-medium">{taxpayerTaxData[selectedTaxpayer].officerId}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'support' && <SupportTickets userType="officer" />}
        </div>
      </main>
    </div>
  );
}