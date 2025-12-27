import { useState } from 'react';
import {
  Home, Users, Shield, LogOut, UserPlus, Edit, Trash2,
  TrendingUp, TrendingDown, UserCog, FileText, CheckCircle, XCircle, MapPin, User
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
  const [showAddOfficer, setShowAddOfficer] = useState(false);
  const [showEditOfficer, setShowEditOfficer] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState<any>(null);

  // Profile states
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

  // Officer State
  const [juniorOfficers, setJuniorOfficers] = useState([
    { id: '1000', firstName: 'Rahim', lastName: 'Uddin', rank: 'Inspector', branch: 'Gulshan' },
    { id: '1002', firstName: 'Siaam', lastName: 'Khan', rank: 'Officer', branch: 'Motijheel' },
    { id: '1003', firstName: 'Nadia', lastName: 'Islam', rank: 'Assistant', branch: 'Zindabazar' },
    { id: '1004', firstName: 'Fahim', lastName: 'Hossain', rank: 'Inspector', branch: 'New Market' }
  ]);
  const [newOfficer, setNewOfficer] = useState({ firstName: '', lastName: '', rank: 'Inspector', branch: '' });

  // Taxpayer State
  const [taxpayers, setTaxpayers] = useState([
    { id: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city: 'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North' },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka South' },
    { id: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName: 'Chittagong Zone' },
    { id: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet Zone' },
    { id: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi Zone' }
  ]);

  // Tax List Data (2 column removed)
  const [comprehensiveTaxData] = useState([
    { tin: '5000', taxpayerName: 'Abul Kalam', gender: 'Male', city: 'Dhaka', phone: '01711111111', zone: 'Dhaka North', returnId: '200', assessmentYear: '2024-2025', totalIncome: '500000', taxableAmount: '50000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin' },
    { tin: '5001', taxpayerName: 'Bokul Mia', gender: 'Male', city: 'Dhaka', phone: '01922222222', zone: 'Dhaka South', returnId: '201', assessmentYear: '2024-2025', totalIncome: '1200000', taxableAmount: '120000', paymentStatus: 'Paid', paymentConfirmedBy: '1002', paymentConfirmedByName: 'Siaam Khan' },
    { tin: '5002', taxpayerName: 'Cina Akter', gender: 'Female', city: 'Chittagong', phone: '01733333333', zone: 'Chittagong Zone', returnId: '202', assessmentYear: '2024-2025', totalIncome: '350000', taxableAmount: '35000', paymentStatus: 'Pending', paymentConfirmedBy: null, paymentConfirmedByName: '-' },
    { tin: '5003', taxpayerName: 'David Roy', gender: 'Male', city: 'Sylhet', phone: '01844444444', zone: 'Sylhet Zone', returnId: '203', assessmentYear: '2024-2025', totalIncome: '800000', taxableAmount: '80000', paymentStatus: 'Paid', paymentConfirmedBy: '1003', paymentConfirmedByName: 'Nadia Islam' },
    { tin: '5004', taxpayerName: 'Eva Rahman', gender: 'Female', city: 'Rajshahi', phone: '01555555555', zone: 'Rajshahi Zone', returnId: '204', assessmentYear: '2024-2025', totalIncome: '450000', taxableAmount: '45000', paymentStatus: 'Paid', paymentConfirmedBy: '1000', paymentConfirmedByName: 'Rahim Uddin' }
  ]);

  const stats = { totalOfficers: juniorOfficers.length, totalTaxpayers: taxpayers.length, pendingAudits: 3, totalRevenue: '41,000' };

  // Officer CRUD handlers (add/edit/promo/demote/del not included for brevity, just paste yours if needed!)
  // Taxpayer CRUD handlers (same)

  // Profile handlers
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

  return (
    <div className="flex h-screen" style={{ background: "#f8f9fa" }}>
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold" style={{ color: "#1769aa" }}>Senior Manager Portal</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarBtn active={activeView === 'dashboard'} icon={<Home />} onClick={() => setActiveView('dashboard')} label="Dashboard" />
          <SidebarBtn active={activeView === 'officers'} icon={<Users />} onClick={() => setActiveView('officers')} label="Manage Officers" />
          <SidebarBtn active={activeView === 'taxpayers'} icon={<UserCog />} onClick={() => setActiveView('taxpayers')} label="Manage Taxpayers" />
          <SidebarBtn active={activeView === 'tax-list'} icon={<FileText />} onClick={() => setActiveView('tax-list')} label="Tax List" />
          <SidebarBtn active={activeView === 'audit-logs'} icon={<Shield />} onClick={() => setActiveView('audit-logs')} label="Audit Logs" />
          {/* Profile replaces support */}
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#1565c0' }}>
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'profile' && (
            <div className="max-w-4xl mx-auto grid gap-6 mt-6 pb-4">
              <div className="bg-white rounded-xl shadow border p-8 flex flex-col md:flex-row md:justify-between">
                {/* Profile main data */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl mb-4 font-bold text-blue-900">My Profile</h3>
                    <div className="mb-2 grid grid-cols-1 gap-2">
                      <div><b className="text-gray-500">Officer ID:</b> <span className="font-mono text-lg text-blue-600">{profile.id}</span></div>
                      <div><b className="text-gray-500">First Name:</b> <span>{profile.firstName}</span></div>
                      <div><b className="text-gray-500">Last Name:</b> <span>{profile.lastName}</span></div>
                      <div><b className="text-gray-500">Rank:</b> <span className="font-bold text-gray-800">{profile.rank}</span></div>
                      <div><b className="text-gray-500">Branch:</b> <span className="text-indigo-700">{profile.branch}</span></div>
                      <div><b className="text-gray-500">House No:</b> <span>{profile.houseNo}</span></div>
                      <div><b className="text-gray-500">Street:</b> <span>{profile.street}</span></div>
                      <div><b className="text-gray-500">City:</b> <span>{profile.city}</span></div>
                      <div><b className="text-gray-500">Zip Code:</b> <span>{profile.zipCode}</span></div>
                    </div>
                  </div>
                </div>
                {/* Edit + password */}
                <div className="md:ml-6 mt-6 md:mt-0 flex flex-col items-end gap-3">
                  <button
                    onClick={() => { setProfileEdit(profile); setShowEditProfile(true); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-800"
                  >
                    <Edit className="w-4 h-4" /> Edit Details
                  </button>
                  <button
                    onClick={() => { setShowProfilePassModal(true); setProfileNewPassword(""); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 mt-2"
                  >
                    <UserPlus className="w-4 h-4" /> Change Password
                  </button>
                </div>
              </div>
              {/* Edit Modal */}
              {showEditProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow-lg relative">
                    <button onClick={() => setShowEditProfile(false)} className="absolute right-2 top-2 hover:bg-gray-200 rounded-full p-2">
                      <XCircle className="w-5 h-5 text-gray-600" />
                    </button>
                    <h3 className="text-lg font-bold mb-6 text-blue-700">Edit My Profile</h3>
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
                    <button className="mt-6 w-full py-2 bg-blue-700 hover:bg-blue-900 text-white rounded" onClick={handleEditProfileSave}>Save Changes</button>
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
                    <h3 className="text-lg font-bold mb-6 text-purple-700">Change Password</h3>
                    <input className="w-full p-3 border rounded mb-4" type="password" placeholder="New Password" value={profileNewPassword} onChange={e => setProfileNewPassword(e.target.value)} />
                    <button className="w-full py-2 bg-purple-600 hover:bg-purple-800 text-white rounded" onClick={handleProfilePasswordChange}>Save</button>
                  </div>
                </div>
              )}
              {/* Security box */}
              <div className="bg-white rounded-xl shadow border p-8 flex flex-col md:flex-row md:justify-between mt-3">
                <div>
                  <h4 className="font-bold text-md mb-2">Security</h4>
                  <div className="text-gray-600 text-sm">Keep your account secure by regularly updating your password.</div>
                </div>
                <button className="mt-3 md:mt-0 px-6 py-3 rounded-lg bg-purple-600 text-white flex items-center gap-2 font-semibold" onClick={() => setShowProfilePassModal(true)}>
                  <UserPlus className="w-5 h-5" /> Change Password
                </button>
              </div>
            </div>
          )}

          {activeView === 'tax-list' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: "#2F80ED" }}>Tax List - All Taxpayers</h3>
                <p className="text-sm text-gray-600">Overview of taxpayers with payment confirmations.</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">TIN</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Taxpayer Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Gender</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">City</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Zone</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Return ID</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Total Income</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Tax Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Payment Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">Confirmed By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comprehensiveTaxData.map((record) => (
                        <tr key={record.tin} className="border-b border-gray-100 hover:bg-blue-50">
                          <td className="px-4 py-3 text-sm font-bold text-blue-800">{record.tin}</td>
                          <td className="px-4 py-3 text-sm font-medium">{record.taxpayerName}</td>
                          <td className="px-4 py-3 text-sm">{record.gender}</td>
                          <td className="px-4 py-3 text-sm">{record.city}</td>
                          <td className="px-4 py-3 text-sm">{record.zone}</td>
                          <td className="px-4 py-3 text-sm font-bold">#{record.returnId}</td>
                          <td className="px-4 py-3 text-sm font-bold text-green-700">৳{Number(record.totalIncome).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-bold text-orange-700">৳{Number(record.taxableAmount).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">
                            {record.paymentStatus === 'Paid' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }}>
                                <CheckCircle className="w-3 h-3" /> Paid
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ backgroundColor: "#fff3e0", color: "#f57c00", fontWeight: 600 }}>
                                <XCircle className="w-3 h-3" /> {record.paymentStatus}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {record.paymentConfirmedBy ? (
                              <div>
                                <p className="font-bold text-purple-700">{record.paymentConfirmedByName}</p>
                                <p className="text-xs text-gray-500">ID: {record.paymentConfirmedBy}</p>
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
              </div>
            </div>
          )}

          {/* Add your other views below (dashboard, officers, taxpayers, audit-logs) as needed */}
          
        </div>
      </main>
    </div>
  );
}

// Used for sidebar
function SidebarBtn({ active, icon, onClick, label }: { active: boolean, icon: any, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${active ? 'text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'}`}
      style={{ background: active ? 'linear-gradient(135deg, #1976d2 0%, #5e92f3 100%)' : 'transparent' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}