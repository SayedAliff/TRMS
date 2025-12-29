import { useState } from 'react';
import { Search, Shield, ChevronLeft, ChevronRight, MessageSquare, User, Edit, Clock, TrendingUp } from 'lucide-react';

interface AuditLog {
  id: string;
  type: 'ticket_reply' | 'profile_change' | 'tax_audit' | 'officer_profile_change' | 'officer_password_change' | 'payment_confirmation';
  timestamp: string;
  description: string;
  performedBy: string;
  performedByName: string;
  performedByRank?:  string;
  relatedTo?:  string;
  relatedToName?: string;
  details?: any;
  status?:  string;
}

export function AuditLogs({ highlightAuditId }: { highlightAuditId?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const allAuditLogs:  AuditLog[] = [
    // Ticket Reply Logs
    { 
      id: '1001', 
      type: 'ticket_reply', 
      timestamp: '13-DEC-2025 10:15 AM', 
      description: 'Replied to support ticket #300', 
      performedBy: '1000', 
      performedByName: 'Rahim Uddin', 
      performedByRank: 'Inspector',
      relatedTo: '5000',
      relatedToName:  'Abul Kalam',
      details: { ticketId: '300', subject: 'Login Issue', reply: 'Password reset link sent to your registered email address.' }
    },
    { 
      id: '1002', 
      type: 'ticket_reply', 
      timestamp: '12-DEC-2025 11:30 AM', 
      description: 'Replied to support ticket #301', 
      performedBy: '1001', 
      performedByName: 'Karim Ahmed', 
      performedByRank: 'Commissioner',
      relatedTo: '5001',
      relatedToName:  'Bokul Mia',
      details: { ticketId: '301', subject:  'Calculation Error', reply: 'We are reviewing your tax calculation. Our team will respond within 24 hours.' }
    },
    { 
      id: '1003', 
      type: 'ticket_reply', 
      timestamp: '10-DEC-2025 03:30 PM', 
      description:  'Replied to support ticket #302', 
      performedBy: '1002', 
      performedByName: 'Siaam Khan', 
      performedByRank: 'Officer',
      relatedTo: '5002',
      relatedToName: 'Cina Akter',
      details: { ticketId: '302', subject: 'Address Update', reply: 'Your address has been updated in the system successfully.' }
    },
    
    // Taxpayer Profile Change Logs
    { 
      id: '2001', 
      type: 'profile_change', 
      timestamp: '13-DEC-2025 09:20 AM', 
      description:  'Taxpayer profile updated', 
      performedBy: '5000', 
      performedByName: 'Abul Kalam', 
      relatedTo: '5000',
      relatedToName: 'Abul Kalam',
      details: { 
        changes: [
          { field: 'Phone Number', oldValue: '01711111111', newValue: '01711111222' },
          { field: 'City', oldValue: 'Dhaka', newValue: 'Dhaka' }
        ]
      }
    },
    { 
      id: '2002', 
      type: 'profile_change', 
      timestamp: '12-DEC-2025 04:15 PM', 
      description:  'Taxpayer profile updated', 
      performedBy: '5002', 
      performedByName: 'Cina Akter', 
      relatedTo: '5002',
      relatedToName: 'Cina Akter',
      details: { 
        changes: [
          { field: 'Address', oldValue: '78, Agrabad', newValue: '79, Agrabad' },
          { field: 'Phone Number', oldValue: '01733333333', newValue: '01733333444' }
        ]
      }
    },
    
    // Officer Profile Change Logs (NEW!)
    { 
      id:  '3001', 
      type: 'officer_profile_change', 
      timestamp: '13-DEC-2025 02:30 PM', 
      description:  'Junior Officer profile updated', 
      performedBy: '1000', 
      performedByName: 'Rahim Uddin', 
      performedByRank: 'Inspector',
      relatedTo: '1000',
      relatedToName: 'Rahim Uddin',
      details: { 
        changes: [
          { field: 'Branch', oldValue: 'Gulshan', newValue: 'Banani' },
          { field:  'Phone', oldValue: '01711223344', newValue: '01711223355' },
          { field: 'Email', oldValue: 'rahim.uddin@nbr.gov.bd', newValue: 'rahim.u@nbr.gov.bd' }
        ]
      }
    },
    { 
      id: '3002', 
      type: 'officer_profile_change', 
      timestamp:  '12-DEC-2025 10:45 AM', 
      description: 'Junior Officer profile updated', 
      performedBy: '1002', 
      performedByName: 'Siaam Khan', 
      performedByRank: 'Officer',
      relatedTo: '1002',
      relatedToName: 'Siaam Khan',
      details: { 
        changes: [
          { field:  'First Name', oldValue: 'Siaam', newValue: 'Siam' },
          { field:  'Email', oldValue: 'siaam.khan@nbr.gov. bd', newValue: 'siam.khan@nbr.gov.bd' }
        ]
      }
    },
    
    // Officer Password Change Logs (NEW!)
    { 
      id: '4001', 
      type: 'officer_password_change', 
      timestamp:  '13-DEC-2025 03:15 PM', 
      description:  'Junior Officer password changed', 
      performedBy:  '1000', 
      performedByName: 'Rahim Uddin', 
      performedByRank: 'Inspector',
      relatedTo:  '1000',
      relatedToName: 'Rahim Uddin',
      details:  { 
        changes: [
          { field: 'Password', oldValue: '••••••', newValue: '••••••' }
        ]
      }
    },
    { 
      id: '4002', 
      type: 'officer_password_change', 
      timestamp: '11-DEC-2025 09:00 AM', 
      description:  'Junior Officer password changed', 
      performedBy: '1002', 
      performedByName: 'Siaam Khan', 
      performedByRank: 'Officer',
      relatedTo: '1002',
      relatedToName: 'Siaam Khan',
      details: { 
        changes:  [
          { field: 'Password', oldValue: '••••••', newValue: '••••••' }
        ]
      }
    },
    
    // Tax Audit Logs
    { 
      id: '700', 
      type: 'tax_audit', 
      timestamp: '13-DEC-2025', 
      description: 'Random Check', 
      performedBy: '1000', 
      performedByName: 'Rahim Uddin',
      performedByRank:  'Inspector',
      relatedTo: '5000',
      relatedToName: 'Abul Kalam',
      status: 'Clear',
      details: { returnId: '20000', reason: 'Random Check' }
    },
    { 
      id: '701', 
      type: 'tax_audit', 
      timestamp: '12-DEC-2025', 
      description: 'Income Mismatch', 
      performedBy: '1001', 
      performedByName: 'Karim Ahmed',
      performedByRank:  'Commissioner',
      relatedTo: '5001',
      relatedToName: 'Bokul Mia',
      status: 'Under Review',
      details: { returnId: '20001', reason:  'Income Mismatch' }
    },
    
    // Add payment confirmation logs
    { 
      id: '9001', 
      type: 'payment_confirmation', 
      timestamp: '13-DEC-2025 11:00 AM', 
      description: 'Payment confirmed for TIN 5002', 
      performedBy: '1001', 
      performedByName: 'Karim Ahmed', 
      performedByRank: 'Commissioner',
      relatedTo: '5002',
      relatedToName: 'Cina Akter',
      details: { returnId: '202', paymentStatus: 'Paid', amount: '35000' }
    },
  ];

  // Filter logs
  const filteredLogs = allAuditLogs.filter((log) => {
    const matchesSearch = 
      log.id.toLowerCase().includes(searchQuery. toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery. toLowerCase()) ||
      log.performedByName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.relatedToName && log.relatedToName.toLowerCase().includes(searchQuery. toLowerCase())) ||
      log.timestamp.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'All Types' || 
      (filterType === 'Ticket Replies' && log.type === 'ticket_reply') ||
      (filterType === 'Profile Changes' && log.type === 'profile_change') ||
      (filterType === 'Officer Changes' && (log.type === 'officer_profile_change' || log.type === 'officer_password_change')) ||
      (filterType === 'Tax Audits' && log.type === 'tax_audit');

    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs. length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ticket_reply':  
        return { bg: '#E3F2FD', text: '#1976d2', icon: MessageSquare };
      case 'profile_change':
        return { bg: '#FFF3E0', text: '#F57C00', icon: Edit };
      case 'officer_profile_change':
        return { bg: '#F3E5F5', text: '#7B1FA2', icon: User };
      case 'officer_password_change':
        return { bg: '#FFEBEE', text: '#C62828', icon: Shield };
      case 'tax_audit': 
        return { bg: '#FFEBEE', text: '#c62828', icon: Shield };
      case 'payment_confirmation':
        return { bg: '#E8F5E9', text: '#2e7d32', icon: TrendingUp };
      default:
        return { bg: '#F5F5F5', text: '#616161', icon: Clock };
    }
  };

  const getStatusColor = (status?:  string) => {
    if (!status) return null;
    switch (status) {
      case 'Clear':  
        return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'Under Review':
        return { bg: '#e3f2fd', text: '#1976d2' };
      case 'Pending':
        return { bg: '#fff3e0', text: '#f57c00' };
      case 'Fined':
        return { bg: '#ffebee', text: '#c62828' };
      default: 
        return { bg: '#f5f5f5', text: '#616161' };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ticket_reply':  return 'Ticket Reply';
      case 'profile_change': return 'Taxpayer Profile Change';
      case 'officer_profile_change':  return 'Officer Profile Update';
      case 'officer_password_change': return 'Officer Password Change';
      case 'tax_audit': return 'Tax Audit';
      case 'payment_confirmation': return 'Payment Confirmation';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
          <Shield className="w-6 h-6 text-red-700" />
        </div>
        <div>
          <h2 className="text-2xl mb-1 font-semibold text-red-700">Audit Logs</h2>
          <p className="text-sm text-gray-600">Track all system activities including ticket replies, profile changes, officer updates, and tax audits</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, description, officer name, taxpayer name, or timestamp..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target. value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition-colors"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target. value); setCurrentPage(1); }}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition-colors cursor-pointer"
            style={{ minWidth: '180px' }}
          >
            <option>All Types</option>
            <option>Ticket Replies</option>
            <option>Profile Changes</option>
            <option>Officer Changes</option>
            <option>Tax Audits</option>
          </select>
        </div>

        {(searchQuery || filterType !== 'All Types') && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active Filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2 bg-blue-100 text-blue-700 font-medium">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:opacity-70">×</button>
              </span>
            )}
            {filterType !== 'All Types' && (
              <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2 bg-orange-100 text-orange-700 font-medium">
                Type: {filterType}
                <button onClick={() => setFilterType('All Types')} className="hover:opacity-70">×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow border border-blue-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 mb-1 font-medium">Ticket Replies</p>
              <p className="text-3xl font-bold text-blue-800">
                {allAuditLogs.filter(l => l.type === 'ticket_reply').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow border border-orange-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
              <Edit className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-700 mb-1 font-medium">Taxpayer Changes</p>
              <p className="text-3xl font-bold text-orange-800">
                {allAuditLogs. filter(l => l.type === 'profile_change').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow border border-purple-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 mb-1 font-medium">Officer Changes</p>
              <p className="text-3xl font-bold text-purple-800">
                {allAuditLogs. filter(l => l.type === 'officer_profile_change' || l.type === 'officer_password_change').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow border border-red-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-red-700 mb-1 font-medium">Tax Audits</p>
              <p className="text-3xl font-bold text-red-800">
                {allAuditLogs.filter(l => l.type === 'tax_audit').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-700">
          Showing {filteredLogs.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} audit logs
        </p>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {currentLogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No audit logs found matching your filters</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterType('All Types'); }}
              className="px-6 py-3 rounded-lg bg-red-700 text-white hover:opacity-90 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          currentLogs.map((log) => {
            const typeColor = getTypeColor(log. type);
            const IconComponent = typeColor.icon;
            const statusColor = log.status ? getStatusColor(log.status) : null;

            return (
              <div
                key={log.id}
                className={`bg-white rounded-lg shadow border overflow-hidden hover:shadow-lg transition-all
                  ${highlightAuditId === log.id ? 'border-4 border-red-600 bg-red-50 animate-pulse' : 'border-gray-200'}`}
                onAnimationEnd={() => {/* Optionally clear highlight after animation */}}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: typeColor.bg }}>
                      <IconComponent className="w-6 h-6" style={{ color: typeColor.text }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: typeColor.bg, color: typeColor.text }}>
                              {getTypeLabel(log.type)}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">#{log.id}</span>
                            {statusColor && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>
                                {log.status}
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{log.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{log.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md: grid-cols-2 gap-4 mb-4">
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-purple-600" />
                            <p className="text-xs font-semibold text-purple-700">Performed By</p>
                          </div>
                          <p className="font-semibold text-gray-900">{log.performedByName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600">ID:  {log.performedBy}</span>
                            {log.performedByRank && (
                              <span className="px-2 py-0.5 rounded text-xs bg-purple-200 text-purple-800 font-medium">
                                {log.performedByRank}
                              </span>
                            )}
                          </div>
                        </div>

                        {log.relatedTo && (
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-blue-600" />
                              <p className="text-xs font-semibold text-blue-700">Related To</p>
                            </div>
                            <p className="font-semibold text-gray-900">{log.relatedToName}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {log.type === 'ticket_reply' || log.type === 'profile_change' ? 'TIN' : 'Officer ID'}: {log.relatedTo}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Details Section */}
                      {log.details && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-700 mb-3">Details</p>
                          
                          {log.type === 'ticket_reply' && (
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Ticket ID: </span>
                                <span className="text-sm font-semibold text-blue-600">#{log.details.ticketId}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Subject:</span>
                                <span className="text-sm font-medium text-gray-900">{log.details.subject}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Reply: </span>
                                <span className="text-sm text-gray-700 italic">"{log.details.reply}"</span>
                              </div>
                            </div>
                          )}

                          {(log.type === 'profile_change' || log.type === 'officer_profile_change' || log.type === 'officer_password_change') && log.details. changes && (
                            <div className="space-y-3">
                              {log.details.changes.map((change:  any, index: number) => (
                                <div key={index} className={`flex items-center gap-3 p-3 bg-white rounded border ${
                                  log.type === 'officer_profile_change' ?  'border-purple-200' : 
                                  log.type === 'officer_password_change' ? 'border-red-200' :
                                  'border-orange-200'
                                }`}>
                                  <TrendingUp className={`w-4 h-4 flex-shrink-0 ${
                                    log.type === 'officer_profile_change' ?  'text-purple-600' :
                                    log.type === 'officer_password_change' ? 'text-red-600' :
                                    'text-orange-600'
                                  }`} />
                                  <div className="flex-1">
                                    <p className="text-xs text-gray-600 mb-1">{change.field}</p>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-500 line-through">{change.oldValue}</span>
                                      <span className="text-gray-400">→</span>
                                      <span className={`text-sm font-semibold ${
                                        log.type === 'officer_profile_change' ? 'text-purple-700' :
                                        log. type === 'officer_password_change' ? 'text-red-700' :
                                        'text-orange-700'
                                      }`}>{change.newValue}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {log.type === 'tax_audit' && (
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Return ID:</span>
                                <span className="text-sm font-semibold text-red-600">#{log.details. returnId}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Reason:</span>
                                <span className="text-sm font-medium text-gray-900">{log.details.reason}</span>
                              </div>
                            </div>
                          )}

                          {log.type === 'payment_confirmation' && (
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Return ID:</span>
                                <span className="text-sm font-semibold text-green-600">#{log.details.returnId}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Status:</span>
                                <span className="text-sm font-medium text-gray-900">{log.details.paymentStatus}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-sm text-gray-600 min-w-[100px]">Amount:</span>
                                <span className="text-sm font-medium text-gray-900">{log.details.amount} BDT</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="bg-white rounded-lg shadow border border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 font-medium">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-transparent font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all font-semibold ${
                    currentPage === page
                      ? 'bg-red-700 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover: bg-gray-100 disabled: hover:bg-transparent font-medium"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}