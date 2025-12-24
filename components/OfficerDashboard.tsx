import { useState } from 'react';
import { Home, FileText, Shield, HelpCircle, LogOut, FileCheck, AlertTriangle, Ticket } from 'lucide-react';
import { User } from '../App';
import { ReviewReturns } from './ReviewReturns';
import { AuditLogs } from './AuditLogs';
import { SupportTickets } from './SupportTickets';

interface OfficerDashboardProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'review-returns' | 'audit-logs' | 'support';

export function OfficerDashboard({ user, onLogout }: OfficerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [showRankEdit, setShowRankEdit] = useState(false);
  const [currentRank, setCurrentRank] = useState('Inspector');

  const stats = {
    pendingReturns: 12,
    openTickets: 5,
    recentAudits: 3
  };

  const recentActivity = [
    { id: 1, text: 'Return #20001 submitted by TIN 5000', time: '2 hours ago' },
    { id: 2, text: 'Audit #704 logged for Return #20004', time: '5 hours ago' },
    { id: 3, text: 'Support Ticket #301 updated', time: '1 day ago' },
    { id: 4, text: 'Return #20000 approved', time: '2 days ago' },
  ];

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7B68EE' }}>
            Officer Portal
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeView === 'dashboard' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: activeView === 'dashboard' ? '#7B68EE' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('review-returns')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeView === 'review-returns' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: activeView === 'review-returns' ? '#7B68EE' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <FileCheck className="w-5 h-5" />
            <span>Review Returns</span>
          </button>

          <button
            onClick={() => setActiveView('audit-logs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeView === 'audit-logs' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: activeView === 'audit-logs' ? '#7B68EE' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}
          >
            <Shield className="w-5 h-5" />
            <span>Audit Logs</span>
          </button>

          <button
            onClick={() => setActiveView('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeView === 'support' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: activeView === 'support' ? '#7B68EE' : 'transparent',
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
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
                {user.name}
              </h2>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Rank: Inspector
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{user.name}</p>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Officer ID: {user.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#0056b3' }}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeView === 'dashboard' && (
            <>
              {/* Summary Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fff3e0' }}>
                      <FileText className="w-6 h-6" style={{ color: '#f57c00' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Pending Returns
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#f57c00' }}>
                        {stats.pendingReturns}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e3f2fd' }}>
                      <Ticket className="w-6 h-6" style={{ color: '#0056b3' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Open Tickets
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0056b3' }}>
                        {stats.openTickets}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ffebee' }}>
                      <AlertTriangle className="w-6 h-6" style={{ color: '#c62828' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Recent Audits (30 days)
                      </p>
                      <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#c62828' }}>
                        {stats.recentAudits}
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
                      <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#0056b3' }}></div>
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

          {activeView === 'review-returns' && <ReviewReturns />}
          {activeView === 'audit-logs' && <AuditLogs />}
          {activeView === 'support' && <SupportTickets userType="officer" />}
        </div>
      </main>
    </div>
  );
}