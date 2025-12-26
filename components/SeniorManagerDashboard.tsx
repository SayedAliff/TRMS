import { useState } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  FileBarChart,
  X
} from 'lucide-react';
// Assuming AuditLogs is in the components folder as provided in your prompt
import { AuditLogs } from './AuditLogs'; 
import { User } from '../App';

interface SeniorManagerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'officers' | 'audit-logs' | 'reports' | 'settings';

export function SeniorManagerDashboard({ user, onLogout }: SeniorManagerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // --- NOTIFICATION SYSTEM STATE ---
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(4); // Initial unread count
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Security Alert',
      message: 'Junior Officer (ID: 1002) changed their password.',
      time: '10 mins ago',
      type: 'alert', // alert | info | success
      read: false
    },
    {
      id: 2,
      title: 'Officer Profile Update',
      message: 'Officer Rahim Uddin updated their contact details (Phone/Branch).',
      time: '45 mins ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'High Value Return',
      message: 'New corporate tax return submitted > 50 Lakh (TIN: 5001).',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: 4,
      title: 'Audit Triggered',
      message: 'System flagged TIN 5005 for random check.',
      time: '3 hours ago',
      type: 'alert',
      read: false
    }
  ]);

  // Toggle Notification Dropdown & Handle Read Logic
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAllRead = () => {
    setNotificationCount(0);
    const updatedNotifs = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifs);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    setShowNotifications(false);
  };

  const handleViewLogFromNotification = () => {
    setActiveView('audit-logs');
    setShowNotifications(false);
  };

  // Dashboard Stats
  const stats = {
    totalTaxCollection: '৳ 4.5 Cr',
    activeOfficers: 12,
    pendingAudits: 5,
    systemAlerts: notificationCount
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}
      >
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">NBR Admin</h1>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem 
            view="dashboard" 
            label="Dashboard" 
            icon={Home} 
            activeView={activeView} 
            setActiveView={setActiveView} 
            isOpen={isSidebarOpen} 
          />
          <NavItem 
            view="officers" 
            label="Officer Management" 
            icon={Users} 
            activeView={activeView} 
            setActiveView={setActiveView} 
            isOpen={isSidebarOpen} 
          />
          <NavItem 
            view="audit-logs" 
            label="System Audit Logs" 
            icon={Shield} 
            activeView={activeView} 
            setActiveView={setActiveView} 
            isOpen={isSidebarOpen} 
          />
          <NavItem 
            view="reports" 
            label="Zone Reports" 
            icon={FileBarChart} 
            activeView={activeView} 
            setActiveView={setActiveView} 
            isOpen={isSidebarOpen} 
          />
          <NavItem 
            view="settings" 
            label="System Settings" 
            icon={Settings} 
            activeView={activeView} 
            setActiveView={setActiveView} 
            isOpen={isSidebarOpen} 
          />
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={onLogout}
            className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition-colors text-red-100 ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white h-16 border-b flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeView === 'dashboard' && 'Senior Manager Dashboard'}
              {activeView === 'audit-logs' && 'System Audit & Security Logs'}
              {activeView === 'officers' && 'Officer Directory'}
              {activeView === 'reports' && 'Zone Performance Reports'}
              {activeView === 'settings' && 'System Configuration'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search system..." 
                className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all text-sm w-64"
              />
            </div>

            {/* --- NOTIFICATION SYSTEM UI --- */}
            <div className="relative">
              <button 
                onClick={handleNotificationClick}
                className="p-2 rounded-full hover:bg-gray-100 relative transition-colors focus:outline-none"
              >
                <Bell className={`w-6 h-6 ${showNotifications || notificationCount > 0 ? 'text-red-600' : 'text-gray-600'}`} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 border-2 border-white rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                    <div>
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <p className="text-xs text-gray-500">You have {notificationCount} unread alerts</p>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:underline font-medium">Mark read</button>
                       <button onClick={clearNotifications} className="text-xs text-gray-500 hover:text-red-600 hover:underline">Clear</button>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
                        <Bell className="w-8 h-8 text-gray-300" />
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          onClick={handleViewLogFromNotification}
                          className={`p-4 border-b hover:bg-blue-50 transition-colors cursor-pointer group ${!notif.read ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                              notif.type === 'alert' ? 'bg-red-500' : 
                              notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className={`text-sm font-semibold ${notif.type === 'alert' ? 'text-red-700' : 'text-gray-800'}`}>
                                  {notif.title}
                                </p>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                              {!notif.read && (
                                <span className="inline-block mt-2 text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">New</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t bg-gray-50 text-center">
                    <button 
                      onClick={() => { setActiveView('audit-logs'); setShowNotifications(false); }}
                      className="text-xs font-semibold text-gray-700 hover:text-red-700 flex items-center justify-center gap-1"
                    >
                      View All System Logs <TrendingUp className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pl-6 border-l">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.rank}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold border-2 border-gray-200">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Views */}
        <div className="flex-1 overflow-auto p-8">
          
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard icon={TrendingUp} label="Total Collection" value={stats.totalTaxCollection} color="blue" />
                <StatCard icon={Users} label="Active Officers" value={stats.activeOfficers} color="purple" />
                <StatCard icon={FileText} label="Pending Audits" value={stats.pendingAudits} color="orange" />
                <StatCard icon={AlertTriangle} label="System Alerts" value={stats.systemAlerts} color="red" />
              </div>

              {/* Alert Banner for Recent Critical Activities */}
              {notificationCount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertTriangle className="text-red-600 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900">Critical Updates Required Attention</h4>
                      <p className="text-sm text-red-700">There are {notificationCount} new system events including officer password changes and profile updates.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveView('audit-logs')}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Review Audit Logs
                  </button>
                </div>
              )}

              {/* Recent Activity Placeholder */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-800">Live Zone Activity</h3>
                  <button className="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Tax Return Verified</p>
                          <p className="text-sm text-gray-500">Dhaka North Zone • Inspector Rahim</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-gray-400">12:30 PM</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- AUDIT LOGS SECTION --- */}
          {activeView === 'audit-logs' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border border-blue-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900">System Audit & Security Logs</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Monitor all officer activities, including <strong>Profile Changes</strong>, <strong>Password Updates</strong>, and Ticket Resolutions.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Integration of the AuditLogs component */}
              <AuditLogs />
            </div>
          )}

          {activeView === 'officers' && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <Users className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">Officer Directory</h3>
              <p className="text-gray-500">Manage officer accounts and permissions here.</p>
            </div>
          )}
          
          {activeView === 'reports' && (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <FileBarChart className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">Zone Reports</h3>
              <p className="text-gray-500">Detailed analytics and tax collection reports will appear here.</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}
    </div>
  );
}

// Helper Components
function NavItem({ view, label, icon: Icon, activeView, setActiveView, isOpen }: any) {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 relative group ${
        isActive 
          ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      } ${!isOpen && 'justify-center'}`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
      {isOpen && <span className="font-medium text-sm">{label}</span>}
      {!isOpen && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
    red: { bg: 'bg-red-50', text: 'text-red-600' },
  };
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${colors[color].bg} group-hover:scale-105 duration-200`}>
          <Icon className={`w-6 h-6 ${colors[color].text}`} />
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded">Today</span>
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  );
}