import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface TaxCategoryManagerProps {
  onClose: () => void;
}

export function TaxCategoryManager({ onClose }: TaxCategoryManagerProps) {
  const [categoryName, setCategoryName] = useState('Test Category');
  const [taxRate, setTaxRate] = useState('12.5');
  const [showSuccess, setShowSuccess] = useState(false);

  const existingCategories = [
    { name: 'Individual', rate: '10.00' },
    { name: 'Corporate', rate: '25.00' },
    { name: 'Senior Citizen', rate: '5.00' }
  ];

  const handleExecute = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-1">Tax Configuration</h2>
              <p className="text-sm text-gray-600">
                Procedure: <code className="bg-gray-100 px-2 py-1 rounded text-xs">add_tax_category</code>
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Existing Categories */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="mb-4">Existing Categories</h3>
            <div className="space-y-2">
              {existingCategories.map((category, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{category.name}</span>
                  </div>
                  <span className="text-gray-600">Rate: {category.rate}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Section */}
          <div className="p-6 bg-purple-50">
            <h3 className="mb-4">Add New Category</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  placeholder="Enter tax rate"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleExecute}
                className="px-6 py-3 rounded-lg text-white transition-colors flex items-center gap-2"
                style={{ backgroundColor: '#7B68EE' }}
              >
                Execute Procedure
              </button>

              {showSuccess && (
                <div className="flex items-center gap-2 text-green-600 animate-fade-in">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Category Added</span>
                </div>
              )}
            </div>

            {showSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-medium">DBMS_OUTPUT:</span> Tax category '{categoryName}' created successfully with rate {taxRate}%
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
