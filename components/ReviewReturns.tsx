import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export function ReviewReturns() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);
  const [auditReason, setAuditReason] = useState('');

  const returns = [
    { id: '20001', tin: '5000', name: 'Abul Kalam', year: '2024-2025', income: '500,000', tax: '40,000', submitted: '13-DEC-2025' },
    { id: '20002', tin: '5001', name: 'Bokul Mia', year: '2024-2025', income: '750,000', tax: '65,000', submitted: '12-DEC-2025' },
    { id: '20003', tin: '5002', name: 'Cina Akter', year: '2024-2025', income: '350,000', tax: '25,000', submitted: '10-DEC-2025' },
  ];

  const handleReview = (returnData: any) => {
    setSelectedReturn(returnData);
    setShowDetailModal(true);
  };

  const handleTriggerAudit = () => {
    setShowDetailModal(false);
    setShowAuditModal(true);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Review Tax Returns
          </h3>
          <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Pending returns awaiting review
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Return ID
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  TIN
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Taxpayer Name
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Assessment Year
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Total Income
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Calculated Tax
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Submission Date
                </th>
                <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {returns.map((returnData) => (
                <tr key={returnData.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>#{returnData.id}</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{returnData.tin}</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{returnData.name}</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{returnData.year}</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{returnData.income} BDT</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#0056b3' }}>{returnData.tax} BDT</td>
                  <td className="px-6 py-4 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{returnData.submitted}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleReview(returnData)}
                      className="px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                      style={{
                        backgroundColor: '#0056b3',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Return Details - #{selectedReturn.id}
              </h3>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Taxpayer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Taxpayer Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Name</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{selectedReturn.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>TIN</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{selectedReturn.tin}</p>
                  </div>
                </div>
              </div>

              {/* Return Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Return Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Assessment Year</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{selectedReturn.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Total Income</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{selectedReturn.income} BDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Calculated Tax</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#0056b3' }}>{selectedReturn.tax} BDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Submission Date</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{selectedReturn.submitted}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleTriggerAudit}
                className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#c62828',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Trigger Audit
              </button>
              <button
                className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#2e7d32',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Approve Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Trigger Modal */}
      {showAuditModal && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ffebee' }}>
                  <AlertTriangle className="w-6 h-6" style={{ color: '#c62828' }} />
                </div>
                <div>
                  <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Trigger Audit
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Return #{selectedReturn.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Reason for Audit
              </label>
              <textarea
                value={auditReason}
                onChange={(e) => setAuditReason(e.target.value)}
                rows={4}
                placeholder="Please provide a detailed reason for triggering this audit..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              ></textarea>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                disabled={!auditReason.trim()}
                className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: '#c62828',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Confirm Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
