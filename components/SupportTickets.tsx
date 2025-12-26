import { useState, useEffect } from 'react';
import { Plus, X, MessageSquare, Bell, User, Clock, CheckCircle } from 'lucide-react';

interface SupportTicketsProps {
  userType: 'taxpayer' | 'officer';
  currentUserTIN?: string;
  currentOfficerID?: string;
  currentOfficerName?: string;
  currentOfficerRank?: string;
  highlightUnread?: boolean;
  onNotificationUpdate?: (count: number) => void;
}

interface Reply {
  id: string;
  message: string;
  timestamp: string;
  repliedBy: string;
  repliedByName: string;
  repliedByRank?:  string;
  repliedByType:  'taxpayer' | 'officer';
}

interface Ticket {
  id: string;
  issueDesc: string;
  subDate: string;
  resStatus: 'Open' | 'Pending' | 'Resolved';
  tin: string;
  taxpayerName: string;
  description: string;
  replies: Reply[];
  unreadByTaxpayer: boolean;
  unreadByOfficer: boolean;
  lastReplyBy?:  string;
}

export function SupportTickets({ 
  userType, 
  currentUserTIN = '5000',
  currentOfficerID = '1000',
  currentOfficerName = 'Officer',
  currentOfficerRank = 'Inspector',
  highlightUnread = false,
  onNotificationUpdate
}: SupportTicketsProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicket, setNewTicket] = useState({ subject: '', description: '' });
  const [replyMessage, setReplyMessage] = useState('');

  const [tickets, setTickets] = useState<Ticket[]>([
    { 
      id: '300', 
      issueDesc:  'Login Issue', 
      subDate: '13-DEC-2025', 
      resStatus: 'Resolved', 
      tin: '5000',
      taxpayerName: 'Abul Kalam',
      description: 'Cannot reset password',
      unreadByTaxpayer: false,
      unreadByOfficer: false,
      lastReplyBy: 'officer',
      replies: [
        { id: 'r1', message: 'Cannot reset password', timestamp: '13-DEC-2025 10:00 AM', repliedBy: '5000', repliedByName: 'Abul Kalam', repliedByType: 'taxpayer' },
        { id: 'r2', message: 'Password reset link sent to your registered email address. ', timestamp: '13-DEC-2025 10:15 AM', repliedBy: '1000', repliedByName: 'Rahim Uddin', repliedByRank: 'Inspector', repliedByType: 'officer' }
      ]
    },
    { 
      id: '301', 
      issueDesc:  'Calculation Error', 
      subDate:  '12-DEC-2025', 
      resStatus: 'Open', 
      tin: '5001',
      taxpayerName:  'Bokul Mia',
      description: 'Tax calculation showing incorrect amount for my income bracket',
      unreadByTaxpayer: false,
      unreadByOfficer: true,
      replies: [
        { id: 'r3', message: 'Tax calculation showing incorrect amount for my income bracket', timestamp: '12-DEC-2025 09:30 AM', repliedBy: '5001', repliedByName: 'Bokul Mia', repliedByType:  'taxpayer' }
      ]
    },
    { 
      id: '302', 
      issueDesc: 'Address Update', 
      subDate: '10-DEC-2025', 
      resStatus: 'Resolved', 
      tin: '5002',
      taxpayerName: 'Cina Akter',
      description: 'Need to update my registered address',
      unreadByTaxpayer: false,
      unreadByOfficer: false,
      lastReplyBy: 'officer',
      replies: [
        { id: 'r4', message: 'Need to update my registered address', timestamp:  '10-DEC-2025 02:00 PM', repliedBy: '5002', repliedByName: 'Cina Akter', repliedByType:  'taxpayer' },
        { id: 'r5', message: 'Your address has been updated in the system successfully.', timestamp: '10-DEC-2025 03:30 PM', repliedBy: '1002', repliedByName: 'Siaam Khan', repliedByRank: 'Officer', repliedByType: 'officer' }
      ]
    },
    { 
      id: '303', 
      issueDesc: 'Payment Failed', 
      subDate: '13-DEC-2025', 
      resStatus: 'Open', 
      tin: '5003',
      taxpayerName: 'David Roy',
      description: 'Payment was deducted but not reflected in the system',
      unreadByTaxpayer: false,
      unreadByOfficer: true,
      replies: [
        { id: 'r6', message: 'Payment was deducted but not reflected in the system', timestamp: '13-DEC-2025 11:00 AM', repliedBy: '5003', repliedByName: 'David Roy', repliedByType: 'taxpayer' }
      ]
    }
  ]);

  // Calculate unread count
  useEffect(() => {
    if (onNotificationUpdate) {
      const unreadCount = userType === 'taxpayer'
        ? tickets.filter(t => t.tin === currentUserTIN && t. unreadByTaxpayer).length
        : tickets.filter(t => t.unreadByOfficer).length;
      onNotificationUpdate(unreadCount);
    }
  }, [tickets, userType, currentUserTIN, onNotificationUpdate]);

  const getStatusColor = (status:  string) => {
    switch (status) {
      case 'Resolved': 
        return { bg: '#e8f5e9', text:  '#2e7d32' };
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
    setReplyMessage('');
    setShowDetailModal(true);
    
    // Mark as read when opened
    if (userType === 'taxpayer' && ticket.unreadByTaxpayer) {
      setTickets(tickets. map(t => 
        t.id === ticket.id ? { ...t, unreadByTaxpayer: false } : t
      ));
    } else if (userType === 'officer' && ticket.unreadByOfficer) {
      setTickets(tickets.map(t => 
        t.id === ticket. id ? { ...t, unreadByOfficer: false } :  t
      ));
    }
  };

  const handleCreateTicket = () => {
    if (! newTicket.subject || !newTicket.description) return;

    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB', { day: '2-digit', month:  'short', year: 'numeric' }).toUpperCase() + 
                     ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const ticket: Ticket = {
      id: String(parseInt(tickets[tickets.length - 1].id) + 1),
      issueDesc: newTicket.subject,
      subDate: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      resStatus: 'Open',
      tin:  currentUserTIN,
      taxpayerName: getTaxpayerName(currentUserTIN),
      description: newTicket.description,
      unreadByTaxpayer: false,
      unreadByOfficer: true,
      replies: [{
        id: 'r' + Date.now(),
        message: newTicket.description,
        timestamp,
        repliedBy: currentUserTIN,
        repliedByName: getTaxpayerName(currentUserTIN),
        repliedByType: 'taxpayer'
      }]
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: '', description:  '' });
    setShowCreateModal(false);
    alert('Ticket created successfully!  Officers have been notified.');
  };

  const handleSendReply = () => {
    if (!selectedTicket || !replyMessage. trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() + 
                     ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newReply: Reply = {
      id: 'r' + Date.now(),
      message: replyMessage,
      timestamp,
      repliedBy: userType === 'officer' ? currentOfficerID :  currentUserTIN,
      repliedByName: userType === 'officer' ? currentOfficerName : getTaxpayerName(currentUserTIN),
      repliedByRank: userType === 'officer' ? currentOfficerRank : undefined,
      repliedByType:  userType
    };

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          replies: [...t.replies, newReply],
          resStatus: 'Pending' as const,
          lastReplyBy: userType,
          unreadByTaxpayer: userType === 'officer',
          unreadByOfficer: userType === 'taxpayer'
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setSelectedTicket({
      ... selectedTicket,
      replies:  [...selectedTicket.replies, newReply]
    });
    setReplyMessage('');
    
    const notifyUser = userType === 'officer' ? 'Taxpayer' : 'Officers';
    alert(`Reply sent successfully!  ${notifyUser} will be notified.`);
  };

  const handleResolveTicket = () => {
    if (!selectedTicket) return;
    
    const updatedTickets = tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, resStatus: 'Resolved' as const, unreadByTaxpayer: userType === 'officer', unreadByOfficer:  false }
        : t
    );
    
    setTickets(updatedTickets);
    setShowDetailModal(false);
    alert('Ticket marked as Resolved!');
  };

  const getTaxpayerName = (tin: string) => {
    const names:  { [key: string]: string } = {
      '5000':  'Abul Kalam',
      '5001': 'Bokul Mia',
      '5002': 'Cina Akter',
      '5003': 'David Roy',
      '5004': 'Eva Rahman'
    };
    return names[tin] || 'Unknown';
  };

  // Filter tickets
  const filteredTickets = userType === 'taxpayer' 
    ? tickets.filter(t => t.tin === currentUserTIN)
    : tickets;

  // Sort:  unread first if highlightUnread is true
  const sortedTickets = highlightUnread
    ? [... filteredTickets].sort((a, b) => {
        const aUnread = userType === 'taxpayer' ?  a.unreadByTaxpayer : a.unreadByOfficer;
        const bUnread = userType === 'taxpayer' ? b.unreadByTaxpayer : b.unreadByOfficer;
        return (bUnread ?  1 : 0) - (aUnread ? 1 : 0);
      })
    : filteredTickets;

  const unreadCount = sortedTickets.filter(t => 
    userType === 'taxpayer' ? t.unreadByTaxpayer : t.unreadByOfficer
  ).length;

  return (
    <div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">Support Tickets</h3>
            {unreadCount > 0 && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700 flex items-center gap-1">
                <Bell className="w-4 h-4" />
                {unreadCount} Unread
              </span>
            )}
          </div>
          {userType === 'taxpayer' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-90 transition-all font-semibold"
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Ticket ID</th>
                {userType === 'officer' && (
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Taxpayer</th>
                )}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Replies</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map((ticket) => {
                const statusColor = getStatusColor(ticket. resStatus);
                const isUnread = userType === 'taxpayer' ? ticket.unreadByTaxpayer : ticket.unreadByOfficer;
                return (
                  <tr 
                    key={ticket.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${isUnread ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        #{ticket.id}
                        {isUnread && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                      </div>
                    </td>
                    {userType === 'officer' && (
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{ticket.taxpayerName}</p>
                          <p className="text-sm text-gray-500">TIN: {ticket.tin}</p>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4">{ticket.issueDesc}</td>
                    <td className="px-6 py-4 text-gray-600">{ticket.subDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">{ticket.replies.length}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                      >
                        {ticket.resStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleManage(ticket)}
                        className="text-sm px-4 py-2 rounded-lg transition-all hover:opacity-80 font-medium text-white"
                        style={{ backgroundColor: userType === 'officer' ? '#7B68EE' : '#0056b3' }}
                      >
                        {isUnread ? 'View New' : 'View'}
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
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Create Support Ticket</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 font-medium">Subject *</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium">Description *</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus: outline-none focus:border-blue-400"
                  placeholder="Describe your issue in detail"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateTicket}
                  disabled={!newTicket.subject || !newTicket.description}
                  className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:opacity-90 transition-all disabled:opacity-50 font-semibold"
                >
                  Create Ticket
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div>
                <h3 className="text-2xl font-semibold">Ticket #{selectedTicket.id}</h3>
                <p className="text-sm opacity-90 mt-1">{selectedTicket.taxpayerName} (TIN: {selectedTicket. tin})</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subject</p>
                    <p className="font-semibold">{selectedTicket. issueDesc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Created Date</p>
                    <p className="font-semibold">{selectedTicket.subDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: getStatusColor(selectedTicket.resStatus).bg,
                        color: getStatusColor(selectedTicket.resStatus).text
                      }}
                    >
                      {selectedTicket.resStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conversation Thread */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Conversation ({selectedTicket.replies.length})
                </h4>
                <div className="space-y-4">
                  {selectedTicket.replies.map((reply, index) => (
                    <div 
                      key={reply.id}
                      className={`flex ${reply.repliedByType === 'taxpayer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] ${reply.repliedByType === 'taxpayer' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                        <div className={`px-4 py-3 rounded-lg ${
                          reply.repliedByType === 'taxpayer' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-900 rounded-tl-none border border-gray-200'
                        }`}>
                          {reply.repliedByType === 'officer' && (
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-300">
                              <User className="w-4 h-4 text-purple-600" />
                              <span className="font-semibold text-purple-700">{reply.repliedByName}</span>
                              {reply.repliedByRank && (
                                <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">
                                  {reply.repliedByRank}
                                </span>
                              )}
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">{reply.message}</p>
                        </div>
                        <div className={`flex items-center gap-2 text-xs text-gray-500 ${reply.repliedByType === 'taxpayer' ? 'flex-row-reverse' : ''}`}>
                          <Clock className="w-3 h-3" />
                          <span>{reply.timestamp}</span>
                          {reply.repliedByType === 'taxpayer' && (
                            <span className="font-medium">{reply.repliedByName}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Input */}
              {selectedTicket.resStatus !== 'Resolved' && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="block text-sm mb-2 font-medium">Add Reply</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Type your message here..."
                  />
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
              {selectedTicket.resStatus !== 'Resolved' && (
                <>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                    className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:opacity-90 transition-all disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Reply
                  </button>
                  {userType === 'officer' && (
                    <button
                      onClick={handleResolveTicket}
                      className="flex-1 py-3 rounded-lg bg-green-600 text-white hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Resolved
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}