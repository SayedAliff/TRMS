import { useState } from 'react';
import { CreditCard, Smartphone, Building2, Bell } from 'lucide-react';

export function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showTriggerToast, setShowTriggerToast] = useState(true);

  const paymentHistory = [
    { id: '90000', year: '2024-2025', amount: '5,000', taxType: 'Income Tax - Individual', method: 'Bkash', date: '13-DEC-2025', status: 'Completed' },
    { id: '90001', year: '2023-2024', amount: '25,000', taxType: 'Corporate Tax', method: 'Bank', date: '10-JAN-2025', status: 'Completed' },
    { id: '90002', year: '2022-2023', amount: '1,000', taxType: 'VAT', method: 'Cash', date: '15-FEB-2024', status: 'Pending' },
    { id: '90003', year: '2022-2023', amount: '8,000', taxType: 'Income Tax - Individual', method: 'Card', date: '15-FEB-2024', status: 'Completed' },
    { id: '90004', year: '2021-2022', amount: '2,000', taxType: 'Property Tax', method: 'Nagad', date: '15-FEB-2024', status: 'Failed' },
  ];

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
    <div className="space-y-6">
      {/* Trigger Alert Toast - Visualizing audit_payment trigger */}
      {showTriggerToast && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className="bg-white rounded-lg shadow-2xl border-l-4 p-4 flex items-start gap-3 max-w-md" style={{ borderColor: '#2F80ED' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E3F2FD' }}>
              <Bell className="w-5 h-5" style={{ color: '#2F80ED' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1a1a1a' }}>
                Trigger Alert: audit_payment
              </p>
              <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                New payment inserted with ID: 90000
              </p>
            </div>
            <button onClick={() => setShowTriggerToast(false)} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Payment Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-xl mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
          Make a Payment
        </h3>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Total Tax Payable
          </p>
          <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0056b3' }}>
            40,000 BDT
          </p>
          <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Assessment Year: 2024-2025
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Select Payment Method
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="bkash"
                checked={paymentMethod === 'bkash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ accentColor: '#0056b3' }}
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e91e63' }}>
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>bkash</span>
              </div>
            </label>

            <label className="relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="nagad"
                checked={paymentMethod === 'nagad'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ accentColor: '#0056b3' }}
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ff6b00' }}>
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Nagad</span>
              </div>
            </label>

            <label className="relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ accentColor: '#0056b3' }}
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0056b3' }}>
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Credit/Debit Card</span>
              </div>
            </label>

            <label className="relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ accentColor: '#0056b3' }}
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2e7d32' }}>
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Bank Transfer</span>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Details Form */}
        {paymentMethod === 'bkash' || paymentMethod === 'nagad' ? (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>
        ) : paymentMethod === 'card' ? (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
          </div>
        ) : null}

        {paymentMethod && (
          <button
            className="w-full py-3 rounded-lg text-white transition-all hover:opacity-90"
            style={{
              backgroundColor: '#2e7d32',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600
            }}
          >
            Pay Now - 40,000 BDT
          </button>
        )}
      </div>

      {/* Payment History */}
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
              {paymentHistory.map((payment) => {
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
                          backgroundColor: statusColor.bg,
                          color: statusColor.text,
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500
                        }}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}