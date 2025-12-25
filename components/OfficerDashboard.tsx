import { MapPin, User as UserIcon, Award } from 'lucide-react';

interface OfficerProfileProps {
  onClose: () => void;
}

export function OfficerProfile({ onClose }: OfficerProfileProps) {
  const officer = {
    id: '1000',
    firstName: 'Rahim',
    lastName: 'Uddin',
    branch: 'Gulshan, Dhaka',
    currentRank: 'Inspector',
    newRank: 'Senior Inspector',
    lastUpdated: '13-DEC-2025'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header Banner */}
        <div 
          className="h-32 relative"
          style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center text-white transition-colors"
          >
            ×
          </button>
        </div>

        {/* Profile Photo */}
        <div className="px-8 -mt-16 mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-4xl shadow-xl">
            {`${officer.firstName[0]}${officer.lastName[0]}`}
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-6 border-b border-gray-200">
          <h2 className="text-3xl mb-2">{officer.firstName} {officer. lastName}</h2>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span className="text-sm">ID: {officer.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{officer.branch}</span>
            </div>
          </div>
        </div>

        {/* Rank Management Section */}
        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg">Rank Management</h3>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Current Rank</p>
              <div className="flex items-center gap-3">
                <span 
                  className="text-xl text-gray-400 line-through"
                >
                  {officer.currentRank}
                </span>
                <span className="text-xs text-gray-500">→</span>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={officer.newRank}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg bg-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight:  600,
                        color: '#7C3AED'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-purple-200">
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-700">{officer.lastUpdated}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-white border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Rank History */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Rank History</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-700">Inspector</p>
                  <p className="text-xs text-gray-500">01-JAN-2023 - Present</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Current</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-700">Assistant Inspector</p>
                  <p className="text-xs text-gray-500">15-MAR-2021 - 31-DEC-2022</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Junior Officer</p>
                  <p className="text-xs text-gray-500">10-JUN-2019 - 14-MAR-2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}