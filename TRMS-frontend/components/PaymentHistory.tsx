import { useEffect, useState } from 'react';
import { paymentAPI } from '../lib/api';

interface Payment {
  id: number;
  tin: string;
  return_id: number;
  amount: number;
  payment_method: string;
  payment_date: string;
  status: string;
}

export function PaymentHistory({ payments: propPayments }: { payments?: Payment[] }) {
  const [payments, setPayments] = useState<Payment[]>(propPayments || []);
  const [error, setError] = useState('');

  useEffect(() => {
    if (propPayments) {
      setPayments(propPayments);
      return;
    }
    paymentAPI
      .list('')
      .then(setPayments)
      .catch((err) => setError(err.message || 'Failed to fetch payments'));
  }, [propPayments]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'pending':
        return { bg: '#fff3e0', text: '#f57c00' };
      case 'failed':
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
      {error && (
        <div className="p-4 text-red-600 text-sm">{error}</div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Payment ID
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Tax Return ID
              </th>
              <th className="px-6 py-4 text-left text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#616161' }}>
                Amount
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
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => {
                const statusColor = getStatusColor(payment.status);
                return (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>#{payment.id}</td>
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{payment.return_id}</td>
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{payment.amount} BDT</td>
                    <td className="px-6 py-4" style={{ fontFamily: 'Inter, sans-serif' }}>{payment.payment_method}</td>
                    <td className="px-6 py-4 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{payment.payment_date?.slice(0, 10)}</td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: statusColor.bg,
                          color: statusColor.text,
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500
                        }}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}