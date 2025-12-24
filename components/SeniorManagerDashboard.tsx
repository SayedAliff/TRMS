import { useState } from 'react';
import { Home, Users, Shield, HelpCircle, LogOut, UserPlus, Edit, Trash2, TrendingUp, TrendingDown, UserCog, FileText, CheckCircle, XCircle, Phone, MapPin } from 'lucide-react';
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
  
  // Taxpayer management states
  const [showAddTaxpayer, setShowAddTaxpayer] = useState(false);
  const [showEditTaxpayer, setShowEditTaxpayer] = useState(false);
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<any>(null);
  
  const [newOfficer, setNewOfficer] = useState({
    firstName: '',
    lastName: '',
    rank: 'Inspector',
    branch: '',
    houseNo: '',
    street: '',
    city: '',
    zipCode: '',
    password: ''
  });
  
  const [newTaxpayer, setNewTaxpayer] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    houseNo: '',
    street: '',
    city: '',
    zipCode: '',
    phoneNumber1: '',
    phoneNumber2: '',
    zoneCode: '',
    zoneName: '',
    password: ''
  });
  
  // Tax Return fields for new taxpayer
  const [newTaxReturn, setNewTaxReturn] = useState({
    assessmentYear: '2024-2025',
    totalIncome: '',
    taxableAmount: '',
    filingDate: '',
    categoryId: '1',
    officerId: ''
  });

  // Mock junior officers data - using state so we can update it
  const [juniorOfficers, setJuniorOfficers] = useState([
    { id: '1000', firstName: 'Rahim', lastName: 'Uddin', rank: 'Inspector', branch: 'Gulshan' },
    { id: '1002', firstName: 'Siaam', lastName: 'Khan', rank: 'Officer', branch: 'Motijheel' },
    { id: '1003', firstName: 'Nadia', lastName: 'Islam', rank: 'Assistant', branch: 'Zindabazar' },
    { id: '1004', firstName: 'Fahim', lastName: 'Hossain', rank: 'Inspector', branch: 'New Market' },
  ]);
  
  // Comprehensive Tax List Data with Officer and Payment Info
  const [comprehensiveTaxData, setComprehensiveTaxData] = useState([
    {
      tin: '5000',
      taxpayerName: 'Abul Kalam',
      gender: 'Male',
      city: 'Dhaka',
      phone: '01711111111',
      zone: 'Dhaka North',
      returnId: '200',
      assessmentYear: '2024-2025',
      totalIncome: '500000',
      taxableAmount: '50000',
      paymentStatus: 'Paid',
      paymentConfirmedBy: '1000',
      paymentConfirmedByName: 'Rahim Uddin',
      assignedOfficerId: '1000',
      assignedOfficerName: 'Rahim Uddin',
      ticketsResolved: 2,
      category: 'Individual'
    },
    {
      tin: '5001',
      taxpayerName: 'Bokul Mia',
      gender: 'Male',
      city: 'Dhaka',
      phone: '01922222222',
      zone: 'Dhaka South',
      returnId: '201',
      assessmentYear: '2024-2025',
      totalIncome: '1200000',
      taxableAmount: '120000',
      paymentStatus: 'Paid',
      paymentConfirmedBy: '1002',
      paymentConfirmedByName: 'Siaam Khan',
      assignedOfficerId: '1002',
      assignedOfficerName: 'Siaam Khan',
      ticketsResolved: 3,
      category: 'Corporate'
    },
    {
      tin: '5002',
      taxpayerName: 'Cina Akter',
      gender: 'Female',
      city: 'Chittagong',
      phone: '01733333333',
      zone: 'Chittagong Zone',
      returnId: '202',
      assessmentYear: '2024-2025',
      totalIncome: '350000',
      taxableAmount: '35000',
      paymentStatus: 'Pending',
      paymentConfirmedBy: null,
      paymentConfirmedByName: '-',
      assignedOfficerId: '1003',
      assignedOfficerName: 'Nadia Islam',
      ticketsResolved: 1,
      category: 'Individual'
    },
    {
      tin: '5003',
      taxpayerName: 'David Roy',
      gender: 'Male',
      city: 'Sylhet',
      phone: '01844444444',
      zone: 'Sylhet Zone',
      returnId: '203',
      assessmentYear: '2024-2025',
      totalIncome: '800000',
      taxableAmount: '80000',
      paymentStatus: 'Paid',
      paymentConfirmedBy: '1003',
      paymentConfirmedByName: 'Nadia Islam',
      assignedOfficerId: '1003',
      assignedOfficerName: 'Nadia Islam',
      ticketsResolved: 0,
      category: 'Individual'
    },
    {
      tin: '5004',
      taxpayerName: 'Eva Rahman',
      gender: 'Female',
      city: 'Rajshahi',
      phone: '01555555555',
      zone: 'Rajshahi Zone',
      returnId: '204',
      assessmentYear: '2024-2025',
      totalIncome: '450000',
      taxableAmount: '45000',
      paymentStatus: 'Paid',
      paymentConfirmedBy: '1000',
      paymentConfirmedByName: 'Rahim Uddin',
      assignedOfficerId: '1004',
      assignedOfficerName: 'Fahim Hossain',
      ticketsResolved: 1,
      category: 'Individual'
    }
  ]);
  
  // Mock taxpayers data - using state so we can update it
  const [taxpayers, setTaxpayers] = useState([
    { id: '5000', firstName: 'Abul', lastName: 'Kalam', gender: 'Male', city: 'Dhaka', phoneNumber1: '01711111111', zoneName: 'Dhaka North' },
    { id: '5001', firstName: 'Bokul', lastName: 'Mia', gender: 'Male', city: 'Dhaka', phoneNumber1: '01922222222', zoneName: 'Dhaka South' },
    { id: '5002', firstName: 'Cina', lastName: 'Akter', gender: 'Female', city: 'Chittagong', phoneNumber1: '01733333333', zoneName: 'Chittagong Zone' },
    { id: '5003', firstName: 'David', lastName: 'Roy', gender: 'Male', city: 'Sylhet', phoneNumber1: '01844444444', zoneName: 'Sylhet Zone' },
    { id: '5004', firstName: 'Eva', lastName: 'Rahman', gender: 'Female', city: 'Rajshahi', phoneNumber1: '01555555555', zoneName: 'Rajshahi Zone' },
  ]);

  const stats = {
    totalOfficers: juniorOfficers.length,
    totalTaxpayers: taxpayers.length,
    pendingAudits: 3,
    totalRevenue: '41,000'
  };

  const handleAddOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate officer_seq.NEXTVAL (starting from 1000)
    const nextOfficerId = (1000 + juniorOfficers.length + 1).toString();
    const newOff = {
      id: nextOfficerId,
      firstName: newOfficer.firstName,
      lastName: newOfficer.lastName,
      rank: newOfficer.rank,
      branch: newOfficer.branch
    };
    setJuniorOfficers([...juniorOfficers, newOff]);
    alert(`Officer Added Successfully!\nOfficer ID: ${nextOfficerId}\nName: ${newOfficer.firstName} ${newOfficer.lastName}`);
    setShowAddOfficer(false);
    setNewOfficer({
      firstName: '',
      lastName: '',
      rank: 'Inspector',
      branch: '',
      houseNo: '',
      street: '',
      city: '',
      zipCode: '',
      password: ''
    });
  };

  const handleEditOfficer = (officer: any) => {
    setSelectedOfficer(officer);
    setNewOfficer({
      firstName: officer.firstName,
      lastName: officer.lastName,
      rank: officer.rank,
      branch: officer.branch,
      houseNo: '',
      street: '',
      city: '',
      zipCode: '',
      password: ''
    });
    setShowEditOfficer(true);
  };

  const handleUpdateOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOfficers = juniorOfficers.map(off => 
      off.id === selectedOfficer.id 
        ? { ...off, firstName: newOfficer.firstName, lastName: newOfficer.lastName, rank: newOfficer.rank, branch: newOfficer.branch }
        : off
    );
    setJuniorOfficers(updatedOfficers);
    alert(`Officer #${selectedOfficer.id} Updated Successfully!`);
    setShowEditOfficer(false);
    setSelectedOfficer(null);
    setNewOfficer({
      firstName: '',
      lastName: '',
      rank: 'Inspector',
      branch: '',
      houseNo: '',
      street: '',
      city: '',
      zipCode: '',
      password: ''
    });
  };

  const handlePromote = (officer: any) => {
    const rankOrder = ['Assistant', 'Officer', 'Inspector', 'Senior Manager'];
    const currentIndex = rankOrder.indexOf(officer.rank);
    if (currentIndex < rankOrder.length - 1) {
      const newRank = rankOrder[currentIndex + 1];
      const updatedOfficers = juniorOfficers.map(off => 
        off.id === officer.id ? { ...off, rank: newRank } : off
      );
      setJuniorOfficers(updatedOfficers);
      alert(`Officer #${officer.id} promoted to ${newRank}!`);
    } else {
      alert(`Officer #${officer.id} is already at the highest rank!`);
    }
  };

  const handleDemote = (officer: any) => {
    const rankOrder = ['Assistant', 'Officer', 'Inspector', 'Senior Manager'];
    const currentIndex = rankOrder.indexOf(officer.rank);
    if (currentIndex > 0) {
      const newRank = rankOrder[currentIndex - 1];
      const updatedOfficers = juniorOfficers.map(off => 
        off.id === officer.id ? { ...off, rank: newRank } : off
      );
      setJuniorOfficers(updatedOfficers);
      alert(`Officer #${officer.id} demoted to ${newRank}!`);
    } else {
      alert(`Officer #${officer.id} is already at the lowest rank!`);
    }
  };

  const handleDelete = (officer: any) => {
    if (confirm(`Are you sure you want to delete Officer #${officer.id} (${officer.firstName} ${officer.lastName})?`)) {
      const updatedOfficers = juniorOfficers.filter(off => off.id !== officer.id);
      setJuniorOfficers(updatedOfficers);
      alert(`Officer #${officer.id} deleted successfully!`);
    }
  };

  // Taxpayer CRUD operations
  const handleAddTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate TIN and check if it exists (simulate database check)
    let nextTaxpayerId: string;
    let tinExists = true;
    let attempts = 0;
    
    while (tinExists && attempts < 100) {
      nextTaxpayerId = (5000 + taxpayers.length + attempts).toString();
      tinExists = taxpayers.some(t => t.id === nextTaxpayerId);
      attempts++;
    }
    
    nextTaxpayerId = (5000 + taxpayers.length + attempts - 1).toString();
    
    const newTax = {
      id: nextTaxpayerId,
      firstName: newTaxpayer.firstName,
      lastName: newTaxpayer.lastName,
      gender: newTaxpayer.gender,
      city: newTaxpayer.city,
      phoneNumber1: newTaxpayer.phoneNumber1,
      zoneName: newTaxpayer.zoneName
    };
    
    setTaxpayers([...taxpayers, newTax]);
    
    // Generate Return ID (auto-increment from 200)
    const returnId = (200 + taxpayers.length).toString();
    
    alert(`Taxpayer & Tax Return Added Successfully!\n\nTIN: ${nextTaxpayerId}\nReturn ID: ${returnId}\nName: ${newTaxpayer.firstName} ${newTaxpayer.lastName}\nAssessment Year: ${newTaxReturn.assessmentYear}\nTotal Income: ৳${newTaxReturn.totalIncome}\nTaxable Amount: ৳${newTaxReturn.taxableAmount}\nOfficer ID: ${newTaxReturn.officerId}`);
    
    setShowAddTaxpayer(false);
    setNewTaxpayer({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'Male',
      houseNo: '',
      street: '',
      city: '',
      zipCode: '',
      phoneNumber1: '',
      phoneNumber2: '',
      zoneCode: '',
      zoneName: '',
      password: ''
    });
    setNewTaxReturn({
      assessmentYear: '2024-2025',
      totalIncome: '',
      taxableAmount: '',
      filingDate: '',
      categoryId: '1',
      officerId: ''
    });
  };

  const handleEditTaxpayer = (taxpayer: any) => {
    setSelectedTaxpayer(taxpayer);
    setNewTaxpayer({
      firstName: taxpayer.firstName,
      lastName: taxpayer.lastName,
      dateOfBirth: '',
      gender: taxpayer.gender,
      houseNo: '',
      street: '',
      city: taxpayer.city,
      zipCode: '',
      phoneNumber1: taxpayer.phoneNumber1,
      phoneNumber2: '',
      zoneCode: '',
      zoneName: taxpayer.zoneName,
      password: ''
    });
    setShowEditTaxpayer(true);
  };

  const handleUpdateTaxpayer = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTaxpayers = taxpayers.map(tax => 
      tax.id === selectedTaxpayer.id 
        ? { ...tax, firstName: newTaxpayer.firstName, lastName: newTaxpayer.lastName, gender: newTaxpayer.gender, city: newTaxpayer.city, phoneNumber1: newTaxpayer.phoneNumber1, zoneName: newTaxpayer.zoneName }
        : tax
    );
    setTaxpayers(updatedTaxpayers);
    alert(`Taxpayer #${selectedTaxpayer.id} Updated Successfully!`);
    setShowEditTaxpayer(false);
    setSelectedTaxpayer(null);
    setNewTaxpayer({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'Male',
      houseNo: '',
      street: '',
      city: '',
      zipCode: '',
      phoneNumber1: '',
      phoneNumber2: '',
      zoneCode: '',
      zoneName: '',
      password: ''
    });
  };

  const handleDeleteTaxpayer = (taxpayer: any) => {
    if (confirm(`Are you sure you want to delete Taxpayer TIN #${taxpayer.id} (${taxpayer.firstName} ${taxpayer.lastName})?`)) {
      const updatedTaxpayers = taxpayers.filter(tax => tax.id !== taxpayer.id);
      setTaxpayers(updatedTaxpayers);
      alert(`Taxpayer TIN #${taxpayer.id} deleted successfully!`);
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#c62828' }}>
            Senior Manager Portal
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'dashboard' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
            }`}
            style={{
              background: activeView === 'dashboard' ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('officers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'officers' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
            }`}
            style={{
              background: activeView === 'officers' ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <Users className="w-5 h-5" />
            <span>Manage Officers</span>
          </button>

          <button
            onClick={() => setActiveView('taxpayers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'taxpayers' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
            }`}
            style={{
              background: activeView === 'taxpayers' ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <UserCog className="w-5 h-5" />
            <span>Manage Taxpayers</span>
          </button>

          <button
            onClick={() => setActiveView('tax-list')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'tax-list' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
            }`}
            style={{
              background: activeView === 'tax-list' ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <FileText className="w-5 h-5" />
            <span>Tax List</span>
          </button>

          <button
            onClick={() => setActiveView('audit-logs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'audit-logs' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
            }`}
            style={{
              background: activeView === 'audit-logs' ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <Shield className="w-5 h-5" />
            <span>Audit Logs</span>
          </button>

          <button
            onClick={() => setActiveView('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'support' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
            }`}
            style={{
              background: activeView === 'support' ? 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-white transition-all hover:opacity-90 shadow-md"
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 600 
            }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Rank: {user.rank} | Branch: {user.branch}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Officer ID: {user.id}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#c62828' }}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeView === 'dashboard' && (
            <>
              {/* Role Badge */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FFEBEE' }}>
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#c62828' }}>
                  Role: senior_manager_role
                </p>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Permissions: ALL on Taxpayer, Tax_Return, Payment, Audit_Log | Full CRUD on Officers
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFEBEE' }}>
                      <Users className="w-6 h-6" style={{ color: '#c62828' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Junior Officers
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#c62828' }}>
                        {stats.totalOfficers}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
                      <Users className="w-6 h-6" style={{ color: '#2F80ED' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Total Taxpayers
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#2F80ED' }}>
                        {stats.totalTaxpayers}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ffebee' }}>
                      <Shield className="w-6 h-6" style={{ color: '#c62828' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Pending Audits
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#c62828' }}>
                        {stats.pendingAudits}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e8f5e9' }}>
                      <Users className="w-6 h-6" style={{ color: '#2e7d32' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Total Revenue
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#2e7d32' }}>
                        {stats.totalRevenue} BDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeView === 'officers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Manage Junior Officers
                </h3>
                <button
                  onClick={() => setShowAddOfficer(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#c62828',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                  }}
                >
                  <UserPlus className="w-4 h-4" />
                  Add Officer
                </button>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Officer ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Branch
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {juniorOfficers.map((officer) => (
                      <tr key={officer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>#{officer.id}</td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {officer.firstName} {officer.lastName}
                        </td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{officer.rank}</td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{officer.branch}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Edit" onClick={() => handleEditOfficer(officer)}>
                            <Edit className="w-4 h-4" style={{ color: '#2F80ED' }} />
                          </button>
                          <button className="p-2 hover:bg-green-50 rounded-lg transition-all" title="Promote" onClick={() => handlePromote(officer)}>
                            <TrendingUp className="w-4 h-4" style={{ color: '#2e7d32' }} />
                          </button>
                          <button className="p-2 hover:bg-orange-50 rounded-lg transition-all" title="Demote" onClick={() => handleDemote(officer)}>
                            <TrendingDown className="w-4 h-4" style={{ color: '#f57c00' }} />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Delete" onClick={() => handleDelete(officer)}>
                            <Trash2 className="w-4 h-4" style={{ color: '#c62828' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Officer Modal */}
              {showAddOfficer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Add New Junior Officer
                      </h3>
                      <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Officer ID will be auto-generated using off_seq
                      </p>
                    </div>

                    <form onSubmit={handleAddOfficer} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={newOfficer.firstName}
                            onChange={(e) => setNewOfficer({ ...newOfficer, firstName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={newOfficer.lastName}
                            onChange={(e) => setNewOfficer({ ...newOfficer, lastName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Rank *
                          </label>
                          <select
                            value={newOfficer.rank}
                            onChange={(e) => setNewOfficer({ ...newOfficer, rank: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <option>Inspector</option>
                            <option>Officer</option>
                            <option>Assistant</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Branch *
                          </label>
                          <input
                            type="text"
                            value={newOfficer.branch}
                            onChange={(e) => setNewOfficer({ ...newOfficer, branch: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowAddOfficer(false)}
                          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                          style={{
                            backgroundColor: '#c62828',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600
                          }}
                        >
                          Add Officer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Officer Modal */}
              {showEditOfficer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Edit Junior Officer
                      </h3>
                      <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Officer ID: {selectedOfficer.id}
                      </p>
                    </div>

                    <form onSubmit={handleUpdateOfficer} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={newOfficer.firstName}
                            onChange={(e) => setNewOfficer({ ...newOfficer, firstName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={newOfficer.lastName}
                            onChange={(e) => setNewOfficer({ ...newOfficer, lastName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Rank *
                          </label>
                          <select
                            value={newOfficer.rank}
                            onChange={(e) => setNewOfficer({ ...newOfficer, rank: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <option>Inspector</option>
                            <option>Officer</option>
                            <option>Assistant</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Branch *
                          </label>
                          <input
                            type="text"
                            value={newOfficer.branch}
                            onChange={(e) => setNewOfficer({ ...newOfficer, branch: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowEditOfficer(false)}
                          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                          style={{
                            backgroundColor: '#c62828',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600
                          }}
                        >
                          Update Officer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'taxpayers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Manage Taxpayers
                </h3>
                <button
                  onClick={() => setShowAddTaxpayer(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#c62828',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                  }}
                >
                  <UserPlus className="w-4 h-4" />
                  Add Taxpayer
                </button>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        TIN
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Gender
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        City
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Zone
                      </th>
                      <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxpayers.map((taxpayer) => (
                      <tr key={taxpayer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>#{taxpayer.id}</td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {taxpayer.firstName} {taxpayer.lastName}
                        </td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.gender}</td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.city}</td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.phoneNumber1}</td>
                        <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.zoneName}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Edit" onClick={() => handleEditTaxpayer(taxpayer)}>
                            <Edit className="w-4 h-4" style={{ color: '#2F80ED' }} />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Delete" onClick={() => handleDeleteTaxpayer(taxpayer)}>
                            <Trash2 className="w-4 h-4" style={{ color: '#c62828' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Taxpayer Modal */}
              {showAddTaxpayer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Add New Taxpayer
                      </h3>
                      <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        TIN will be auto-generated using taxpayer_seq
                      </p>
                    </div>

                    <form onSubmit={handleAddTaxpayer} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.firstName}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, firstName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.lastName}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Gender *
                          </label>
                          <select
                            value={newTaxpayer.gender}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            City *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.city}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={newTaxpayer.phoneNumber1}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Zone Name *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.zoneName}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zoneName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 py-3 rounded-lg text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: '#c62828', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Add Taxpayer
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddTaxpayer(false)}
                          className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Taxpayer Modal */}
              {showEditTaxpayer && selectedTaxpayer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Edit Taxpayer #{selectedTaxpayer.id}
                      </h3>
                    </div>

                    <form onSubmit={handleUpdateTaxpayer} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.firstName}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, firstName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.lastName}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, lastName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Gender *
                          </label>
                          <select
                            value={newTaxpayer.gender}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, gender: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            City *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.city}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, city: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={newTaxpayer.phoneNumber1}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, phoneNumber1: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Zone Name *
                          </label>
                          <input
                            type="text"
                            value={newTaxpayer.zoneName}
                            onChange={(e) => setNewTaxpayer({ ...newTaxpayer, zoneName: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 py-3 rounded-lg text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: '#2e7d32', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Update Taxpayer
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowEditTaxpayer(false);
                            setSelectedTaxpayer(null);
                          }}
                          className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'tax-list' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2F80ED' }}>
                  Tax List - All Taxpayers
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Complete overview of all taxpayers with officer assignments, payment confirmations, and ticket statistics
                </p>
              </div>

              {/* Officer Performance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {juniorOfficers.map((officer) => {
                  const officerTaxpayers = comprehensiveTaxData.filter(t => t.assignedOfficerId === officer.id);
                  const totalTickets = officerTaxpayers.reduce((sum, t) => sum + t.ticketsResolved, 0);
                  const paymentsConfirmed = comprehensiveTaxData.filter(t => t.paymentConfirmedBy === officer.id).length;
                  
                  return (
                    <div key={officer.id} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: '#7B68EE', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                          {officer.firstName[0]}{officer.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{officer.firstName} {officer.lastName}</p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>ID: {officer.id}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="text-gray-600">Taxpayers:</span>
                          <span style={{ fontWeight: 600, color: '#2F80ED' }}>{officerTaxpayers.length}</span>
                        </div>
                        <div className="flex justify-between text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="text-gray-600">Payments Confirmed:</span>
                          <span style={{ fontWeight: 600, color: '#2e7d32' }}>{paymentsConfirmed}</span>
                        </div>
                        <div className="flex justify-between text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="text-gray-600">Tickets Resolved:</span>
                          <span style={{ fontWeight: 600, color: '#f57c00' }}>{totalTickets}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Comprehensive Tax Data Table */}
              <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>TIN</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Taxpayer Name</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Gender</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>City</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Zone</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Return ID</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Total Income</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Tax Amount</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Assigned Officer</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Payment Status</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Confirmed By</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Tickets Resolved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comprehensiveTaxData.map((record) => (
                        <tr key={record.tin} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2F80ED' }}>
                            {record.tin}
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            {record.taxpayerName}
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {record.gender}
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              {record.city}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {record.zone}
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                            #{record.returnId}
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2e7d32' }}>
                            ৳{Number(record.totalIncome).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#f57c00' }}>
                            ৳{Number(record.taxableAmount).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7B68EE' }}>{record.assignedOfficerName}</p>
                              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>ID: {record.assignedOfficerId}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span 
                              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: record.paymentStatus === 'Paid' ? '#e8f5e9' : '#fff3e0',
                                color: record.paymentStatus === 'Paid' ? '#2e7d32' : '#f57c00',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600
                              }}
                            >
                              {record.paymentStatus === 'Paid' ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <XCircle className="w-3 h-3" />
                              )}
                              {record.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {record.paymentConfirmedBy ? (
                              <div>
                                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{record.paymentConfirmedByName}</p>
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>ID: {record.paymentConfirmedBy}</p>
                              </div>
                            ) : (
                              <span className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            <span 
                              className="inline-block px-3 py-1 rounded-full text-xs"
                              style={{
                                backgroundColor: record.ticketsResolved > 0 ? '#e3f2fd' : '#f5f5f5',
                                color: record.ticketsResolved > 0 ? '#2F80ED' : '#9e9e9e',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600
                              }}
                            >
                              {record.ticketsResolved}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary Statistics */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e8f5e9' }}>
                      <CheckCircle className="w-6 h-6" style={{ color: '#2e7d32' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Payments Completed</p>
                      <p className="text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#2e7d32' }}>
                        {comprehensiveTaxData.filter(t => t.paymentStatus === 'Paid').length} / {comprehensiveTaxData.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fff3e0' }}>
                      <FileText className="w-6 h-6" style={{ color: '#f57c00' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Total Tickets Resolved</p>
                      <p className="text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#f57c00' }}>
                        {comprehensiveTaxData.reduce((sum, t) => sum + t.ticketsResolved, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e3f2fd' }}>
                      <Users className="w-6 h-6" style={{ color: '#2F80ED' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Total Tax Revenue</p>
                      <p className="text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#2F80ED' }}>
                        ৳{comprehensiveTaxData.reduce((sum, t) => sum + Number(t.taxableAmount), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'audit-logs' && <AuditLogs />}
          {activeView === 'support' && <SupportTickets userType="officer" />}
        </div>
      </main>
    </div>
  );
}