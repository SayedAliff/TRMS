import { useState } from 'react';
import { Search, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

interface AuditLog {
  id: string;
  returnId: string;
  reason: string;
  issueDate: string;
  status:  'Clear' | 'Under Review' | 'Pending' | 'Fined' | 'Investigating';
}

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // Mock Audit Logs Data
  const allAuditLogs: AuditLog[] = [
    { id: '700', returnId: '20000', reason: 'Random Check', issueDate: '13-DEC-2025', status: 'Clear' },
    { id: '701', returnId: '20001', reason: 'Income Mismatch', issueDate: '12-DEC-2025', status: 'Under Review' },
    { id: '702', returnId: '20002', reason:  'Doc Missing', issueDate: '10-DEC-2025', status: 'Pending' },
    { id: '703', returnId: '20003', reason:  'Late Filing', issueDate: '09-DEC-2025', status:  'Fined' },
    { id: '704', returnId: '20004', reason:  'Suspicious Activity Pattern Detected', issueDate: '08-DEC-2025', status: 'Investigating' },
    { id: '705', returnId: '20005', reason:  'Tax Evasion Suspected', issueDate: '07-DEC-2025', status:  'Under Review' },
    { id:  '706', returnId: '20006', reason: 'Incomplete Documents', issueDate: '06-DEC-2025', status: 'Pending' },
    { id: '707', returnId: '20007', reason:  'Routine Audit', issueDate: '05-DEC-2025', status: 'Clear' },
    { id:  '708', returnId: '20008', reason: 'High Income Anomaly', issueDate:  '04-DEC-2025', status: 'Investigating' },
    { id: '709', returnId: '20009', reason: 'Non-compliance', issueDate: '03-DEC-2025', status: 'Fined' },
  ];

  // Filter logs based on search and status
  const filteredLogs = allAuditLogs.filter((log) => {
    const matchesSearch = 
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.returnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.issueDate.toLowerCase().includes(searchQuery. toLowerCase()) ||
      log.status.toLowerCase().includes(searchQuery. toLowerCase());

    const matchesStatus = statusFilter === 'All Statuses' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Status options
  const statusOptions = ['All Statuses', 'Clear', 'Under Review', 'Pending', 'Fined', 'Investigating'];

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Clear': 
        return { bg: '#e8f5e9', text:  '#2e7d32' };
      case 'Under Review': 
        return { bg: '#e3f2fd', text: '#1976d2' };
      case 'Pending':
        return { bg: '#fff3e0', text: '#f57c00' };
      case 'Fined':
        return { bg: '#ffebee', text: '#c62828' };
      case 'Investigating':
        return { bg: '#f3e5f5', text: '#7b1fa2' };
      default:
        return { bg:  '#f5f5f5', text: '#616161' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ffebee' }}>
          <Shield className="w-6 h-6" style={{ color: '#c62828' }} />
        </div>
        <div>
          <h2 className="text-2xl mb-1" style={{ fontFamily:  'Inter, sans-serif', fontWeight: 600 }}>
            Audit Logs
          </h2>
          <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Monitor and track all tax return audits
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Audit ID, Return ID, Reason, Date, or Status..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus: border-red-400 transition-colors cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif', minWidth: '180px' }}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || statusFilter !== 'All Statuses') && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Active Filters:  
            </span>
            {searchQuery && (
              <span
                className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                }}
              >
                Search: "{searchQuery}"
                <button
                  onClick={() => handleSearchChange('')}
                  className="hover:opacity-70"
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter !== 'All Statuses' && (
              <span
                className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                style={{
                  backgroundColor: '#fff3e0',
                  color: '#f57c00',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight:  500,
                }}
              >
                Status: {statusFilter}
                <button
                  onClick={() => handleStatusChange('All Statuses')}
                  className="hover:opacity-70"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#1976d2', fontWeight: 500 }}>
          Showing {filteredLogs.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} audit logs
        </p>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th
                  className="px-6 py-4 text-left text-sm"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}
                >
                  Audit ID
                </th>
                <th
                  className="px-6 py-4 text-left text-sm"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}
                >
                  Return ID
                </th>
                <th
                  className="px-6 py-4 text-left text-sm"
                  style={{ fontFamily:  'Inter, sans-serif', fontWeight: 600, color:  '#616161' }}
                >
                  Reason
                </th>
                <th
                  className="px-6 py-4 text-left text-sm"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}
                >
                  Issue Date
                </th>
                <th
                  className="px-6 py-4 text-left text-sm"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500" style={{ fontFamily:  'Inter, sans-serif' }}>
                        No audit logs found matching your filters
                      </p>
                      <button
                        onClick={() => {
                          handleSearchChange('');
                          handleStatusChange('All Statuses');
                        }}
                        className="px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                        style={{
                          backgroundColor: '#c62828',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                currentLogs.map((log) => {
                  const statusColors = getStatusColor(log.status);
                  return (
                    <tr
                      key={log.id}
                      className="border-b border-gray-100 hover:bg-red-50 transition-colors"
                    >
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ fontFamily:  'Inter, sans-serif', fontWeight: 600, color:  '#c62828' }}
                      >
                        #{log.id}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ fontFamily:  'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {log.returnId}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {log.reason}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {log.issueDate}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs"
                          style={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.text,
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                          }}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredLogs.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs. length)} of {filteredLogs.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-transparent"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      currentPage === page
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: currentPage === page ? '#c62828' : 'transparent',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight:  currentPage === page ? 600 :  500,
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-transparent"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredLogs.length > 0 && (
        <div className="grid grid-cols-1 md: grid-cols-5 gap-4">
          {statusOptions.slice(1).map((status) => {
            const count = filteredLogs.filter((log) => log.status === status).length;
            const statusColors = getStatusColor(status);
            return (
              <div
                key={status}
                className="bg-white rounded-lg shadow border border-gray-200 p-4"
              >
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {status}
                </p>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight:  700,
                    color: statusColors.text,
                  }}
                >
                  {count}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}