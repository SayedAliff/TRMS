import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SupportTicketProps {
  onClose: () => void;
}

export function SupportTicket({ onClose }: SupportTicketProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation
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
            <h2 className="text-xl">Ticket Details #1000</h2>
            <select className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded text-sm border-none outline-none">
              <option>Resolved</option>
              <option>Open</option>
              <option>In Progress</option>
            </select>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details */}
        <div className="p-6 border-b border-gray-200">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Issue</p>
              <p>Login Issue</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Raised By</p>
              <p>Abul Kalam (TIN: 1928374)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Assigned Officer</p>
              <p>Rahim Uddin</p>
            </div>
          </div>
        </div>

        {/* Chat/Activity Stream */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[80%]">
                <div className="bg-purple-600 text-white rounded-lg rounded-tr-none px-4 py-3 mb-1">
                  <p className="text-sm">I cannot reset my password.</p>
                </div>
                <p className="text-xs text-gray-500 text-right">Abul, 10:00 AM</p>
              </div>
            </div>

            {/* Officer Message */}
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="bg-gray-100 rounded-lg rounded-tl-none px-4 py-3 mb-1">
                  <p className="text-sm">Password reset link sent to email.</p>
                </div>
                <p className="text-xs text-gray-500">Rahim, 10:15 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="p-6 border-t border-gray-200">
          <button 
            onClick={handleClose}
            className="w-full py-3 rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#7B68EE' }}
          >
            Mark as Closed
          </button>
        </div>
      </div>
    </>
  );
}
