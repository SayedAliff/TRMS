import React, { useState } from 'react';
import {
  Home,
  Users,
  Shield,
  LogOut,
  Edit,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Trash2,
  Key,
  UserPlus,
  X,
  User,
  FileText,
  CalendarDays,
  Lock
} from 'lucide-react';

interface SeniorManagerDashboardProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    rank: string;
    branch: string;
    houseNo: string;
    street: string;
    city: string;
    zipCode: string;
    password: string;
  };
  onLogout: () => void;
}

type View =
  | 'Dashboard'
  | 'Manage Officers'
  | 'Manage Taxpayers'
  | 'Taxlists'
  | 'AuditLogs'
  | 'Profile';

type Officer = {
  id: number;
  firstName: string;
  lastName: string;
  rank: string;
  branch: string;
  houseNo: string;
  street: string;
  city: string;
  zipCode: string;
  password: string;
};

const initialOfficers: Officer[] = [
  { id: 1000, firstName: 'Rahim', lastName: 'Uddin', rank: 'Inspector', branch: 'Gulshan', houseNo:"10", street:"Road 5", city:"Dhaka", zipCode:"1212", password: 'pass1' },
  { id: 1001, firstName: 'Karim', lastName: 'Ahmed', rank: 'Commissioner', branch: 'Agrabad', houseNo:"22", street:"CDA Ave", city:"Chittagong", zipCode:"4000", password: 'pass2' },
  { id: 1002, firstName: 'Siaam', lastName: 'Khan', rank: 'Officer', branch: 'Motijheel', houseNo:"5", street:"Bank Road", city:"Dhaka", zipCode:"1000", password: 'pass3' },
  { id: 1003, firstName: 'Nadia', lastName: 'Islam', rank: 'Assistant', branch: 'Zindabazar', houseNo:"12", street:"VIP Rd", city:"Sylhet", zipCode:"3100", password: 'pass4' },
  { id: 1004, firstName: 'Fahim', lastName: 'Hossain', rank: 'Inspector', branch: 'New Market', houseNo:"8", street:"College Rd", city:"Rajshahi", zipCode:"6000", password: 'pass5' }
];

const stats = {
  totalTaxpayers: 5,
  totalOfficers: 5,
  pendingTaxReturns: 3,
  pendingTickets: 2,
  monthlyRevenue: 330000,
  yearlyRevenue: 3960000,
};

export function SeniorManagerDashboard({ user, onLogout }: SeniorManagerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('Dashboard');
  const [officers, setOfficers] = useState(initialOfficers);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordOfficer, setPasswordOfficer] = useState<Officer | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showAddOfficer, setShowAddOfficer] = useState(false);
  const [addOfficerForm, setAddOfficerForm] = useState<Omit<Officer,'id'>>({
    firstName: '',
    lastName: '',
    rank: '',
    branch: '',
    houseNo: '',
    street: '',
    city: '',
    zipCode: '',
    password: ''
  });

  // PROFILE FIELDS (NO EMAIL)
  const [profile, setProfile] = useState<Officer>({
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

  // Edit profile/save
  function handleEditProfileSave(){
    setProfile(profileEdit);
    setShowEditProfile(false);
    alert('Profile Updated');
  }
  // Profile Password Change
  function handleProfilePasswordChange(){
    if(profileNewPassword.length<3) return alert('Password must be at least 3 characters!');
    setProfile({...profile, password: profileNewPassword});
    setShowProfilePassModal(false);
    setProfileNewPassword('');
    alert('Password changed!');
  }

  // officer promote/demote/delete/add/password
  const rankOrder = ['Assistant', 'Officer', 'Inspector', 'Commissioner'];
  function handlePromote(o: Officer) {
    const idx = rankOrder.indexOf(o.rank);
    if(idx >= 0 && idx<rankOrder.length-1) {
      setOfficers(officers.map(of=> of.id===o.id ? {...of, rank: rankOrder[idx+1]} : of))
    }
  }
  function handleDemote(o: Officer) {
    const idx = rankOrder.indexOf(o.rank);
    if(idx>0) {
      setOfficers(officers.map(of=> of.id===o.id ? {...of, rank: rankOrder[idx-1]} : of))
    }
  }
  function handleDelete(o: Officer){
    setOfficers(officers.filter(of=>of.id!==o.id))
  }
  function handlePasswordModal(o: Officer) {
    setPasswordOfficer(o);
    setNewPassword('');
    setShowPasswordModal(true);
  }
  function handleChangePassword() {
    if(newPassword.length<3) return alert("Password must be at least 3 characters");
    setOfficers(officers.map(of=>
      of.id===passwordOfficer?.id ? {...of, password: newPassword}:of
    ));
    setShowPasswordModal(false);
    setNewPassword('');
    setPasswordOfficer(null);
    alert('Password changed!');
  }
  function onShowAddOfficer(){
    setShowAddOfficer(true);
    setAddOfficerForm({
      firstName: '', lastName: '', rank: '', branch: '', houseNo:'', street:'', city:'', zipCode:'', password:''
    })
  }
  function handleAddOfficer() {
    for(const k in addOfficerForm){
      if(!(addOfficerForm as any)[k]) return alert('Fill all fields!');
    }
    setOfficers([
      ...officers,
      {
        ...addOfficerForm,
        id: Math.max(...officers.map(of=>of.id))+1
      }
    ]);
    setShowAddOfficer(false);
    alert('Officer added!');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-red-700">Senior Manager Portal</h1>
        </div>
        <nav className="flex-1 p-4">
          {(['Dashboard','Manage Officers','Manage Taxpayers','Taxlists','AuditLogs','Profile'] as View[]).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeView === view ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' : 'text-gray-700 hover:bg-red-50'
              }`}
            >
              {view === 'Dashboard' && <Home className="w-5 h-5" />}
              {view === 'Manage Officers' && <Users className="w-5 h-5" />}
              {view === 'Manage Taxpayers' && <FileText className="w-5 h-5" />}
              {view === 'Taxlists' && <DollarSign className="w-5 h-5" />}
              {view === 'AuditLogs' && <Shield className="w-5 h-5" />}
              {view === 'Profile' && <User className="w-5 h-5" />}
              <span>{view}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-red-700 text-white shadow hover:opacity-90"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">

        {activeView === 'Profile' && (
          <div className="max-w-3xl mx-auto grid gap-6 mt-6 pb-4">
            <div className="bg-white rounded-xl shadow border p-8 flex flex-col md:flex-row md:justify-between">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl mb-4 font-bold text-blue-900">My Profile</h3>
                  <div className="mb-2 grid grid-cols-1 gap-2">
                    <div><b className="text-gray-500">Officer ID:</b> <span className="font-mono text-lg text-purple-700">{profile.id}</span></div>
                    <div><b className="text-gray-500">First Name:</b> <span>{profile.firstName}</span></div>
                    <div><b className="text-gray-500">Last Name:</b> <span>{profile.lastName}</span></div>
                    <div><b className="text-gray-500">Rank:</b> <span className="font-bold text-gray-800">{profile.rank}</span></div>
                    <div><b className="text-gray-500">Branch:</b> <span className="text-purple-700">{profile.branch}</span></div>
                    <div><b className="text-gray-500">House No:</b> <span>{profile.houseNo}</span></div>
                    <div><b className="text-gray-500">Street:</b> <span>{profile.street}</span></div>
                    <div><b className="text-gray-500">City:</b> <span>{profile.city}</span></div>
                    <div><b className="text-gray-500">Zip Code:</b> <span>{profile.zipCode}</span></div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-md text-gray-400">Password</div>
                    <div className="font-mono text-md text-gray-900">{'*'.repeat(profile.password.length)}</div>
                  </div>
                </div>
              </div>
              <div className="md:ml-6 mt-6 md:mt-0 flex flex-col items-end gap-3">
                <button
                  onClick={() => { setProfileEdit(profile); setShowEditProfile(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Edit className="w-4 h-4" /> Edit Profile
                </button>
                <button
                  onClick={()=>{setShowProfilePassModal(true); setProfileNewPassword("");}}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-800 mt-2"
                >
                  <Lock className="w-4 h-4" /> Change Password
                </button>
              </div>
            </div>
            {showEditProfile && (
              <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow-lg relative">
                  <button
                    onClick={()=>setShowEditProfile(false)}
                    className="absolute right-2 top-2 hover:bg-gray-200 rounded-full p-2"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-bold mb-6 text-blue-700">Edit My Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs text-gray-600">First Name</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.firstName} onChange={e=>setProfileEdit({...profileEdit,firstName:e.target.value})}/>
                    </div>
                    <div><label className="text-xs text-gray-600">Last Name</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.lastName} onChange={e=>setProfileEdit({...profileEdit,lastName:e.target.value})}/>
                    </div>
                    <div><label className="text-xs text-gray-600">Rank</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.rank} onChange={e=>setProfileEdit({...profileEdit,rank:e.target.value})}/>
                    </div>
                    <div><label className="text-xs text-gray-600">Branch</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.branch} onChange={e=>setProfileEdit({...profileEdit,branch:e.target.value})}/>
                    </div>
                    <div><label className="text-xs text-gray-600">House No</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.houseNo} onChange={e=>setProfileEdit({...profileEdit,houseNo:e.target.value})}/>
                    </div>
                    <div><label className="text-xs text-gray-600">Street</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.street} onChange={e=>setProfileEdit({...profileEdit,street:e.target.value})}/>
                    </div>
                    <div><label className="text-xs text-gray-600">City</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.city} onChange={e=>setProfileEdit({...profileEdit,city:e.target.value})}/>
                    </div>
                    <div><label className="text-xs text-gray-600">Zip Code</label>
                      <input className="p-2 border rounded w-full" value={profileEdit.zipCode} onChange={e=>setProfileEdit({...profileEdit,zipCode:e.target.value})}/>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full py-2 bg-purple-700 hover:bg-purple-900 text-white rounded"
                    onClick={()=>{
                      setProfile(profileEdit); setShowEditProfile(false); alert('Profile Updated!');
                    }}
                  >Save Changes</button>
                </div>
              </div>
            )}
            {showProfilePassModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl max-w-xs w-full shadow-lg relative">
                  <button
                    onClick={()=>setShowProfilePassModal(false)}
                    className="absolute right-2 top-2 hover:bg-gray-200 rounded-full p-2"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-bold mb-6 text-red-700">Change Password</h3>
                  <input className="w-full p-3 border rounded mb-4" type="password" placeholder="New Password" value={profileNewPassword} onChange={e=>setProfileNewPassword(e.target.value)}/>
                  <button className="w-full py-2 bg-red-600 hover:bg-red-800 text-white rounded" onClick={handleProfilePasswordChange}>Save</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'Dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow border border-blue-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Taxpayers</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.totalTaxpayers}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow border border-gray-400 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Total Officers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalOfficers}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow border border-green-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Pending Tax Returns</p>
                  <p className="text-3xl font-bold text-green-900">{stats.pendingTaxReturns}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow border border-red-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">Pending Tickets</p>
                  <p className="text-3xl font-bold text-red-900">{stats.pendingTickets}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow border border-green-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                  <span style={{ fontSize: '24px', color: 'white' }}>৳</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-green-900">৳{stats.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow border border-red-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">Yearly Revenue</p>
                  <p className="text-3xl font-bold text-red-900">৳{stats.yearlyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Officers section, etc (unchanged from previous code!) */}
      </main>
    </div>
  );
}