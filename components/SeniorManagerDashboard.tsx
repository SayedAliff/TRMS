import React, { useState } from 'react';
import {
  Home,
  Users,
  Shield,
  LogOut,
  Edit,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Trash2,
  Key,
  UserPlus,
} from 'lucide-react';

interface SeniorManagerDashboardProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    rank: string;
  };
  onLogout: () => void;
}

type View = 'Dashboard' | 'Manage Officers' | 'Manage Taxpayers' | 'Taxlists' | 'AuditLogs';

const officersData = [
  { id: 1000, firstName: 'Rahim', lastName: 'Uddin', rank: 'Inspector', branch: 'Gulshan', password: 'pass1' },
  { id: 1001, firstName: 'Karim', lastName: 'Ahmed', rank: 'Commissioner', branch: 'Agrabad', password: 'pass2' },
  { id: 1002, firstName: 'Siaam', lastName: 'Khan', rank: 'Officer', branch: 'Motijheel', password: 'pass3' },
  { id: 1003, firstName: 'Nadia', lastName: 'Islam', rank: 'Assistant', branch: 'Sylhet', password: 'pass4' },
  { id: 1004, firstName: 'Fahim', lastName: 'Hossain', rank: 'Inspector', branch: 'Rajshahi', password: 'pass5' },
];

export function SeniorManagerDashboard({ user, onLogout }: SeniorManagerDashboardProps) {
  const [activeView, setActiveView] = useState<View>('Dashboard');
  const [officers, setOfficers] = useState(officersData);
  const [selectedOfficer, setSelectedOfficer] = useState<typeof officersData[0] | null>(null);
  const [newOfficer, setNewOfficer] = useState({
    firstName: '',
    lastName: '',
    rank: '',
    branch: '',
    password: '',
  });

  const handlePromote = (officer: typeof officersData[0]) => {
    const rankHierarchy = ['Assistant', 'Officer', 'Inspector', 'Commissioner'];
    const currentRankIndex = rankHierarchy.indexOf(officer.rank);

    if (currentRankIndex < rankHierarchy.length - 1) {
      const updatedOfficers = officers.map((o) =>
        o.id === officer.id ? { ...o, rank: rankHierarchy[currentRankIndex + 1] } : o
      );
      setOfficers(updatedOfficers);
      alert(`Promoted Officer ${officer.firstName} ${officer.lastName} to ${rankHierarchy[currentRankIndex + 1]}`);
    } else {
      alert(`${officer.rank} is already the highest rank!`);
    }
  };

  const handleDemote = (officer: typeof officersData[0]) => {
    const rankHierarchy = ['Assistant', 'Officer', 'Inspector', 'Commissioner'];
    const currentRankIndex = rankHierarchy.indexOf(officer.rank);

    if (currentRankIndex > 0) {
      const updatedOfficers = officers.map((o) =>
        o.id === officer.id ? { ...o, rank: rankHierarchy[currentRankIndex - 1] } : o
      );
      setOfficers(updatedOfficers);
      alert(`Demoted Officer ${officer.firstName} ${officer.lastName} to ${rankHierarchy[currentRankIndex - 1]}`);
    } else {
      alert(`${officer.rank} is already the lowest rank!`);
    }
  };

  const handleDelete = (officerId: number) => {
    const updatedOfficers = officers.filter((o) => o.id !== officerId);
    setOfficers(updatedOfficers);
    alert(`Deleted Officer ID: ${officerId}`);
  };

  const handleAddOfficer = () => {
    const newOfficerId = officers.length > 0 ? Math.max(...officers.map((o) => o.id)) + 1 : 1000;
    const newOfficerData = { id: newOfficerId, ...newOfficer };
    setOfficers([...officers, newOfficerData]);

    setNewOfficer({ firstName: '', lastName: '', rank: '', branch: '', password: '' });
    alert(`Added new officer: ${newOfficer.firstName} ${newOfficer.lastName}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-red-700">Senior Manager Portal</h1>
        </div>
        <nav className="flex-1 p-4">
          {['Dashboard', 'Manage Officers', 'Manage Taxpayers', 'Taxlists', 'AuditLogs'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeView === view ? 'bg-gradient-to-r from-red-700 to-red-800 text-white shadow' : 'text-gray-700 hover:bg-red-50'
              }`}
            >
              <span>
                {view === 'Dashboard' && <Home className="w-5 h-5" />}
                {view === 'Manage Officers' && <Users className="w-5 h-5" />}
                {view === 'Manage Taxpayers' && <Shield className="w-5 h-5" />}
                {view === 'Taxlists' && <DollarSign className="w-5 h-5" />}
                {view === 'AuditLogs' && <Shield className="w-5 h-5" />}
              </span>
              <span>{view}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-red-700 text-white shadow hover:opacity-90"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Manage Officers View */}
        {activeView === 'Manage Officers' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Manage Officers</h2>

            {/* Officers Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <table className="w-full text-left text-gray-700">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="p-3">Officer ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Rank</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {officers.map((officer) => (
                    <tr key={officer.id} className="hover:bg-gray-50">
                      <td className="p-3">{officer.id}</td>
                      <td className="p-3">{`${officer.firstName} ${officer.lastName}`}</td>
                      <td className="p-3">{officer.rank}</td>
                      <td className="p-3">{officer.branch}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handlePromote(officer)}
                          className="p-2 bg-green-100 text-green-600 rounded"
                        >
                          <TrendingUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDemote(officer)}
                          className="p-2 bg-yellow-100 text-yellow-600 rounded"
                        >
                          <TrendingDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedOfficer(officer)}
                          className="p-2 bg-purple-100 text-purple-600 rounded"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(officer.id)}
                          className="p-2 bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Officer Form */}
            <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Add New Officer</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newOfficer.firstName}
                  onChange={(e) => setNewOfficer({ ...newOfficer, firstName: e.target.value })}
                  className="p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newOfficer.lastName}
                  onChange={(e) => setNewOfficer({ ...newOfficer, lastName: e.target.value })}
                  className="p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Rank"
                  value={newOfficer.rank}
                  onChange={(e) => setNewOfficer({ ...newOfficer, rank: e.target.value })}
                  className="p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Branch"
                  value={newOfficer.branch}
                  onChange={(e) => setNewOfficer({ ...newOfficer, branch: e.target.value })}
                  className="p-3 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newOfficer.password}
                  onChange={(e) => setNewOfficer({ ...newOfficer, password: e.target.value })}
                  className="p-3 border rounded"
                />
              </div>
              <button
                onClick={handleAddOfficer}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add Officer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}