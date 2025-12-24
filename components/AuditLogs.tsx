import { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const auditLogs = [
    { id: '700', returnId: '20000', reason: 'Random Check', issueDate: '13-DEC-2025', status: 'Clear' },
    { id: '701', returnId: '20001', reason: 'Income Mismatch', issueDate: '12-DEC-2025', status: 'Under Review' },
    { id: '702', returnId: '20002', reason: 'Doc Missing', issueDate: '10-DEC-2025', status: 'Pending' },
    { id: '703', returnId: '20003', reason: 'Late Filing', issueDate: '09-DEC-2025', status: 'Fined' },
    { id: '704', returnId: '20004', reason: 'Suspicious Activity Pattern Detected', issueDate: '08-DEC-2025', status: 'Investigating' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Clear':
        return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'Under Review':
        return { bg: '#e3f2fd', text: '#0056b3' };
      case 'Pending':
        return { bg: '#fff3e0', text: '#f57c00' };
      case 'Fined':
      case 'Investigating':
        return { bg: '#ffebee', text: '#c62828' };
      default:
        return { bg: '#f5f5f5', text: '#757575' };
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Audit Logs
          </h3>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option>All Statuses</option>
                <option>Clear</option>
                <option>Under Review</option>
                <option>Pending</option>
                <option>Fined</option>
                <option>Investigating</option>
              </select>

              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Calendar className="w-4 h-4" />
                Date Range
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Audit ID
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Return ID
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Reason
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Issue Date
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => {
                const statusColor = getStatusColor(log.status);
                return (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>#{log.id}</td>
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{log.returnId}</td>
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{log.reason}</td>
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{log.issueDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: statusColor.bg,
                          color: statusColor.text,
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500
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

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Showing 1 to 5 of 5 entries
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
              style={{ fontFamily: 'Inter, sans-serif' }}
              disabled
            >
              Previous
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
              style={{ fontFamily: 'Inter, sans-serif' }}
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}