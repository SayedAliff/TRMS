import { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';

interface TaxpayerRegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function TaxpayerRegistration({ onBack, onSuccess }: TaxpayerRegistrationProps) {
  // Use only snake_case fields as per TaxPayerProfileSerializer
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'Male',
    house_no: '',
    street: '',
    city: '',
    zip_code: '',
    username: '',
    password: '',
    phone_number_1: '',
    phone_number_2: '',
    phone_number_3: '',
    zone_code: '1'
  });
  const [error, setError] = useState('');
  const [successTin, setSuccessTin] = useState<string | null>(null);

  // Tax zones for dropdown (code and name in snake_case)
  const taxZones = [
    { zone_code: '1', zone_name: 'Dhaka North', city: 'Dhaka' },
    { zone_code: '2', zone_name: 'Chittagong Central', city: 'Chittagong' },
    { zone_code: '3', zone_name: 'Sylhet Zone', city: 'Sylhet' },
    { zone_code: '4', zone_name: 'Rajshahi Zone', city: 'Rajshahi' },
    { zone_code: '5', zone_name: 'Khulna Zone', city: 'Khulna' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessTin(null);
    try {
      const res = await fetch('/api/users/taxpayers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Registration failed');
        return;
      }
      setSuccessTin(data.tin);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
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
                <label className="block text-sm mb-2 font-semibold">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">Date of Birth *</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Address Information */}
              <div>
                <label className="block text-sm mb-2 font-semibold">House No *</label>
                <input
                  type="text"
                  name="house_no"
                  value={formData.house_no}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">Street *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold">Zip Code *</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm mb-2 font-semibold">Tax Zone *</label>
                <select
                  name="zone_code"
                  value={formData.zone_code}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  {taxZones.map(zone => (
                    <option key={zone.zone_code} value={zone.zone_code}>
                      {zone.zone_name} - {zone.city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm mb-2 font-semibold">Phone Number 1 *</label>
                    <input
                      type="tel"
                      name="phone_number_1"
                      value={formData.phone_number_1}
                      onChange={handleChange}
                      required
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 font-semibold">Phone Number 2 (Optional)</label>
                    <input
                      type="tel"
                      name="phone_number_2"
                      value={formData.phone_number_2}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 font-semibold">Phone Number 3 (Optional)</label>
                    <input
                      type="tel"
                      name="phone_number_3"
                      value={formData.phone_number_3}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
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
            {error && (
              <div className="mt-4 text-red-600 text-sm">{error}</div>
            )}
            {successTin && (
              <div className="mt-4 text-green-600 text-sm">
                Registration successful! Your TIN: <b>{successTin}</b>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}