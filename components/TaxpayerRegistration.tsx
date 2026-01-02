import { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';

interface TaxpayerRegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function TaxpayerRegistration({ onBack, onSuccess }: TaxpayerRegistrationProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    houseNo: '',
    street: '',
    city: '',
    zipCode: '',
    username: '',
    password: '',
    phoneNumber1: '',
    phoneNumber2: '',
    phoneNumber3: '',
    zoneCode: '1'
  });

  // Tax zones from INSERT statements
  const taxZones = [
    { code: '1', name: 'Dhaka North', city: 'Dhaka' },
    { code: '2', name: 'Chittagong Central', city: 'Chittagong' },
    { code: '3', name: 'Sylhet Zone', city: 'Sylhet' },
    { code: '4', name: 'Rajshahi Zone', city: 'Rajshahi' },
    { code: '5', name: 'Khulna Zone', city: 'Khulna' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send registration data to backend API
    // Backend should return TIN after successful registration
    // Example:
    // const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) });
    // const data = await response.json();
    // alert(`Registration Successful!\nYour TIN: ${data.tin}\n\nPlease use this TIN to login.`);
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#F9F9F9' }}>
      {/* Form Container */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex items-center gap-4 text-white">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <UserPlus className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Taxpayer Registration
              </h1>
              <p className="text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
                TIN will be auto-generated after successful registration
              </p>
            </div>
          </div>
        </div>

        {/* Form - Balanced Layout */}
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-6">
              {/* Personal Information */}
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              {/* Address Information */}
              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  House No *
                </label>
                <input
                  type="text"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Street *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Zip Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Tax Zone *
                </label>
                <select
                  name="zoneCode"
                  value={formData.zoneCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {taxZones.map(zone => (
                    <option key={zone.code} value={zone.code}>
                      {zone.name} - {zone.city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Phone Number 1 *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber1"
                      value={formData.phoneNumber1}
                      onChange={handleChange}
                      required
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Phone Number 2 (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber2"
                      value={formData.phoneNumber2}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Phone Number 3 (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber3"
                      value={formData.phoneNumber3}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-span-3 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg text-white transition-all hover:opacity-90 shadow-lg flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#2F80ED',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.125rem'
                  }}
                >
                  <UserPlus className="w-6 h-6" />
                  Register Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}