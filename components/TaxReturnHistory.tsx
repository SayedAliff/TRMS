import { User } from '../App';

interface TaxReturnHistoryProps {
  user: User;
}

export function TaxReturnHistory({ user }: TaxReturnHistoryProps) {
  const returns = [
    {
      assessmentYear: '2024-2025',
      returnId: '20002',
      totalIncome: '350,000',
      taxableAmount: '300,000',
      payment: {
        id: '90002',
        method: 'Cash',
        amount: '1000',
        status: 'Pending'
      },
      auditStatus: 'Doc Missing'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">My Filing History</h2>
        <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            CA
          </div>
          <div>
            <p className="text-sm">Cina Akter</p>
            <p className="text-xs text-gray-600">Chittagong Zone</p>
          </div>
        </div>
      </div>

      {/* Returns Cards */}
      <div className="space-y-4">
        {returns.map((returnData, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl mb-1">Assessment Year {returnData.assessmentYear}</h3>
                <p className="text-gray-600 text-sm">Return ID: #{returnData.returnId}</p>
              </div>
              <span 
                className="px-4 py-2 rounded-full text-sm"
                style={{ 
                  backgroundColor: '#FFF4E5',
                  color: '#D97706'
                }}
              >
                {returnData.auditStatus}
              </span>
            </div>

            {/* Income Summary */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="text-sm text-gray-600 mb-3">Income Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Income</p>
                  <p className="text-xl">{returnData.totalIncome} BDT</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Taxable Amount</p>
                  <p className="text-xl">{returnData.taxableAmount} BDT</p>
                </div>
              </div>
            </div>

            {/* Linked Payment Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm text-gray-600 mb-3">Linked Payment</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500">Payment ID</p>
                    <p className="text-sm">#{returnData.payment.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Method</p>
                    <p className="text-sm">{returnData.payment.method}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm">{returnData.payment.amount} BDT</p>
                  </div>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: '#FEF7E0',
                    color: '#D97706'
                  }}
                >
                  {returnData.payment.status}
                </span>
              </div>
            </div>

            {/* Alert */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Note:</span> Status derived from Audit Log. Please upload missing documentation to proceed.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
