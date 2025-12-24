import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface ZoneMapProps {
  zoneName: string;
  city: string;
  street: string;
  zoneCode: string;
  houseNo: string;
  zipCode: string;
}

export function ZoneMap({ zoneName, city, street, zoneCode, houseNo, zipCode }: ZoneMapProps) {
  const [mapImage, setMapImage] = useState('');

  useEffect(() => {
    // Fetch appropriate map image based on zone name and city
    const fetchMapImage = async () => {
      try {
        // Create search query based on zone and city
        let searchQuery = '';
        
        if (zoneName.toLowerCase().includes('dhaka')) {
          searchQuery = 'dhaka bangladesh map';
        } else if (city.toLowerCase().includes('chittagong')) {
          searchQuery = 'chittagong bangladesh map';
        } else if (city.toLowerCase().includes('sylhet')) {
          searchQuery = 'sylhet bangladesh map';
        } else if (city.toLowerCase().includes('rajshahi')) {
          searchQuery = 'rajshahi bangladesh map';
        } else if (city.toLowerCase().includes('khulna')) {
          searchQuery = 'khulna bangladesh map';
        } else {
          // Default to Bangladesh map
          searchQuery = 'bangladesh city map';
        }

        // Use Unsplash API
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&client_id=tg28KSLD_exKwHM00BQ4O9F8-1zpriznAWxVzGcv8mqM&per_page=1`
        );
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          setMapImage(data.results[0].urls.regular);
        } else {
          // Fallback image
          setMapImage('https://images.unsplash.com/photo-1632941084677-b83bb4c78066?w=1080&q=80');
        }
      } catch (error) {
        console.error('Failed to fetch map image:', error);
        // Fallback image on error
        setMapImage('https://images.unsplash.com/photo-1632941084677-b83bb4c78066?w=1080&q=80');
      }
    };

    fetchMapImage();
  }, [zoneName, city]);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h3 className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Your Tax Zone</h3>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-5 h-5" style={{ color: '#0056b3' }} />
          <div>
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Tax Zone</p>
            <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{zoneName}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p>Zone Code: {zoneCode}</p>
          <p>Location: {city}</p>
          <p>Address: House {houseNo}, {street}, {city} - {zipCode}</p>
        </div>
      </div>
      
      {/* Map with Dynamic Real Image */}
      <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
        {/* Map Background Image */}
        {mapImage ? (
          <img 
            src={mapImage}
            alt={`${city} Map`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Loading map...</p>
          </div>
        )}
        
        {/* Overlay gradient for better visibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)' }}></div>
        
        {/* Zone Marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center animate-pulse" style={{ backgroundColor: '#0056b3', boxShadow: '0 0 0 8px rgba(47, 128, 237, 0.3), 0 0 0 16px rgba(47, 128, 237, 0.1)' }}>
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-xl border-2" style={{ borderColor: '#0056b3' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0056b3', fontSize: '1.125rem' }}>{zoneName}</p>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{city}</p>
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{street}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
