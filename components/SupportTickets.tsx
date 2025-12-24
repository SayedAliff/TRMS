import { useState } from 'react';
import { Plus, X, MessageSquare } from 'lucide-react';

interface SupportTicketsProps {
  userType: 'taxpayer' | 'officer';
  currentUserTIN?: string;
}

interface Ticket {
  id: string;
  issueDesc: string;
  subDate: string;
  resStatus: 'Open' | 'Pending' | 'Resolved';
  tin: string;
  description: string;
  officerFeedback?: string;
}

export function SupportTickets({ userType, currentUserTIN = '5000' }: SupportTicketsProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicket, setNewTicket] = useState({ subject: '', description: '' });
  const [officerFeedback, setOfficerFeedback] = useState('');

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: '300', issueDesc: 'Login Issue', subDate: '13-DEC-2025', resStatus: 'Resolved', tin: '5000', description: 'Cannot reset password', officerFeedback: 'Password reset link sent to your registered email. Please check spam folder as well.' },
    { id: '301', issueDesc: 'Calculation Error', subDate: '12-DEC-2025', resStatus: 'Pending', tin: '5001', description: 'Tax calculation showing incorrect amount' },
    { id: '302', issueDesc: 'Address Update', subDate: '10-DEC-2025', resStatus: 'Resolved', tin: '5002', description: 'Need to update my registered address', officerFeedback: 'Your address has been updated successfully in our system.' },
    { id: '303', issueDesc: 'Payment Failed', subDate: '13-DEC-2025', resStatus: 'Open', tin: '5003', description: 'Payment was deducted but not reflected in the system' },
    { id: '304', issueDesc: 'Certificate Needed', subDate: '13-DEC-2025', resStatus: 'Pending', tin: '5004', description: 'Need tax clearance certificate for visa application' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'Open':
        return { bg: '#E3F2FD', text: '#2F80ED' };
      case 'Pending':
        return { bg: '#fff3e0', text: '#f57c00' };
      default:
        return { bg: '#f5f5f5', text: '#757575' };
    }
  };

  const handleManage = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setOfficerFeedback(ticket.officerFeedback || '');
    setShowDetailModal(true);
  };

  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.description) return;

    const ticket: Ticket = {
      id: String(parseInt(tickets[tickets.length - 1].id) + 1),
      issueDesc: newTicket.subject,
      subDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      resStatus: 'Open',
      tin: currentUserTIN,
      description: newTicket.description
    };

    setTickets([...tickets, ticket]);
    setNewTicket({ subject: '', description: '' });
    setShowCreateModal(false);
  };

  const handleSubmitFeedback = () => {
    if (!selectedTicket || !officerFeedback) return;

    setTickets(tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, officerFeedback, resStatus: 'Resolved' }
        : t
    ));
    setShowDetailModal(false);
  };

  // Filter tickets based on user type
  const filteredTickets = userType === 'taxpayer' 
    ? tickets.filter(t => t.tin === currentUserTIN)
    : tickets;

  return (
    <div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Support Tickets
          </h3>
          {userType === 'taxpayer' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: '#0056b3',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}
            >
              <Plus className="w-4 h-4" />
              Create New Ticket
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Ticket ID
                </th>
                {userType === 'officer' && (
                  <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                    TIN
                  </th>
                )}
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Created Date
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => {
                const statusColor = getStatusColor(ticket.resStatus);
                return (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>#{ticket.id}</td>
                    {userType === 'officer' && (
                      <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{ticket.tin}</td>
                    )}
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{ticket.issueDesc}</td>
                    <td className="px-6 py-4 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{ticket.subDate}</td>
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
                        {ticket.resStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleManage(ticket)}
                        className="text-sm px-4 py-2 rounded-lg transition-all hover:opacity-80"
                        style={{
                          backgroundColor: userType === 'officer' ? '#7B68EE' : '#0056b3',
                          color: 'white',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500
                        }}
                      >
                        {userType === 'officer' ? 'Manage' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Create Support Ticket</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter ticket subject"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Description
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your issue in detail"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateTicket}
                  disabled={!newTicket.subject || !newTicket.description}
                  className="flex-1 py-3 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    backgroundColor: '#0056b3',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                  }}
                >
                  Create Ticket
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail/Manage Modal */}
      {showDetailModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Ticket #{selectedTicket.id}
              </h3>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>TIN</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{selectedTicket.tin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Created Date</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{selectedTicket.subDate}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Status</p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: getStatusColor(selectedTicket.resStatus).bg,
                      color: getStatusColor(selectedTicket.resStatus).text,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500
                    }}
                  >
                    {selectedTicket.resStatus}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Subject</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.125rem' }}>{selectedTicket.issueDesc}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Description</p>
                <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedTicket.description}</p>
              </div>

              {selectedTicket.officerFeedback && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5" style={{ color: '#2e7d32' }} />
                    <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2e7d32' }}>Officer Feedback</p>
                  </div>
                  <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedTicket.officerFeedback}</p>
                </div>
              )}

              {userType === 'officer' && selectedTicket.resStatus !== 'Resolved' && (
                <div>
                  <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Officer Feedback
                  </label>
                  <textarea
                    value={officerFeedback}
                    onChange={(e) => setOfficerFeedback(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your feedback to resolve this ticket"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {userType === 'officer' && selectedTicket.resStatus !== 'Resolved' ? (
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={!officerFeedback}
                    className="flex-1 py-3 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{
                      backgroundColor: '#2e7d32',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    Submit & Resolve
                  </button>
                ) : null}
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
