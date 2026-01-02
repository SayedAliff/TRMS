import { useState } from 'react';

export function PaymentHistory() {
  const paymentHistory = [
    { id: '90000', year: '2024-2025', amount: '5,000', taxType: 'Income Tax - Individual', method: 'Bkash', date: '13-DEC-2025', status: 'Completed' },
    { id: '90001', year: '2023-2024', amount: '25,000', taxType: 'Corporate Tax', method: 'Bank', date: '10-JAN-2025', status: 'Completed' },
    { id: '90002', year: '2022-2023', amount: '1,000', taxType: 'VAT', method: 'Cash', date: '15-FEB-2024', status: 'Pending' },
    { id: '90003', year: '2022-2023', amount: '8,000', taxType: 'Income Tax - Individual', method: 'Card', date: '15-FEB-2024', status: 'Completed' },
    { id: '90004', year: '2021-2022', amount: '2,000', taxType: 'Property Tax', method: 'Nagad', date: '15-FEB-2024', status: 'Failed' },
  ];

  const [latestStatus] = useState('Pending');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'Pending':
        return { bg: '#fff3e0', text: '#f57c00' };
      case 'Failed':
        return { bg: '#ffebee', text: '#c62828' };
      default:
        return { bg: '#fff3e0', text: '#f57c00' };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
          Payment History
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Payment ID
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Assessment Year
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Tax Type
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Payment Method
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Payment Date
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, idx) => {
              const statusColor = getStatusColor(payment.status);
              return (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>#{payment.id}</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{payment.year}</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{payment.amount} BDT</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{payment.taxType}</td>
                  <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{payment.method}</td>
                  <td className="px-6 py-4 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{payment.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: idx === 0 ? getStatusColor(latestStatus).bg : statusColor.bg,
                        color: idx === 0 ? getStatusColor(latestStatus).text : statusColor.text,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                      }}
                    >
                      {idx === 0 ? latestStatus : payment.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}