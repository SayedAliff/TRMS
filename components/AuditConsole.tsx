import { useState, useEffect } from 'react';
import { Filter, Calendar, AlertCircle } from 'lucide-react';

export function AuditConsole() {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const auditLogs = [
    {
      auditId: '704',
      returnId: '20004',
      reason: 'Suspicious',
      triggeredDate: '13-DEC-2025',
      status: 'Investigating',
      severity: 'critical'
    },
    {
      auditId: '700',
      returnId: '20001',
      reason: 'Income Mismatch',
      triggeredDate: '12-DEC-2025',
      status: 'Under Review',
      severity: 'warning'
    },
    {
      auditId: '701',
      returnId: '20000',
      reason: 'Random Check',
      triggeredDate: '10-DEC-2025',
      status: 'Clear',
      severity: 'clear'
    }
  ];

  const statusStyles = {
    critical: { 
      bg: '#FFEBEB', 
      text: '#DC2626',
      reasonColor: '#DC2626'
    },
    warning: { 
      bg: '#FFF4E5', 
      text: '#D97706',
      reasonColor: '#D97706'
    },
    clear: { 
      bg: '#E3FCEF', 
      text: '#059669',
      reasonColor: '#059669'
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {showToast && (
        <div 
          className="fixed top-6 right-6 bg-white rounded-lg shadow-xl border-l-4 border-red-500 p-4 max-w-md z-50 animate-slide-in"
          style={{ animation: 'slideInRight 0.3s ease-out' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="mb-1">New Audit Triggered</p>
              <p className="text-sm text-gray-600">
                Return #20004 flagged by System Trigger <code className="bg-gray-100 px-1 rounded text-xs">audit_payment</code>
              </p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl mb-4">Audit Log Monitor - Officer: Rahim Uddin</h2>
          
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Status: Under Review</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Date Range: This Month</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 text-sm text-gray-600">Audit ID</th>
                <th className="text-left px-6 py-4 text-sm text-gray-600">Return ID</th>
                <th className="text-left px-6 py-4 text-sm text-gray-600">Reason</th>
                <th className="text-left px-6 py-4 text-sm text-gray-600">Triggered Date</th>
                <th className="text-left px-6 py-4 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => {
                const style = statusStyles[log.severity as keyof typeof statusStyles];
                return (
                  <tr key={log.auditId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-gray-600">#{log.auditId}</span>
                      {log.severity === 'critical' && (
                        <span className="ml-2 text-xs text-gray-500">(seq: aud_seq)</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href="#" 
                        className="text-purple-600 hover:text-purple-700 hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        {log.returnId}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        style={{ color: style.reasonColor }}
                        className={log.severity === 'critical' ? 'font-bold' : ''}
                      >
                        {log.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {log.triggeredDate}
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="px-3 py-1 rounded-full text-sm inline-block"
                        style={{ 
                          backgroundColor: style.bg,
                          color: style.text
                        }}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-gray-50 text-sm text-gray-600 rounded-b-xl">
          <p>
            <span className="font-medium">Trigger Logic:</span> System automatically creates audit entries via <code className="bg-white px-2 py-1 rounded text-xs">audit_payment</code> trigger when suspicious patterns detected
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
