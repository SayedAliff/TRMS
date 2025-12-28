import { useState } from 'react';
import {
  Home, Users, Shield, HelpCircle, LogOut, UserPlus, Edit, Trash2,
  TrendingUp, TrendingDown, UserCog, FileText, CheckCircle, XCircle, MapPin, User, Lock
} from 'lucide-react';

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  rank: string;
  branch: string;
  houseNo: string;
  street: string;
  city: string;
  zipCode: string;
  password: string;
}

interface SeniorManagerDashboardProps {
  user: UserType;
  onLogout: () => void;
}

type View = 'dashboard' | 'officers' | 'taxpayers' | 'tax-list' | 'audit-logs' | 'profile';

export function SeniorManagerDashboard({ user, onLogout }: SeniorManagerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  // -- Officers State
  const [juniorOfficers, setJuniorOfficers] = useState([
    { id: '1000', firstName: 'Rahim', lastName: 'Uddin', rank: 'Inspector', branch: 'Gulshan' },
    { id: '1002', firstName: 'Siaam', lastName: 'Khan', rank: 'Officer', branch: 'Motijheel' },
    { id: '1003', firstName: 'Nadia', lastName: 'Islam', rank: 'Assistant', branch: 'Zindabazar' },
    { id: '1004', firstName: 'Fahim', lastName: 'Hossain', rank: 'Inspector', branch: 'New Market' }
  ]);
  const [newOfficer, setNewOfficer] = useState({ firstName: '', lastName: '', rank: 'Inspector', branch: '' });
  const [showAddOfficer, setShowAddOfficer] = useState(false);

  // Edit officer logic
  const [showEditOfficer, setShowEditOfficer] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState<any>(null);

  // -- Taxpayers State
  const [taxpayers, setTaxpayers] = useState([
    {
      id: '5000', firstName: 'Abul', lastName: 'Kalam', dateOfBirth: '1985-01-15', gender: 'Male',
      houseNo: '55', street: 'Banani', city: 'Dhaka', zipCode: '1213', username: 'abul5000', password: 'pass',
      phoneNumber1: '01711111111', phoneNumber2: '', phoneNumber3: '', zoneCode: '100', zoneName: 'Dhaka North'
    },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka South' },
    { id: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName: 'Chittagong Zone' },
    { id: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet Zone' },
    { id: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi Zone' }
  ]);
  const [newTaxpayer, setNewTaxpayer] = useState({
    firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: ''
  });
  const [showAddTaxpayer, setShowAddTaxpayer] = useState(false);

  // Edit taxpayer logic
  const [showEditTaxpayer, setShowEditTaxpayer] = useState(false);
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<any>(null);

  // Tax List Data
  const [comprehensiveTaxData] = useState([
    { tin: '5000', taxpayerName: 'Abul Kalam', gender: 'Male', city: 'Dhaka', phone: '01711111111', zone: 'Dhaka North', returnId: '200', assessmentYear: '2024-2025', totalIncome: '500000', taxableAmount: '50000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin' },
    { tin: '5001', taxpayerName: 'Bokul Mia', gender: 'Male', city: 'Dhaka', phone: '01922222222', zone: 'Dhaka South', returnId: '201', assessmentYear: '2024-2025', totalIncome: '1200000', taxableAmount: '120000', paymentStatus: 'Paid', paymentConfirmedBy: '1002', paymentConfirmedByName: 'Siaam Khan' },
    { tin: '5002', taxpayerName: 'Cina Akter', gender: 'Female', city: 'Chittagong', phone: '01733333333', zone: 'Chittagong Zone', returnId: '202', assessmentYear: '2024-2025', totalIncome: '350000', taxableAmount: '35000', paymentStatus: 'Pending', paymentConfirmedBy: null, paymentConfirmedByName: '-' },
    { tin: '5003', taxpayerName: 'David Roy', gender: 'Male', city: 'Sylhet', phone: '01844444444', zone: 'Sylhet Zone', returnId: '203', assessmentYear: '2024-2025', totalIncome: '800000', taxableAmount: '80000', paymentStatus: 'Paid', paymentConfirmedBy: '1003', paymentConfirmedByName: 'Nadia Islam' },
    { tin: '5004', taxpayerName: 'Eva Rahman', gender: 'Female', city: 'Rajshahi', phone: '01555555555', zone: 'Rajshahi Zone', returnId: '204', assessmentYear: '2024-2025', totalIncome: '450000', taxableAmount: '45000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin' }
  ]);

  // PROFILE states (section)
  const [profile, setProfile] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    rank: user.rank,
    branch: user.branch,
    houseNo: user.houseNo,
    street: user.street,
    city: user.city,
    zipCode: user.zipCode,
    password: user.password
  });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileEdit, setProfileEdit] = useState(profile);
  const [showProfilePassModal, setShowProfilePassModal] = useState(false);
  const [profileNewPassword, setProfileNewPassword] = useState('');

  // Officer actions
  const handleEditOfficer = (officer: any) => {
    setSelectedOfficer(officer);
    setNewOfficer({ firstName: officer.firstName, lastName: officer.lastName, rank: officer.rank, branch: officer.branch });
    setShowEditOfficer(true);
  };
  const handleUpdateOfficer = () => {
    setJuniorOfficers(juniorOfficers.map(off => off.id === selectedOfficer.id ? { ...off, ...newOfficer } : off));
    setShowEditOfficer(false);
    setSelectedOfficer(null);
    setNewOfficer({ firstName: '', lastName: '', rank: 'Inspector', branch: '' });
  };
  const rankOrder = ['Assistant', 'Officer', 'Inspector'];
  const handlePromote = (officer: any) => {
    const idx = rankOrder.indexOf(officer.rank);
    if (idx < rankOrder.length - 1) {
      setJuniorOfficers(juniorOfficers.map(off => off.id === officer.id ? { ...off, rank: rankOrder[idx + 1] } : off));
    }
  };
  const handleDemote = (officer: any) => {
    const idx = rankOrder.indexOf(officer.rank);
    if (idx > 0) {
      setJuniorOfficers(juniorOfficers.map(off => off.id === officer.id ? { ...off, rank: rankOrder[idx - 1] } : off));
    }
  };
  const handleDeleteOfficer = (officer: any) => {
    if (window.confirm("Delete officer?")) setJuniorOfficers(juniorOfficers.filter(off => off.id !== officer.id));
  };

  // Taxpayer actions
  const handleEditTaxpayer = (taxpayer: any) => {
    setSelectedTaxpayer(taxpayer);
    setNewTaxpayer({ firstName: taxpayer.firstName, lastName: taxpayer.lastName, gender: taxpayer.gender, city: taxpayer.city, phoneNumber1: taxpayer.phoneNumber1, zoneName: taxpayer.zoneName });
    setShowEditTaxpayer(true);
  };
  const handleUpdateTaxpayer = () => {
    setTaxpayers(taxpayers.map(tax => tax.id === selectedTaxpayer.id ? { ...tax, ...newTaxpayer } : tax));
    setShowEditTaxpayer(false);
    setSelectedTaxpayer(null);
    setNewTaxpayer({ firstName: '', lastName: '', gender: 'Male', city: '', phoneNumber1: '', zoneName: '' });
  };
  const handleDeleteTaxpayer = (taxpayer: any) => {
    if (window.confirm("Delete taxpayer?")) setTaxpayers(taxpayers.filter(tax => tax.id !== taxpayer.id));
  };

  const stats = { totalOfficers: juniorOfficers.length, totalTaxpayers: taxpayers.length, pendingAudits: 3, totalRevenue: '41,000' };

  function handleEditProfileSave() {
    setProfile(profileEdit);
    setShowEditProfile(false);
    alert('Profile Updated');
  }
  function handleProfilePasswordChange() {
    if (profileNewPassword.length < 3) return alert('Password must be at least 3 characters!');
    setProfile({ ...profile, password: profileNewPassword });
    setShowProfilePassModal(false);
    setProfileNewPassword('');
    alert('Password changed!');
  }

  // --------------- RENDER ---------------
  return (
    <div className="flex h-screen" style={{ background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold" style={{ color: "#c62828" }}>Senior Manager Portal</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarBtn active={activeView === 'dashboard'} icon={<Home />} onClick={() => setActiveView('dashboard')} label="Dashboard" />
          <SidebarBtn active={activeView === 'officers'} icon={<Users />} onClick={() => setActiveView('officers')} label="Manage Officers" />
          <SidebarBtn active={activeView === 'taxpayers'} icon={<UserCog />} onClick={() => setActiveView('taxpayers')} label="Manage Taxpayers" />
          <SidebarBtn active={activeView === 'tax-list'} icon={<FileText />} onClick={() => setActiveView('tax-list')} label="Tax List" />
          <SidebarBtn active={activeView === 'audit-logs'} icon={<Shield />} onClick={() => setActiveView('audit-logs')} label="Audit Logs" />
          <SidebarBtn active={activeView === 'profile'} icon={<User />} onClick={() => setActiveView('profile')} label="Profile" />
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
              <h2 className="text-xl font-bold mb-1">{profile.firstName} {profile.lastName}</h2>
              <p className="text-sm text-gray-600">Rank: {profile.rank} | Branch: {profile.branch}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{profile.firstName} {profile.lastName}</p>
                <p className="text-xs text-gray-500">Officer ID: {profile.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#c62828' }}>
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            </div>
          </div>
        </header>
        <div className="p-8">
          {activeView === 'dashboard' && <DashboardCards stats={stats} />}
          {activeView === 'officers' && (
            <OfficerManagement
              juniorOfficers={juniorOfficers}
              setShowAddOfficer={setShowAddOfficer}
              handleEditOfficer={handleEditOfficer}
              handlePromote={handlePromote}
              handleDemote={handleDemote}
              handleDeleteOfficer={handleDeleteOfficer}
            />
          )}
          {activeView === 'taxpayers' && (
            <TaxpayerManagement
              taxpayers={taxpayers}
              setShowAddTaxpayer={setShowAddTaxpayer}
              handleEditTaxpayer={handleEditTaxpayer}
              handleDeleteTaxpayer={handleDeleteTaxpayer}
            />
          )}
          {activeView === 'tax-list' && <TaxListTable comprehensiveTaxData={comprehensiveTaxData} />}
          {activeView === 'audit-logs' && <AuditLogsComponent />}
          {/* --- Profile Section --- */}
          {activeView === 'profile' && (
            <div className="max-w-4xl mx-auto grid gap-6 mt-6 pb-4">
              <div className="bg-white rounded-xl shadow border p-8 flex flex-col md:flex-row md:justify-between">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl mb-4 font-bold text-red-700">My Profile</h3>
                    <div className="mb-2 grid grid-cols-1 gap-2">
                      <div><b className="text-gray-500">Officer ID:</b> <span className="font-mono text-lg text-red-600">{profile.id}</span></div>
                      <div><b className="text-gray-500">First Name:</b> <span>{profile.firstName}</span></div>
                      <div><b className="text-gray-500">Last Name:</b> <span>{profile.lastName}</span></div>
                      <div><b className="text-gray-500">Rank:</b> <span className="font-bold text-gray-800">{profile.rank}</span></div>
                      <div><b className="text-gray-500">Branch:</b> <span className="text-red-700">{profile.branch}</span></div>
                      <div><b className="text-gray-500">House No:</b> <span>{profile.houseNo}</span></div>
                      <div><b className="text-gray-500">Street:</b> <span>{profile.street}</span></div>
                      <div><b className="text-gray-500">City:</b> <span>{profile.city}</span></div>
                      <div><b className="text-gray-500">Zip Code:</b> <span>{profile.zipCode}</span></div>
                    </div>
                  </div>
                </div>
                <div className="md:ml-6 mt-6 md:mt-0 flex flex-col items-end gap-3">
                  <button
                    onClick={() => { setProfileEdit(profile); setShowEditProfile(true); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    <Edit className="w-4 h-4" /> Edit Details
                  </button>
                  <button
                    onClick={() => { setShowProfilePassModal(true); setProfileNewPassword(""); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-800 mt-2"
                  >
                    <Lock className="w-4 h-4" /> Change Password
                  </button>
                </div>
              </div>
              {/* Edit Profile Modal */}
              {showEditProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow-lg relative">
                    <button onClick={() => setShowEditProfile(false)} className="absolute right-2 top-2 hover:bg-gray-200 rounded-full p-2">
                      <XCircle className="w-5 h-5 text-gray-600" />
                    </button>
                    <h3 className="text-lg font-bold mb-6 text-red-700">Edit My Profile</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs text-gray-600">First Name</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.firstName} onChange={e => setProfileEdit({ ...profileEdit, firstName: e.target.value })} />
                      </div>
                      <div><label className="text-xs text-gray-600">Last Name</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.lastName} onChange={e => setProfileEdit({ ...profileEdit, lastName: e.target.value })} />
                      </div>
                      <div><label className="text-xs text-gray-600">Rank</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.rank} onChange={e => setProfileEdit({ ...profileEdit, rank: e.target.value })} />
                      </div>
                      <div><label className="text-xs text-gray-600">Branch</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.branch} onChange={e => setProfileEdit({ ...profileEdit, branch: e.target.value })} />
                      </div>
                      <div><label className="text-xs text-gray-600">House No</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.houseNo} onChange={e => setProfileEdit({ ...profileEdit, houseNo: e.target.value })} />
                      </div>
                      <div><label className="text-xs text-gray-600">Street</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.street} onChange={e => setProfileEdit({ ...profileEdit, street: e.target.value })} />
                      </div>
                      <div><label className="text-xs text-gray-600">City</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.city} onChange={e => setProfileEdit({ ...profileEdit, city: e.target.value })} />
                      </div>
                      <div><label className="text-xs text-gray-600">Zip Code</label>
                        <input className="p-2 border rounded w-full" value={profileEdit.zipCode} onChange={e => setProfileEdit({ ...profileEdit, zipCode: e.target.value })} />
                      </div>
                    </div>
                    <button className="mt-6 w-full py-2 bg-red-700 hover:bg-red-900 text-white rounded" onClick={handleEditProfileSave}>Save Changes</button>
                  </div>
                </div>
              )}
              {/* Password modal */}
              {showProfilePassModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-xl max-w-xs w-full shadow-lg relative">
                    <button onClick={() => setShowProfilePassModal(false)} className="absolute right-2 top-2 hover:bg-gray-200 rounded-full p-2">
                      <XCircle className="w-5 h-5 text-gray-600" />
                    </button>
                    <h3 className="text-lg font-bold mb-6 text-red-700">Change Password</h3>
                    <input className="w-full p-3 border rounded mb-4" type="password" placeholder="New Password" value={profileNewPassword} onChange={e => setProfileNewPassword(e.target.value)} />
                    <button className="w-full py-2 bg-red-700 hover:bg-red-800 text-white rounded" onClick={handleProfilePasswordChange}>Save</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Add Officer Modal */}
        {showAddOfficer && <OfficerAddModal onClose={() => setShowAddOfficer(false)} newOfficer={newOfficer} setNewOfficer={setNewOfficer} setJuniorOfficers={setJuniorOfficers} juniorOfficers={juniorOfficers} />}
        {/* Edit Officer Modal */}
        {showEditOfficer && (
          <OfficerAddModal
            onClose={() => setShowEditOfficer(false)}
            newOfficer={newOfficer}
            setNewOfficer={setNewOfficer}
            setJuniorOfficers={() => {}} // Not used for edit
            juniorOfficers={[]} // Not used for edit
            isEdit
            onSave={handleUpdateOfficer}
          />
        )}
        {/* Add Taxpayer Modal */}
        {showAddTaxpayer && <TaxpayerAddModal onClose={() => setShowAddTaxpayer(false)} newTaxpayer={newTaxpayer} setNewTaxpayer={setNewTaxpayer} setTaxpayers={setTaxpayers} taxpayers={taxpayers} />}
        {/* Edit Taxpayer Modal */}
        {showEditTaxpayer && (
          <TaxpayerAddModal
            onClose={() => setShowEditTaxpayer(false)}
            newTaxpayer={newTaxpayer}
            setNewTaxpayer={setNewTaxpayer}
            setTaxpayers={() => {}} // Not used for edit
            taxpayers={[]} // Not used for edit
            isEdit
            onSave={handleUpdateTaxpayer}
          />
        )}
      </main>
    </div>
  );
}

// OfficerAddModal component definition
function OfficerAddModal({ onClose, newOfficer, setNewOfficer, setJuniorOfficers, juniorOfficers, isEdit = false, onSave }: any) {
  function handleAddOfficer() {
    if (!newOfficer.firstName || !newOfficer.lastName || !newOfficer.rank || !newOfficer.branch) {
      alert('Please fill all fields');
      return;
    }
    setJuniorOfficers([
      ...juniorOfficers,
      {
        id: (Math.floor(Math.random() * 10000)).toString(),
        ...newOfficer
      }
    ]);
    setNewOfficer({ firstName: '', lastName: '', rank: 'Inspector', branch: '' });
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-lg relative">
        <button onClick={onClose} className="absolute right-2 top-2 hover:bg-gray-200 rounded-full p-2">
          <XCircle className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-bold mb-6 text-red-700">{isEdit ? "Edit Officer" : "Add New Officer"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-600">First Name</label>
            <input className="p-2 border rounded w-full" value={newOfficer.firstName} onChange={e => setNewOfficer({ ...newOfficer, firstName: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-gray-600">Last Name</label>
            <input className="p-2 border rounded w-full" value={newOfficer.lastName} onChange={e => setNewOfficer({ ...newOfficer, lastName: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-gray-600">Rank</label>
            <select className="p-2 border rounded w-full" value={newOfficer.rank} onChange={e => setNewOfficer({ ...newOfficer, rank: e.target.value })}>
              <option value="Inspector">Inspector</option>
              <option value="Officer">Officer</option>
              <option value="Assistant">Assistant</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Branch</label>
            <input className="p-2 border rounded w-full" value={newOfficer.branch} onChange={e => setNewOfficer({ ...newOfficer, branch: e.target.value })} />
          </div>
        </div>
        <button
          className="mt-6 w-full py-2 bg-red-700 hover:bg-red-900 text-white rounded"
          onClick={isEdit ? onSave : handleAddOfficer}
        >
          {isEdit ? "Save Changes" : "Add Officer"}
        </button>
      </div>
    </div>
  );
}

// Tax List Table: Only show requested columns, all blue
function TaxListTable({ comprehensiveTaxData }: { comprehensiveTaxData: Array<any> }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1 text-blue-700">Tax List - All Taxpayers</h3>
        <p className="text-sm text-gray-600">Overview of taxpayers with payment confirmations.</p>
      </div>
      <div className="bg-white rounded-lg shadow border border-blue-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50 border-b-2 border-blue-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">TIN</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Gender</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Return ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Assessment Year</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Category</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Taxable Amount</th>
            </tr>
          </thead>
          <tbody>
            {comprehensiveTaxData.map((record: any) => (
              <tr key={record.tin} className="border-b border-blue-100 hover:bg-blue-50">
                <td className="px-4 py-3 font-semibold text-blue-800">{record.tin}</td>
                <td className="px-4 py-3">{record.taxpayerName}</td>
                <td className="px-4 py-3">{record.gender}</td>
                <td className="px-4 py-3">#{record.returnId}</td>
                <td className="px-4 py-3">{record.assessmentYear}</td>
                <td className="px-4 py-3">{record.category || '-'}</td>
                <td className="px-4 py-3 font-bold text-blue-700">৳{Number(record.taxableAmount).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// TaxpayerManagement Table (all blue, wide columns, show all requested fields)
function TaxpayerManagement({ taxpayers, setShowAddTaxpayer, handleEditTaxpayer, handleDeleteTaxpayer }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Manage Taxpayers</h3>
        <button
          onClick={() => setShowAddTaxpayer(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4" />
          Add Taxpayer
        </button>
      </div>
      <div className="bg-white rounded-lg shadow border border-blue-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50 border-b border-blue-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">TIN</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">First Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Last Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Date of Birth</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Gender</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">House No</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Street</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">City</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Zip Code</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Username</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Phone 1</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Phone 2</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Phone 3</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Zone Code</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxpayers.map((taxpayer: any) => (
              <tr key={taxpayer.id} className="border-b border-blue-100 hover:bg-blue-50">
                <td className="px-4 py-3 font-semibold text-blue-800">{taxpayer.id}</td>
                <td className="px-4 py-3">{taxpayer.firstName}</td>
                <td className="px-4 py-3">{taxpayer.lastName}</td>
                <td className="px-4 py-3">{taxpayer.dateOfBirth || ''}</td>
                <td className="px-4 py-3">{taxpayer.gender}</td>
                <td className="px-4 py-3">{taxpayer.houseNo || ''}</td>
                <td className="px-4 py-3">{taxpayer.street || ''}</td>
                <td className="px-4 py-3">{taxpayer.city}</td>
                <td className="px-4 py-3">{taxpayer.zipCode || ''}</td>
                <td className="px-4 py-3">{taxpayer.username || ''}</td>
                <td className="px-4 py-3">{taxpayer.phoneNumber1}</td>
                <td className="px-4 py-3">{taxpayer.phoneNumber2 || ''}</td>
                <td className="px-4 py-3">{taxpayer.phoneNumber3 || ''}</td>
                <td className="px-4 py-3">{taxpayer.zoneCode || ''}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="p-2 hover:bg-blue-100 rounded-lg border border-blue-200" title="Edit" onClick={() => handleEditTaxpayer(taxpayer)}>
                    <Edit className="w-4 h-4 text-blue-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-100 rounded-lg border border-blue-200" title="Delete" onClick={() => handleDeleteTaxpayer(taxpayer)}>
                    <Trash2 className="w-4 h-4 text-blue-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// TaxpayerAddModal/Edit Modal (all blue, edit all requested fields, no password)
function TaxpayerAddModal({ onClose, newTaxpayer, setNewTaxpayer, setTaxpayers, taxpayers, isEdit = false, onSave }: any) {
  function handleAddTaxpayer() {
    if (!newTaxpayer.firstName || !newTaxpayer.lastName || !newTaxpayer.gender || !newTaxpayer.city || !newTaxpayer.phoneNumber1 || !newTaxpayer.zoneCode) {
      alert('Please fill all fields');
      return;
    }
    setTaxpayers([
      ...taxpayers,
      {
        id: (Math.floor(Math.random() * 10000)).toString(),
        ...newTaxpayer
      }
    ]);
    setNewTaxpayer({
      firstName: '', lastName: '', dateOfBirth: '', gender: 'Male', houseNo: '', street: '', city: '', zipCode: '', username: '', phoneNumber1: '', phoneNumber2: '', phoneNumber3: '', zoneCode: ''
    });
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl max-w-2xl w-full shadow-lg relative">
        <button onClick={onClose} className="absolute right-2 top-2 hover:bg-blue-100 rounded-full p-2">
          <XCircle className="w-5 h-5 text-blue-700" />
        </button>
        <h3 className="text-lg font-bold mb-6 text-blue-700">{isEdit ? "Edit Taxpayer" : "Add New Taxpayer"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-blue-700">First Name</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.firstName} onChange={e => setNewTaxpayer({ ...newTaxpayer, firstName: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Last Name</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.lastName} onChange={e => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Date of Birth</label>
            <input className="p-2 border border-blue-200 rounded w-full" type="date" value={newTaxpayer.dateOfBirth || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, dateOfBirth: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Gender</label>
            <select className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.gender} onChange={e => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-blue-700">House No</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.houseNo || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, houseNo: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Street</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.street || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, street: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">City</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.city} onChange={e => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Zip Code</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.zipCode || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, zipCode: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Username</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.username || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, username: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Phone Number 1</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.phoneNumber1} onChange={e => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Phone Number 2</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.phoneNumber2 || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, phoneNumber2: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Phone Number 3</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.phoneNumber3 || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, phoneNumber3: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-blue-700">Zone Code</label>
            <input className="p-2 border border-blue-200 rounded w-full" value={newTaxpayer.zoneCode || ''} onChange={e => setNewTaxpayer({ ...newTaxpayer, zoneCode: e.target.value })} />
          </div>
        </div>
        <button
          className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={isEdit ? onSave : handleAddTaxpayer}
        >
          {isEdit ? "Save Changes" : "Add Taxpayer"}
        </button>
      </div>
    </div>
  );
}

// OfficerManagement Table
function OfficerManagement({ juniorOfficers, setShowAddOfficer, handleEditOfficer, handlePromote, handleDemote, handleDeleteOfficer }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Manage Junior Officers</h3>
        <button
          onClick={() => setShowAddOfficer(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: '#c62828' }}
        >
          <UserPlus className="w-4 h-4" />
          Add Officer
        </button>
      </div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Officer ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Branch</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {juniorOfficers.map((officer: any) => (
              <tr key={officer.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">#{officer.id}</td>
                <td className="px-6 py-4 font-medium">{officer.firstName} {officer.lastName}</td>
                <td className="px-6 py-4">{officer.rank}</td>
                <td className="px-6 py-4">{officer.branch}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 hover:bg-blue-50 rounded-lg" title="Edit" onClick={() => handleEditOfficer(officer)}><Edit className="w-4 h-4" style={{ color: '#2F80ED' }} /></button>
                  <button className="p-2 hover:bg-green-50 rounded-lg" title="Promote" onClick={() => handlePromote(officer)}><TrendingUp className="w-4 h-4" style={{ color: '#2e7d32' }} /></button>
                  <button className="p-2 hover:bg-orange-50 rounded-lg" title="Demote" onClick={() => handleDemote(officer)}><TrendingDown className="w-4 h-4" style={{ color: '#f57c00' }} /></button>
                  <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete" onClick={() => handleDeleteOfficer(officer)}><Trash2 className="w-4 h-4" style={{ color: '#c62828' }} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Simple AuditLogsComponent placeholder
function AuditLogsComponent() {
  return (
    <div className="bg-white rounded-xl shadow border p-8">
      <h3 className="text-xl font-bold mb-4 text-yellow-700">Audit Logs</h3>
      <p className="text-gray-600">No audit logs available.</p>
    </div>
  );
}

// Simple DashboardCards component for displaying stats
function DashboardCards({ stats }: { stats: { totalOfficers: number; totalTaxpayers: number; pendingAudits: number; totalRevenue: string } }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col items-center">
        <Users className="w-8 h-8 text-red-700 mb-2" />
        <div className="text-2xl font-bold">{stats.totalOfficers}</div>
        <div className="text-gray-600 text-sm">Total Officers</div>
      </div>
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col items-center">
        <UserCog className="w-8 h-8 text-blue-700 mb-2" />
        <div className="text-2xl font-bold">{stats.totalTaxpayers}</div>
        <div className="text-gray-600 text-sm">Total Taxpayers</div>
      </div>
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col items-center">
        <Shield className="w-8 h-8 text-yellow-600 mb-2" />
        <div className="text-2xl font-bold">{stats.pendingAudits}</div>
        <div className="text-gray-600 text-sm">Pending Audits</div>
      </div>
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col items-center">
        <TrendingUp className="w-8 h-8 text-green-700 mb-2" />
        <div className="text-2xl font-bold">৳{stats.totalRevenue}</div>
        <div className="text-gray-600 text-sm">Total Revenue</div>
      </div>
    </div>
  );
}

// SidebarBtn for consistent sidebar colors
function SidebarBtn({ active, icon, onClick, label }: { active: boolean, icon: any, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                  ${active ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'}`}
      style={{ background: active ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
