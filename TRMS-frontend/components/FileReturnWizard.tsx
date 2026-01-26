import { useState } from 'react';
import { Check, ChevronRight, CheckCircle, CreditCard, Smartphone, Building2 } from 'lucide-react';

interface FileReturnWizardProps {
  onPaymentSuccess?: () => void;
  userTaxCategory?: string;
}

const steps = [
  { number: 1, title: 'Basic Info' },
  { number: 2, title: 'Income Details' },
  { number: 3, title: 'Review & Submit' }
];

export function FileReturnWizard({ onPaymentSuccess, userTaxCategory = 'Individual' }: FileReturnWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    tin: '5000',
    assessmentYear: '2024-2025',
    totalIncome: '',
    taxableAmount: 0,
    calculatedTax: 0,
    taxCategory: userTaxCategory,
    declaration: false
  });
  const [isCalculated, setIsCalculated] = useState(false);

  // Add state for backend IDs
  const [returnId, setReturnId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateTax = () => {
    const income = parseFloat(formData.totalIncome || '0');
    if (!income) return;

    // Tax calculation based on user's registered tax category
    let taxRate = 0;
    let taxableAmount = income;
    
    // Use the tax category from user's registration
    if (userTaxCategory === 'Individual') {
      taxRate = 10.00;
    } else if (userTaxCategory === 'Corporate') {
      taxRate = 25.00;
    } else if (userTaxCategory === 'Senior Citizen') {
      taxRate = 5.00;
    } else if (userTaxCategory === 'SME Business') {
      taxRate = 15.00;
    } else if (userTaxCategory === 'Govt Employee') {
      taxRate = 0.00;
    } else {
      taxRate = 10.00; // Default to Individual
    }

    const calculatedTax = (taxableAmount * taxRate) / 100;

    setFormData({
      ...formData,
      taxableAmount,
      calculatedTax,
      taxCategory: userTaxCategory
    });
    setIsCalculated(true);
  };

  // --- API Integration for Tax Return Submission ---
  const handleSubmitReturn = async () => {
    setError(null);
    try {
      // Generate a random return_id (in real app, backend should generate)
      const newReturnId = Math.floor(100000 + Math.random() * 900000);
      const payload = {
        return_id: newReturnId,
        assessment_year: formData.assessmentYear,
        total_income: parseFloat(formData.totalIncome || '0'),
        taxable_amount: formData.taxableAmount,
        filing_date: new Date().toISOString(),
        tin: parseInt(formData.tin, 10),
        category_id: 1, // You may want to map userTaxCategory to a category_id
        officer_id: null // Will be assigned by backend/officer
      };
      const res = await fetch('/api/returns/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to submit return');
      }
      setReturnId(newReturnId);
      setShowPayment(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit return');
    }
  };

  // --- API Integration for Payment ---
  const handlePayNow = async () => {
    setError(null);
    try {
      if (!returnId) throw new Error('Return not submitted');
      // Generate a random payment_id (in real app, backend should generate)
      const paymentId = Math.floor(100000 + Math.random() * 900000);
      const payload = {
        payment_id: paymentId,
        amount: formData.calculatedTax,
        method: paymentMethod,
        status: 'completed',
        transaction_time: new Date().toISOString(),
        return_id: returnId
      };
      const res = await fetch('/api/payments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to process payment');
      }
      setPaymentSuccess(true);
      if (onPaymentSuccess) onPaymentSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
    }
  };

  const handleDone = () => {
    // Reset everything
    setPaymentSuccess(false);
    setShowPayment(false);
    setCurrentStep(1);
    setIsCalculated(false);
    setPaymentMethod('');
    setFormData({
      tin: '5000',
      assessmentYear: '2024-2025',
      totalIncome: '',
      taxableAmount: 0,
      calculatedTax: 0,
      taxCategory: userTaxCategory,
      declaration: false
    });
    setReturnId(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all ${
                    currentStep > step.number ? 'bg-green-600' : ''
                  }`}
                  style={{
                    backgroundColor: currentStep > step.number ? '#2e7d32' : currentStep === step.number ? '#0056b3' : '#e0e0e0',
                    color: currentStep >= step.number ? '#ffffff' : '#757575'
                  }}
                >
                  {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span
                  className="text-sm"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: currentStep === step.number ? 600 : 400,
                    color: currentStep >= step.number ? '#0056b3' : '#757575'
                  }}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4" style={{ backgroundColor: currentStep > step.number ? '#2e7d32' : '#e0e0e0' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Step 1: Basic Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  TIN (Taxpayer Identification Number)
                </label>
                <input
                  type="text"
                  value={formData.tin}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Assessment Year
                </label>
                <select
                  value={formData.assessmentYear}
                  onChange={(e) => setFormData({ ...formData, assessmentYear: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2022-2023">2022-2023</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#0056b3',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Income Details */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Step 2: Income Details
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Total Income (BDT)
                </label>
                <input
                  type="number"
                  value={formData.totalIncome}
                  onChange={(e) => {
                    setFormData({ ...formData, totalIncome: e.target.value });
                    setIsCalculated(false);
                  }}
                  placeholder="Enter your total income"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <button
                onClick={calculateTax}
                className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#0056b3',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Calculate Tax
              </button>

              {isCalculated && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      Tax Category
                    </label>
                    <input
                      type="text"
                      value={formData.taxCategory}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      Taxable Amount (BDT)
                    </label>
                    <input
                      type="text"
                      value={formData.taxableAmount.toLocaleString()}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      Calculated Tax (BDT)
                    </label>
                    <input
                      type="text"
                      value={formData.calculatedTax.toLocaleString()}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#0056b3' }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!isCalculated}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: '#0056b3',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit - Show payment if submitted */}
        {currentStep === 3 && !showPayment && (
          <div>
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Step 3: Review & Submit
            </h3>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Return Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>TIN:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{formData.tin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Assessment Year:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{formData.assessmentYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Total Income:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{formData.totalIncome ? parseFloat(formData.totalIncome).toLocaleString() : '0'} BDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Tax Category:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{formData.taxCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Taxable Amount:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{formData.taxableAmount.toLocaleString()} BDT</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-300">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Calculated Tax:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0056b3', fontSize: '1.25rem' }}>
                    {formData.calculatedTax.toLocaleString()} BDT
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declaration}
                  onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                  className="mt-1"
                  style={{ accentColor: '#0056b3' }}
                />
                <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  I declare that the information given is true and correct to the best of my knowledge.
                </span>
              </label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Back
              </button>
              <button
                disabled={!formData.declaration}
                className="px-8 py-3 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: '#2e7d32',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
                onClick={handleSubmitReturn}
              >
                Submit Return
              </button>
            </div>
          </div>
        )}

        {/* Payment Section */}
        {showPayment && !paymentSuccess && (
          <div>
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#e8f5e9' }}>
                <CheckCircle className="w-12 h-12" style={{ color: '#2e7d32' }} />
              </div>
              <h3 className="text-2xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2e7d32' }}>
                Return Filed Successfully!
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Now complete your tax payment to submit to officers.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Total Tax Payable
              </p>
              <p className="text-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0056b3' }}>
                {formData.calculatedTax.toLocaleString()} BDT
              </p>
              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Assessment Year: {formData.assessmentYear}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Select Payment Method
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${paymentMethod === 'bkash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
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
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>bKash</span>
                  </div>
                </label>

                <label className={`relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${paymentMethod === 'nagad' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
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

                <label className={`relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
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

                <label className={`relative flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
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

            {paymentMethod && (
              <button
                onClick={handlePayNow}
                className="w-full py-4 rounded-lg text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#2e7d32',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Pay Now - {formData.calculatedTax.toLocaleString()} BDT
              </button>
            )}
          </div>
        )}

        {/* Payment Success Modal */}
        {paymentSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#e8f5e9' }}>
                  <CheckCircle className="w-12 h-12" style={{ color: '#2e7d32' }} />
                </div>
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2e7d32' }}>
                  Payment Successful!
                </h3>
                <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Your payment of <span style={{ fontWeight: 600 }}>{formData.calculatedTax.toLocaleString()} BDT</span> has been successfully processed.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Your tax return has been submitted to tax officers for review. Payment status is "Pending" until officer confirmation.
                  </p>
                </div>
                <button
                  onClick={handleDone}
                  className="w-full py-3 rounded-lg text-white transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#2e7d32',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}