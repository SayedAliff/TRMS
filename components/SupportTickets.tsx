import { useState, useEffect } from 'react';
import { Ticket, Plus, X, CheckCircle, Clock, XCircle } from 'lucide-react';

interface SupportTicket {
  ticketId: string;
  issueDescription: string;
  submissionDate: string;
  resolutionStatus: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  taxpayerTIN?: string;
  taxpayerName?: string;
}

interface SupportTicketsProps {
  userType: 'taxpayer' | 'officer';
  currentUserTIN?: string;
  tickets?: SupportTicket[];
  onStatusChange?: (ticketId: string, newStatus: SupportTicket['resolutionStatus']) => void;
}

export function SupportTickets({ 
  userType, 
  currentUserTIN,
  tickets: externalTickets,
  onStatusChange
}: SupportTicketsProps) {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [newIssue, setNewIssue] = useState('');
  const [tickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    // TODO: Integrate with Django API to fetch support tickets
    // Example:
    // fetch('/api/support/tickets/')
  }, [userType, currentUserTIN]);

  // DEMO DATA START
  // TODO: REMOVE DEMO DATA when connecting to Django API. Use API: /api/support/tickets/
  const demoTickets: SupportTicket[] = [
    {
      ticketId: '301',
      issueDescription: 'Login Issue',
      submissionDate: '2024-06-01',
      resolutionStatus: 'Resolved',
      taxpayerTIN: '5000',
      taxpayerName: 'Abul Kalam'
    },
    {
      ticketId: '302',
      issueDescription: 'Calculation Error',
      submissionDate: '2024-06-02',
      resolutionStatus: 'Open',
      taxpayerTIN: '5001',
      taxpayerName: 'Bokul Mia'
    }
  ];
  // DEMO DATA END

  // Use externalTickets if provided, else local tickets state
  const allTickets = externalTickets ?? demoTickets;

  // Filter tickets for taxpayer view
  const displayTickets = userType === 'taxpayer' 
    ? allTickets.filter(t => t.taxpayerTIN === currentUserTIN)
    : allTickets;

  const getStatusColor = (status: SupportTicket['resolutionStatus']) => {
    switch (status) {
      case 'Open': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-300';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: SupportTicket['resolutionStatus']) => {
    switch (status) {
      case 'Open': return <Clock className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4" />;
      case 'Closed': return <XCircle className="w-4 h-4" />;
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssue.trim()) return;

    const newTicket: SupportTicket = {
      ticketId: (300 + tickets.length + 1).toString(),
      issueDescription: newIssue.trim(),
      submissionDate: new Date().toISOString().split('T')[0],
      resolutionStatus: 'Open',
      taxpayerTIN: currentUserTIN,
      taxpayerName: 'Current User' // In real app, get from user data
    };

    // TODO: Integrate with Django API to create support ticket
    // Example:
    // fetch('/api/support/tickets/', { ... })
    setNewIssue('');
    setShowCreateTicket(false);
    alert(`Ticket #${newTicket.ticketId} created successfully!`);
  };

  const handleStatusChange = (ticketId: string, newStatus: SupportTicket['resolutionStatus']) => {
    if (onStatusChange) {
      onStatusChange(ticketId, newStatus);
    } 
    // TODO: Integrate with Django API to update ticket status
    // Example:
    // fetch(`/api/support/tickets/${ticketId}/`, { ... })
    alert(`Ticket #${ticketId} status updated to ${newStatus}`);
  };

  const themeColor = userType === 'taxpayer' ? 'blue' : 'purple';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Support Tickets</h3>
        {userType === 'taxpayer' && (
          <button
            onClick={() => setShowCreateTicket(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-${themeColor}-600 text-white hover:bg-${themeColor}-700 font-medium`}
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        )}
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className={`bg-${themeColor}-50 border-b-2 border-${themeColor}-200`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Ticket_ID</th>
              {userType === 'officer' && (
                <>
                  <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>TIN</th>
                  <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Taxpayer</th>
                </>
              )}
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Issue_Description</th>
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Submission_Date</th>
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Resolution_Status</th>
              {userType === 'officer' && (
                <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayTickets.length === 0 ? (
              <tr>
                <td colSpan={userType === 'officer' ? 6 : 4} className="px-4 py-8 text-center text-gray-500">
                  <Ticket className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No support tickets found</p>
                </td>
              </tr>
            ) : (
              displayTickets.map((ticket, idx) => (
                <tr key={ticket.ticketId} className={idx % 2 === 0 ? `bg-${themeColor}-50/30` : 'bg-white'}>
                  <td className={`px-4 py-3 font-semibold text-${themeColor}-600`}>#{ticket.ticketId}</td>
                  {userType === 'officer' && (
                    <>
                      <td className="px-4 py-3 text-sm">{ticket.taxpayerTIN}</td>
                      <td className="px-4 py-3 text-sm font-medium">{ticket.taxpayerName}</td>
                    </>
                  )}
                  <td className="px-4 py-3 text-sm max-w-xs truncate" title={ticket.issueDescription}>
                    {ticket.issueDescription}
                  </td>
                  <td className="px-4 py-3 text-sm">{ticket.submissionDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.resolutionStatus)}`}>
                      {getStatusIcon(ticket.resolutionStatus)}
                      {ticket.resolutionStatus}
                    </span>
                  </td>
                  {userType === 'officer' && (
                    <td className="px-4 py-3">
                      <select
                        value={ticket.resolutionStatus}
                        onChange={(e) => handleStatusChange(ticket.ticketId, e.target.value as SupportTicket['resolutionStatus'])}
                        className={`px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-${themeColor}-400`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Ticket Modal - Only for Taxpayers */}
      {showCreateTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">Create Support Ticket</h3>
              <button onClick={() => setShowCreateTicket(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              <div>
                <label className="block text-sm mb-2 font-medium">Issue Description *</label>
                <textarea
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                <p><strong>Note:</strong> Your ticket will be reviewed by a tax officer. You can check the status from this page.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold">
                  Submit Ticket
                </button>
                <button type="button" onClick={() => setShowCreateTicket(false)} className="flex-1 py-3 rounded-lg border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}