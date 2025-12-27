import { useState } from 'react';
import {
  Home, Users, Shield, HelpCircle, LogOut, UserPlus, Edit, Trash2,
  TrendingUp, TrendingDown, UserCog, FileText, CheckCircle, XCircle, MapPin
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  rank: string;
  branch: string;
}

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

  // Officer State
  const [juniorOfficers, setJuniorOfficers] = useState([
    { id: '1000', firstName: 'Rahim', lastName: 'Uddin', rank: 'Inspector', branch: 'Gulshan' },
    { id: '1002', firstName: 'Siaam', lastName: 'Khan', rank: 'Officer', branch: 'Motijheel' },
    { id: '1003', firstName: 'Nadia', lastName: 'Islam', rank: 'Assistant', branch: 'Zindabazar' },
    { id: '1004', firstName: 'Fahim', lastName: 'Hossain', rank: 'Inspector', branch: 'New Market' },
  ]);
  const [newOfficer, setNewOfficer] = useState({
    firstName: '', lastName: '', rank: 'Inspector', branch: ''
  });

  // Taxpayer State
  const [taxpayers, setTaxpayers] = useState([
    { id: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city: 'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North' },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka South' },
    { id: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName: 'Chittagong Zone' },
    { id: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet Zone' },
    { id: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi Zone' },
  ]);
  const [newTaxpayer, setNewTaxpayer] = useState({
    firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: ''
  });

  // Tax List Data
  const [comprehensiveTaxData] = useState([
    { tin: '5000', taxpayerName: 'Abul Kalam', gender: 'Male', city: 'Dhaka', phone: '01711111111', zone: 'Dhaka North', returnId: '200', assessmentYear: '2024-2025', totalIncome: '500000', taxableAmount: '50000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin', assignedOfficerId: '1000', assignedOfficerName: 'Rahim Uddin', ticketsResolved: 2 },
    { tin: '5001', taxpayerName: 'Bokul Mia', gender: 'Male', city: 'Dhaka', phone: '01922222222', zone: 'Dhaka South', returnId: '201', assessmentYear: '2024-2025', totalIncome: '1200000', taxableAmount: '120000', paymentStatus: 'Paid', paymentConfirmedBy: '1002', paymentConfirmedByName: 'Siaam Khan', assignedOfficerId: '1002', assignedOfficerName: 'Siaam Khan', ticketsResolved: 3 },
    { tin: '5002', taxpayerName: 'Cina Akter', gender: 'Female', city: 'Chittagong', phone: '01733333333', zone: 'Chittagong Zone', returnId: '202', assessmentYear: '2024-2025', totalIncome: '350000', taxableAmount: '35000', paymentStatus: 'Pending', paymentConfirmedBy: null, paymentConfirmedByName: '-', assignedOfficerId: '1003', assignedOfficerName: 'Nadia Islam', ticketsResolved: 1 },
    { tin: '5003', taxpayerName: 'David Roy', gender: 'Male', city: 'Sylhet', phone: '01844444444', zone: 'Sylhet Zone', returnId: '203', assessmentYear: '2024-2025', totalIncome: '800000', taxableAmount: '80000', paymentStatus: 'Paid', paymentConfirmedBy: '1003', paymentConfirmedByName: 'Nadia Islam', assignedOfficerId: '1003', assignedOfficerName: 'Nadia Islam', ticketsResolved: 0 },
    { tin: '5004', taxpayerName: 'Eva Rahman', gender: 'Female', city: 'Rajshahi', phone: '01555555555', zone: 'Rajshahi Zone', returnId: '204', assessmentYear: '2024-2025', totalIncome: '450000', taxableAmount: '45000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin', assignedOfficerId: '1004', assignedOfficerName: 'Fahim Hossain', ticketsResolved: 1 }
  ]);

  const stats = {
    totalOfficers: juniorOfficers.length,
    totalTaxpayers: taxpayers.length,
    pendingAudits: 3,
    totalRevenue: '41,000'
  };

  // Officer CRUD handlers
  const handleAddOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    const nextOfficerId = (1000 + juniorOfficers.length + 1).toString();
    const newOff = { id: nextOfficerId, ...newOfficer };
    setJuniorOfficers([...juniorOfficers, newOff]);
    setShowAddOfficer(false);
    setNewOfficer({ firstName: '', lastName: '', rank: 'Inspector', branch: '' });
  };
  const handleEditOfficer = (officer: any) => {
    setSelectedOfficer(officer);
    setNewOfficer({ firstName: officer.firstName, lastName: officer.lastName, rank: officer.rank, branch: officer.branch });
    setShowEditOfficer(true);
  };
  const handleUpdateOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    setJuniorOfficers(juniorOfficers.map(off => off.id === selectedOfficer.id ? { ...off, ...newOfficer } : off));
    setShowEditOfficer(false);
    setSelectedOfficer(null);
    setNewOfficer({ firstName: '', lastName: '', rank: 'Inspector', branch: '' });
  };
  const rankOrder = ['Assistant', 'Officer', 'Inspector', 'Senior Manager'];
  const handlePromote = (officer: any) => {
    const current = rankOrder.indexOf(officer.rank);
    if (current < rankOrder.length - 1) {
      setJuniorOfficers(juniorOfficers.map(off => off.id === officer.id ? { ...off, rank: rankOrder[current + 1] } : off));
    }
  };
  const handleDemote = (officer: any) => {
    const current = rankOrder.indexOf(officer.rank);
    if (current > 0) {
      setJuniorOfficers(juniorOfficers.map(off => off.id === officer.id ? { ...off, rank: rankOrder[current - 1] } : off));
    }
  };
  const handleDelete = (officer: any) => {
    if (window.confirm("Delete officer?")) setJuniorOfficers(juniorOfficers.filter(off => off.id !== officer.id));
  };

  // Taxpayer CRUD
  const handleAddTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    let nextTaxpayerId: string; let tinExists = true; let attempts = 0;
    while (tinExists && attempts < 100) {
      nextTaxpayerId = (5000 + taxpayers.length + attempts).toString();
      tinExists = taxpayers.some(t => t.id === nextTaxpayerId);
      attempts++;
    }
    nextTaxpayerId = (5000 + taxpayers.length + attempts - 1).toString();
    setTaxpayers([...taxpayers, { id: nextTaxpayerId, ...newTaxpayer }]);
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
    setTaxpayers(taxpayers.map(tax => tax.id === selectedTaxpayer.id ? { ...tax, ...newTaxpayer } : tax));
    setShowEditTaxpayer(false);
    setSelectedTaxpayer(null);
    setNewTaxpayer({ firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };
  const handleDeleteTaxpayer = (taxpayer: any) => {
    if (window.confirm("Delete taxpayer?")) setTaxpayers(taxpayers.filter(tax => tax.id !== taxpayer.id));
  };

  // Audit logs: see function below

  return (
    <div className="flex h-screen" style={{ background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold" style={{ color: "#c62828" }}>Senior Manager Portal</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarBtn active={activeView === 'dashboard'} icon={<Home />} onClick={() => setActiveView('dashboard')} label="Dashboard" />
          <SidebarBtn active={activeView === 'officers'} icon={<Users />} onClick={() => setActiveView('officers')} label="Manage Officers" />
          <SidebarBtn active={activeView === 'taxpayers'} icon={<UserCog />} onClick={() => setActiveView('taxpayers')} label="Manage Taxpayers" />
          <SidebarBtn active={activeView === 'tax-list'} icon={<FileText />} onClick={() => setActiveView('tax-list')} label="Tax List" />
          <SidebarBtn active={activeView === 'audit-logs'} icon={<Shield />} onClick={() => setActiveView('audit-logs')} label="Audit Logs" />
          <SidebarBtn active={activeView === 'support'} icon={<HelpCircle />} onClick={() => setActiveView('support')} label="Support" />
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold rounded-lg text-white transition-all hover:opacity-90 shadow-md"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-gray-600">Rank: {user.rank} | Branch: {user.branch}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">Officer ID: {user.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#c62828' }}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
          </div>
        </header>
        <div className="p-8">
          {activeView === 'dashboard' && <DashboardCards stats={stats} />}
          {activeView === 'officers' && (
            <OfficerManagement
              juniorOfficers={juniorOfficers}
              showAddOfficer={showAddOfficer}
              setShowAddOfficer={setShowAddOfficer}
              newOfficer={newOfficer}
              setNewOfficer={setNewOfficer}
              handleAddOfficer={handleAddOfficer}
              showEditOfficer={showEditOfficer}
              setShowEditOfficer={setShowEditOfficer}
              selectedOfficer={selectedOfficer}
              handleEditOfficer={handleEditOfficer}
              handleUpdateOfficer={handleUpdateOfficer}
              setSelectedOfficer={setSelectedOfficer}
              handlePromote={handlePromote}
              handleDemote={handleDemote}
              handleDelete={handleDelete}
            />
          )}
          {activeView === 'taxpayers' && (
            <TaxpayerManagement
              taxpayers={taxpayers}
              showAddTaxpayer={showAddTaxpayer}
              setShowAddTaxpayer={setShowAddTaxpayer}
              newTaxpayer={newTaxpayer}
              setNewTaxpayer={setNewTaxpayer}
              handleAddTaxpayer={handleAddTaxpayer}
              showEditTaxpayer={showEditTaxpayer}
              setShowEditTaxpayer={setShowEditTaxpayer}
              selectedTaxpayer={selectedTaxpayer}
              handleEditTaxpayer={handleEditTaxpayer}
              handleUpdateTaxpayer={handleUpdateTaxpayer}
              setSelectedTaxpayer={setSelectedTaxpayer}
              handleDeleteTaxpayer={handleDeleteTaxpayer}
            />
          )}
          {activeView === 'tax-list' && (
            <TaxListView
              juniorOfficers={juniorOfficers}
              comprehensiveTaxData={comprehensiveTaxData}
            />
          )}
          {activeView === 'audit-logs' && <AuditLogsComponent />}
        </div>

        {/* Add Officer Modal */}
        <ModalContainer show={showAddOfficer} title="Add New Junior Officer" subtitle="Officer ID will be auto-generated using off_seq">
          <form onSubmit={handleAddOfficer} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">First Name *</label>
                <input className="w-full p-3 border rounded" value={newOfficer.firstName} onChange={e => setNewOfficer({ ...newOfficer, firstName: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Last Name *</label>
                <input className="w-full p-3 border rounded" value={newOfficer.lastName} onChange={e => setNewOfficer({ ...newOfficer, lastName: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Rank *</label>
                <select className="w-full p-3 border rounded" value={newOfficer.rank} onChange={e => setNewOfficer({ ...newOfficer, rank: e.target.value })}>
                  <option>Inspector</option>
                  <option>Officer</option>
                  <option>Assistant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Branch *</label>
                <input className="w-full p-3 border rounded" value={newOfficer.branch} onChange={e => setNewOfficer({ ...newOfficer, branch: e.target.value })} required />
              </div>
            </div>
            <div className="flex gap-6 justify-end">
              <button type="button" onClick={() => setShowAddOfficer(false)} className="px-6 py-3 rounded border bg-gray-100 text-gray-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-3 rounded bg-red-600 text-white font-semibold">Add Officer</button>
            </div>
          </form>
        </ModalContainer>
        {/* Add Taxpayer Modal */}
        <ModalContainer show={showAddTaxpayer} title="Add New Taxpayer" subtitle="TIN will be auto-generated using taxpayer_seq">
          <form onSubmit={handleAddTaxpayer} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">First Name *</label>
                <input className="w-full p-3 border rounded" value={newTaxpayer.firstName} onChange={e => setNewTaxpayer({ ...newTaxpayer, firstName: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Last Name *</label>
                <input className="w-full p-3 border rounded" value={newTaxpayer.lastName} onChange={e => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Gender *</label>
                <select className="w-full p-3 border rounded" value={newTaxpayer.gender} onChange={e => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">City *</label>
                <input className="w-full p-3 border rounded" value={newTaxpayer.city} onChange={e => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                <input className="w-full p-3 border rounded" value={newTaxpayer.phoneNumber1} onChange={e => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Zone Name *</label>
                <input className="w-full p-3 border rounded" value={newTaxpayer.zoneName} onChange={e => setNewTaxpayer({ ...newTaxpayer, zoneName: e.target.value })} required />
              </div>
            </div>
            <div className="flex gap-6 justify-end">
              <button type="submit" className="px-6 py-3 rounded bg-red-600 text-white font-semibold">Add Taxpayer</button>
              <button type="button" onClick={() => setShowAddTaxpayer(false)} className="px-6 py-3 rounded border bg-gray-100 text-gray-700 font-semibold">Cancel</button>
            </div>
          </form>
        </ModalContainer>
      </main>
    </div>
  );
}

// --- COMPONENTS ---
function SidebarBtn({ active, icon, onClick, label }: { active: boolean, icon: any, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${active ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'}`}
      style={{ background: active ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ModalContainer({ show, title, subtitle, children }: { show: boolean, title: string, subtitle?: string, children: any }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8" style={{ minHeight: 270 }}>
        <div className="pb-5 border-b mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

// AuditLogs page, styled
function AuditLogsComponent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [logs] = useState([
    { auditId: "700", returnId: "20000", reason: "Random Check", issueDate: "13-DEC-2025", status: "Clear" },
    { auditId: "701", returnId: "20001", reason: "Income Mismatch", issueDate: "12-DEC-2025", status: "Under Review" },
    { auditId: "702", returnId: "20002", reason: "Doc Missing", issueDate: "10-DEC-2025", status: "Pending" },
    { auditId: "703", returnId: "20003", reason: "Late Filing", issueDate: "09-DEC-2025", status: "Fined" },
    { auditId: "704", returnId: "20004", reason: "Suspicious Activity Pattern Detected", issueDate: "08-DEC-2025", status: "Investigating" }
  ]);
  const getStatusColor = (status: string) => {
    if (status === "Clear") return "bg-green-50 text-green-600";
    if (status === "Under Review") return "bg-blue-50 text-blue-500";
    if (status === "Pending") return "bg-yellow-50 text-yellow-600";
    if (status === "Fined") return "bg-red-100 text-red-600";
    if (status === "Investigating") return "bg-red-50 text-red-500";
    return "bg-gray-50 text-gray-600";
  };
  const filtered = logs.filter(log =>
    (statusFilter === "All" || log.status === statusFilter) &&
    (log.auditId.includes(search) ||
      log.returnId.includes(search) ||
      log.reason.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h3 className="text-xl font-bold">Audit Logs</h3>
        <div className="flex flex-row gap-2 items-center">
          <input className="border px-4 py-2 rounded text-sm" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 200 }} />
          <select className="border rounded px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Clear">Clear</option>
            <option value="Under Review">Under Review</option>
            <option value="Pending">Pending</option>
            <option value="Fined">Fined</option>
            <option value="Investigating">Investigating</option>
          </select>
          <button className="border px-3 py-2 rounded text-sm flex items-center gap-1 bg-white text-gray-700" style={{ minWidth: 110 }}>
            <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.2} className="inline mr-1"><rect x="4" y="8" width="10" height="6" rx="2" /><path d="M15 4v1m-6 0V4" /></svg> Date Range
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Audit ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Return ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Issue Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.auditId} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-700">#{log.auditId}</td>
                <td className="px-6 py-3">{log.returnId}</td>
                <td className="px-6 py-3">{log.reason}</td>
                <td className="px-6 py-3">{log.issueDate}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full font-medium text-xs ${getStatusColor(log.status)}`}>{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-between items-center p-4 text-xs text-gray-500">
          <span>Showing 1 to {filtered.length} of {logs.length} entries</span>
          <div className="space-x-2">
            <button className="px-3 py-1 border rounded bg-gray-100">Previous</button>
            <button className="px-3 py-1 border rounded bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// The rest of the grid/table components (DashboardCards, OfficerManagement, TaxpayerManagement, TaxListView) remain as previously posted, or use your previous ones.

// Minimal DashboardCards component definition
function DashboardCards({ stats }: { stats: { totalOfficers: number, totalTaxpayers: number, pendingAudits: number, totalRevenue: string } }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <Users className="w-8 h-8 text-red-600 mb-2" />
        <div className="text-2xl font-bold">{stats.totalOfficers}</div>
        <div className="text-gray-600 text-sm">Total Officers</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <UserCog className="w-8 h-8 text-blue-600 mb-2" />
        <div className="text-2xl font-bold">{stats.totalTaxpayers}</div>
        <div className="text-gray-600 text-sm">Total Taxpayers</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <Shield className="w-8 h-8 text-yellow-600 mb-2" />
        <div className="text-2xl font-bold">{stats.pendingAudits}</div>
        <div className="text-gray-600 text-sm">Pending Audits</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
        <div className="text-2xl font-bold">৳{stats.totalRevenue}</div>
        <div className="text-gray-600 text-sm">Total Revenue</div>
      </div>
    </div>
  );
}

// Minimal OfficerManagement component definition
function OfficerManagement({
  juniorOfficers,
  showAddOfficer,
  setShowAddOfficer,
  newOfficer,
  setNewOfficer,
  handleAddOfficer,
  showEditOfficer,
  setShowEditOfficer,
  selectedOfficer,
  handleEditOfficer,
  handleUpdateOfficer,
  setSelectedOfficer,
  handlePromote,
  handleDemote,
  handleDelete
}: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Manage Officers</h3>
        <button
          className="px-4 py-2 rounded bg-red-600 text-white font-semibold"
          onClick={() => setShowAddOfficer(true)}
        >
          Add Officer
        </button>
      </div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Officer ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Branch</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {juniorOfficers.map((officer: any) => (
              <tr key={officer.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-700">{officer.id}</td>
                <td className="px-6 py-3">{officer.firstName} {officer.lastName}</td>
                <td className="px-6 py-3">{officer.rank}</td>
                <td className="px-6 py-3">{officer.branch}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button className="px-3 py-1 rounded bg-blue-500 text-white text-xs" onClick={() => handleEditOfficer(officer)}>Edit</button>
                  <button className="px-3 py-1 rounded bg-green-500 text-white text-xs" onClick={() => handlePromote(officer)}>Promote</button>
                  <button className="px-3 py-1 rounded bg-yellow-500 text-white text-xs" onClick={() => handleDemote(officer)}>Demote</button>
                  <button className="px-3 py-1 rounded bg-red-500 text-white text-xs" onClick={() => handleDelete(officer)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Minimal TaxpayerManagement component definition
function TaxpayerManagement({
  taxpayers,
  showAddTaxpayer,
  setShowAddTaxpayer,
  newTaxpayer,
  setNewTaxpayer,
  handleAddTaxpayer,
  showEditTaxpayer,
  setShowEditTaxpayer,
  selectedTaxpayer,
  handleEditTaxpayer,
  handleUpdateTaxpayer,
  setSelectedTaxpayer,
  handleDeleteTaxpayer
}: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Manage Taxpayers</h3>
        <button
          className="px-4 py-2 rounded bg-red-600 text-white font-semibold"
          onClick={() => setShowAddTaxpayer(true)}
        >
          Add Taxpayer
        </button>
      </div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">TIN</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">City</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Zone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxpayers.map((taxpayer: any) => (
              <tr key={taxpayer.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-700">{taxpayer.id}</td>
                <td className="px-6 py-3">{taxpayer.firstName} {taxpayer.lastName}</td>
                <td className="px-6 py-3">{taxpayer.gender}</td>
                <td className="px-6 py-3">{taxpayer.city}</td>
                <td className="px-6 py-3">{taxpayer.phoneNumber1}</td>
                <td className="px-6 py-3">{taxpayer.zoneName}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button className="px-3 py-1 rounded bg-blue-500 text-white text-xs" onClick={() => handleEditTaxpayer(taxpayer)}>Edit</button>
                  <button className="px-3 py-1 rounded bg-red-500 text-white text-xs" onClick={() => handleDeleteTaxpayer(taxpayer)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Minimal TaxListView component definition
function TaxListView({
  juniorOfficers,
  comprehensiveTaxData
}: {
  juniorOfficers: any[],
  comprehensiveTaxData: any[]
}) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Comprehensive Tax List</h3>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">TIN</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Gender</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">City</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Zone</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Assessment Year</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Total Income</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Taxable Amount</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Payment Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Assigned Officer</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tickets Resolved</th>
            </tr>
          </thead>
          <tbody>
            {comprehensiveTaxData.map((row: any) => (
              <tr key={row.tin} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 font-semibold text-gray-700">{row.tin}</td>
                <td className="px-4 py-2">{row.taxpayerName}</td>
                <td className="px-4 py-2">{row.gender}</td>
                <td className="px-4 py-2">{row.city}</td>
                <td className="px-4 py-2">{row.phone}</td>
                <td className="px-4 py-2">{row.zone}</td>
                <td className="px-4 py-2">{row.assessmentYear}</td>
                <td className="px-4 py-2">{row.totalIncome}</td>
                <td className="px-4 py-2">{row.taxableAmount}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full font-medium text-xs ${
                    row.paymentStatus === 'Paid'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {row.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2">{row.assignedOfficerName}</td>
                <td className="px-4 py-2">{row.ticketsResolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
