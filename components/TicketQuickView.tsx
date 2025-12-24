import { X, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TicketQuickViewProps {
  onClose: () => void;
}

export function TicketQuickView({ onClose }: TicketQuickViewProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      ></div>

      {/* Drawer */}
      <div 
        className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-xl z-50 flex flex-col transition-transform duration-300"
        style={{ 
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl mb-2">Ticket #1002 details</h2>
            <select className="px-3 py-1 border-2 border-yellow-400 text-yellow-700 rounded text-sm outline-none bg-white">
              <option>Pending</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl">
              BM
            </div>
            <div>
              <h3 className="text-lg">Bokul Mia</h3>
              <p className="text-gray-600 text-sm">TIN: 5001</p>
              <p className="text-gray-600 text-sm">Contact: 01922222222</p>
            </div>
          </div>
        </div>

        {/* Issue Description */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="mb-3">Issue Description</h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Subject</p>
            <p>Calculation Error</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Description</p>
            <p className="text-sm">
              My tax calculation shows 0 but income is 1,200,000. Please check function <code className="bg-white px-2 py-1 rounded text-xs">get_income</code>.
            </p>
          </div>
        </div>

        {/* Resolution Area */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="mb-3">Resolution</h3>
          
          <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Assigned To</p>
              <p className="text-sm">Officer: Karim Ahmed</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Note:</span> Investigating database function. Likely missing income record in system.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex gap-3">
          <button 
            className="flex-1 py-3 rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#7B68EE' }}
          >
            Reply to Taxpayer
          </button>
          <button 
            className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close Ticket
          </button>
        </div>
      </div>
    </>
  );
}
