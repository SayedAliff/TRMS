import { useState, useEffect } from 'react';
import { Ticket, Plus, X, CheckCircle, Clock, XCircle } from 'lucide-react';
import { supportAPI, SupportTicket as APISupportTicket } from '../lib/api';

// Use the backend SupportTicket type for all state and props
type SupportTicket = APISupportTicket & {
  ticket_id: number;
  taxpayer: string;
  assigned_officer?: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  resolved_at?: string;
};

interface SupportTicketsProps {
  userType: 'taxpayer' | 'officer';
  currentUserTIN?: string;
  tickets?: SupportTicket[];
  onStatusChange?: (ticket_id: number, newStatus: SupportTicket['status']) => void;
}

export function SupportTickets({
  userType,
  currentUserTIN,
  tickets: externalTickets,
  onStatusChange
}: SupportTicketsProps) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    let fetchPromise: Promise<APISupportTicket[]>;
    if (userType === 'taxpayer' && currentUserTIN) {
      fetchPromise = supportAPI.list(currentUserTIN);
    } else {
      fetchPromise = supportAPI.list();
    }
    fetchPromise
      .then(data => {
        setTickets(data as SupportTicket[]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch tickets');
        setLoading(false);
      });
  }, [userType, currentUserTIN]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const payload = {
        taxpayer: currentUserTIN,
        subject: newSubject,
        description: newDescription
      };
      const ticket = await supportAPI.create(payload as any);
      setTickets([ticket as SupportTicket, ...tickets]);
      setShowCreateTicket(false);
      setNewSubject('');
      setNewDescription('');
    } catch (err: any) {
      setError(err.message || 'Failed to create ticket');
    }
    setCreating(false);
  };

  const handleStatusChange = async (ticket_id: number, newStatus: SupportTicket['status']) => {
    setError('');
    try {
      const updated = await supportAPI.update(ticket_id, { status: newStatus } as any);
      setTickets(tickets.map(t => t.ticket_id === ticket_id ? (updated as SupportTicket) : t));
      if (onStatusChange) onStatusChange(ticket_id, newStatus);
    } catch (err: any) {
      setError(err.message || 'Failed to update ticket');
    }
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-300';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
    }
  };

  const themeColor = userType === 'taxpayer' ? 'blue' : 'purple';

  // Always cast to SupportTicket[] for display
  const displayTickets: SupportTicket[] = (externalTickets as SupportTicket[]) ?? tickets;

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
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className={`bg-${themeColor}-50 border-b-2 border-${themeColor}-200`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Ticket ID</th>
              {userType === 'officer' && (
                <>
                  <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Taxpayer</th>
                </>
              )}
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Subject</th>
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Description</th>
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Created At</th>
              <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Status</th>
              {userType === 'officer' && (
                <th className={`px-4 py-3 text-left text-xs font-bold text-${themeColor}-700`}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={userType === 'officer' ? 7 : 5} className="px-4 py-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  Loading...
                </td>
              </tr>
            ) : displayTickets.length === 0 ? (
              <tr>
                <td colSpan={userType === 'officer' ? 7 : 5} className="px-4 py-8 text-center text-gray-500">
                  <Ticket className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No support tickets found</p>
                </td>
              </tr>
            ) : (
              displayTickets.map((ticket, idx) => (
                <tr key={ticket.ticket_id} className={idx % 2 === 0 ? `bg-${themeColor}-50/30` : 'bg-white'}>
                  <td className={`px-4 py-3 font-semibold text-${themeColor}-600`}>#{ticket.ticket_id}</td>
                  {userType === 'officer' && (
                    <td className="px-4 py-3 text-sm">{ticket.taxpayer}</td>
                  )}
                  <td className="px-4 py-3 text-sm font-medium">{ticket.subject}</td>
                  <td className="px-4 py-3 text-sm max-w-xs truncate" title={ticket.description}>
                    {ticket.description}
                  </td>
                  <td className="px-4 py-3 text-sm">{ticket.created_at?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  {userType === 'officer' && (
                    <td className="px-4 py-3">
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.ticket_id, e.target.value as SupportTicket['status'])}
                        className={`px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-${themeColor}-400`}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
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
                <label className="block text-sm mb-2 font-medium">Subject *</label>
                <input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-400"
                  placeholder="Short summary of your issue"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium">Description *</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
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
                <button type="submit" disabled={creating} className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold">
                  {creating ? 'Submitting...' : 'Submit Ticket'}
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