import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface FileReturnProps {
  onClose?: () => void;
}

export function FileReturn({ onClose }: FileReturnProps) {
  const [step, setStep] = useState(2); // Active on step 2
  const [formData, setFormData] = useState({
    assessmentYear: '2024-2025',
    taxCategory: 'Individual',
    totalIncome: '500000'
  });
  const [isCalculating, setIsCalculating] = useState(false);

  // Tax calculation logic (simulating PL/SQL get_income function)
  const calculateTax = () => {
    const income = parseFloat(formData.totalIncome);
    const exemptionLimit = 100000; // Basic exemption
    const taxableAmount = Math.max(0, income - exemptionLimit);
    const taxRate = 0.10; // 10% for Individual category
    const taxPayable = taxableAmount * taxRate;

    return {
      totalIncome: income,
      taxableAmount,
      taxPayable
    };
  };

  const handleAutoCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 800);
  };

  const calculation = calculateTax();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl">File Tax Return: Assessment Year {formData.assessmentYear}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div className="flex-1 h-1 bg-green-600 mx-2"></div>
            </div>

            <div className="flex-1 flex items-center">
              <div 
                className="w-10 h-10 rounded-full text-white flex items-center justify-center"
                style={{ backgroundColor: '#7B68EE' }}
              >
                2
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              3
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 flex-1 text-center">1. Basic Info</span>
            <span className="text-purple-600 flex-1 text-center">2. Income Details</span>
            <span className="text-gray-500 flex-1 text-center">3. Confirm</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm mb-2">Assessment Year</label>
            <select
              value={formData.assessmentYear}
              onChange={(e) => setFormData({ ...formData, assessmentYear: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>2024-2025</option>
              <option>2023-2024</option>
              <option>2022-2023</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Tax Category</label>
            <select
              value={formData.taxCategory}
              onChange={(e) => setFormData({ ...formData, taxCategory: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Individual</option>
              <option>Corporate</option>
              <option>Partnership</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Total Income</label>
            <div className="flex gap-3">
              <input
                type="number"
                value={formData.totalIncome}
                onChange={(e) => setFormData({ ...formData, totalIncome: e.target.value })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter total income"
              />
              <button
                onClick={handleAutoCalculate}
                className="px-6 py-3 rounded-lg text-white transition-colors whitespace-nowrap flex items-center gap-2"
                style={{ backgroundColor: '#7B68EE' }}
                disabled={isCalculating}
              >
                {isCalculating ? '...' : 'Auto-Calculate'}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              <code className="bg-gray-100 px-2 py-1 rounded">Function: get_income</code>
            </p>
          </div>
        </div>

        {/* Calculation Block - Result Box */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border-2 border-gray-200">
          <h3 className="text-lg mb-4">Tax Calculation Result</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Income:</span>
              <span>{calculation.totalIncome.toLocaleString()} BDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxable Amount:</span>
              <span className="text-purple-600">{calculation.taxableAmount.toLocaleString()} BDT</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-300">
              <span>Tax Payable:</span>
              <span className="text-xl">{calculation.taxPayable.toLocaleString()} BDT</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => onClose ? onClose() : setStep(1)}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => setStep(3)}
            className="flex-1 px-6 py-3 rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#7B68EE' }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}