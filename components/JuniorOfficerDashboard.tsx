import { useState } from 'react';
import { Home, Users, HelpCircle, LogOut, UserCheck, Ticket, FileText, DollarSign, Calendar, MapPin, Phone } from 'lucide-react';
import { User } from '../App';
import { SupportTickets } from './SupportTickets';

interface JuniorOfficerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'tax-list' | 'support';

export function JuniorOfficerDashboard({ user, onLogout }: JuniorOfficerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<number | null>(null);

  const stats = {
    totalTaxpayers: 5,
    openTickets: 3,
    resolvedToday: 2
  };

  const recentActivity = [
    { id: 1, text: 'New ticket #303 from TIN 5003', time: '1 hour ago' },
    { id: 2, text: 'Ticket #300 resolved for TIN 5000', time: '3 hours ago' },
    { id: 3, text: 'New taxpayer registered: TIN 5004', time: '1 day ago' },
  ];

  // Taxpayer Tax Return Data from Oracle Database
  const taxpayerTaxData = [
    {
      // Taxpayer Info
      tin: '5000',
      firstName: 'Abul',
      lastName: 'Kalam',
      gender: 'Male',
      city: 'Dhaka',
      phoneNumber1: '01711111111',
      zoneName: 'Dhaka North',
      zoneCode: '100',
      // Tax Return Info
      returnId: '200',
      assessmentYear: '2024-2025',
      totalIncome: '500000',
      taxableAmount: '50000',
      filingDate: '13-DEC-2025',
      taxCategory: 'Individual',
      taxType: 'Salaried Individual',
      officerId: '1000',
      returnStatus: 'Completed'
    },
    {
      tin: '5001',
      firstName: 'Bokul',
      lastName: 'Mia',
      gender: 'Male',
      city: 'Dhaka',
      phoneNumber1: '01922222222',
      zoneName: 'Dhaka North',
      zoneCode: '100',
      returnId: '201',
      assessmentYear: '2024-2025',
      totalIncome: '1200000',
      taxableAmount: '120000',
      filingDate: '13-DEC-2025',
      taxCategory: 'Corporate',
      taxType: 'Limited Company',
      officerId: '1000',
      returnStatus: 'Completed'
    },
    {
      tin: '5002',
      firstName: 'Cina',
      lastName: 'Akter',
      gender: 'Female',
      city: 'Chittagong',
      phoneNumber1: '01733333333',
      zoneName: 'Chittagong',
      zoneCode: '101',
      returnId: '202',
      assessmentYear: '2024-2025',
      totalIncome: '350000',
      taxableAmount: '35000',
      filingDate: '13-DEC-2025',
      taxCategory: 'Individual',
      taxType: 'Business Owner',
      officerId: '1001',
      returnStatus: 'Pending'
    },
    {
      tin: '5003',
      firstName: 'David',
      lastName: 'Roy',
      gender: 'Male',
      city: 'Sylhet',
      phoneNumber1: '01844444444',
      zoneName: 'Sylhet',
      zoneCode: '102',
      returnId: '203',
      assessmentYear: '2024-2025',
      totalIncome: '800000',
      taxableAmount: '80000',
      filingDate: '13-DEC-2025',
      taxCategory: 'Individual',
      taxType: 'Professional',
      officerId: '1002',
      returnStatus: 'Completed'
    },
    {
      tin: '5004',
      firstName: 'Eva',
      lastName: 'Rahman',
      gender: 'Female',
      city: 'Rajshahi',
      phoneNumber1: '01555555555',
      zoneName: 'Rajshahi',
      zoneCode: '103',
      returnId: '204',
      assessmentYear: '2024-2025',
      totalIncome: '450000',
      taxableAmount: '45000',
      filingDate: '13-DEC-2025',
      taxCategory: 'Individual',
      taxType: 'Self Employed',
      officerId: '1000',
      returnStatus: 'Completed'
    }
  ];

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7B68EE' }}>
            Junior Officer Portal
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'dashboard' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-purple-50'
            }`}
            style={{
              background: activeView === 'dashboard' ? 'linear-gradient(135deg, #7B68EE 0%, #6a5acd 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('tax-list')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'tax-list' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-purple-50'
            }`}
            style={{
              background: activeView === 'tax-list' ? 'linear-gradient(135deg, #7B68EE 0%, #6a5acd 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <FileText className="w-5 h-5" />
            <span>Tax List</span>
          </button>

          <button
            onClick={() => setActiveView('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
              activeView === 'support' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-purple-50'
            }`}
            style={{
              background: activeView === 'support' ? 'linear-gradient(135deg, #7B68EE 0%, #6a5acd 100%)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support Tickets</span>
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#7B68EE' }}>
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
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F3F0FF' }}>
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7B68EE' }}>
                  Role: junior_officer_role
                </p>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Permissions: SELECT, INSERT on Taxpayer | SELECT on Tax_Return, Payment
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
                      <UserCheck className="w-6 h-6" style={{ color: '#2F80ED' }} />
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
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fff3e0' }}>
                      <Ticket className="w-6 h-6" style={{ color: '#f57c00' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Open Tickets
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#f57c00' }}>
                        {stats.openTickets}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e8f5e9' }}>
                      <Ticket className="w-6 h-6" style={{ color: '#2e7d32' }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Resolved Today
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#2e7d32' }}>
                        {stats.resolvedToday}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#7B68EE' }}></div>
                      <div className="flex-1">
                        <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeView === 'tax-list' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Tax List - All Taxpayers
                    </h3>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Viewing {taxpayerTaxData.length} taxpayers with their tax return details
                    </p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>TIN</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Name</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Gender</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>City</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Phone</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Zone</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Return ID</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Assessment Year</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Total Income</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Taxable Amount</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Filing Date</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Category</th>
                        <th className="px-4 py-3 text-left text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxpayerTaxData.map((taxpayer, index) => (
                        <tr 
                          key={taxpayer.tin} 
                          className="border-b border-gray-100 hover:bg-purple-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedTaxpayer(selectedTaxpayer === index ? null : index)}
                        >
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7B68EE' }}>{taxpayer.tin}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayer.firstName} {taxpayer.lastName}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.gender}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.city}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.phoneNumber1}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.zoneName} ({taxpayer.zoneCode})</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayer.returnId}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.assessmentYear}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2e7d32' }}>৳{Number(taxpayer.totalIncome).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#f57c00' }}>৳{Number(taxpayer.taxableAmount).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.filingDate}</td>
                          <td className="px-4 py-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{taxpayer.taxCategory}</td>
                          <td className="px-4 py-3 text-sm">
                            <span 
                              className="inline-block px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: taxpayer.returnStatus === 'Completed' ? '#e8f5e9' : '#fff3e0',
                                color: taxpayer.returnStatus === 'Completed' ? '#2e7d32' : '#f57c00',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500
                              }}
                            >
                              {taxpayer.returnStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Selected Taxpayer Details */}
              {selectedTaxpayer !== null && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h4 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Selected Taxpayer Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>TIN</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7B68EE' }}>{taxpayerTaxData[selectedTaxpayer].tin}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Full Name</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerTaxData[selectedTaxpayer].firstName} {taxpayerTaxData[selectedTaxpayer].lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Gender</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerTaxData[selectedTaxpayer].gender}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>City</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerTaxData[selectedTaxpayer].city}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerTaxData[selectedTaxpayer].phoneNumber1}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <MapPin className="w-4 h-4" />
                        Tax Zone
                      </label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerTaxData[selectedTaxpayer].zoneName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Return ID</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{taxpayerTaxData[selectedTaxpayer].returnId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Assessment Year</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerTaxData[selectedTaxpayer].assessmentYear}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <DollarSign className="w-4 h-4" />
                        Total Income
                      </label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2e7d32' }}>৳{Number(taxpayerTaxData[selectedTaxpayer].totalIncome).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <DollarSign className="w-4 h-4" />
                        Taxable Amount
                      </label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#f57c00' }}>৳{Number(taxpayerTaxData[selectedTaxpayer].taxableAmount).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Tax Category</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerTaxData[selectedTaxpayer].taxCategory}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Tax Type</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7B68EE' }}>{taxpayerTaxData[selectedTaxpayer].taxType}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block" style={{ fontFamily: 'Inter, sans-serif' }}>Assigned Officer ID</label>
                      <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{taxpayerTaxData[selectedTaxpayer].officerId}</p>
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