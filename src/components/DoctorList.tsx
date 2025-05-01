import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doctor } from '../types/doctor';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://doctor-list-backend-hez6.vercel.app/list-doctor-with-filter`);
        setDoctors(response.data.data);
        setError('');
      } catch (err) {
        setError('Failed to load doctors');
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [sortBy]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-1">
          Consult Doctors Online - Book a Consultation Instantly
        </h1>
        <p className="text-gray-600 text-sm md:text-base">({doctors.length} doctors)</p>
      </div>

      <div className="flex justify-end mb-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px] md:w-[180px] text-sm md:text-base">
            <SelectValue placeholder="Relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="fees">Fee: Low to High</SelectItem>
            <SelectItem value="fees-desc">Fee: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && <p className="text-gray-500">Loading doctors...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {doctors.map((doctor, index) => (
          <Card key={doctor._id || `${doctor.name}-${index}`} className="p-3 md:p-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Image */}
              <div className="md:w-1/5 flex justify-center md:justify-start">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden">
                  <img
                    src={doctor.profileImage || '/default-doctor.png'}
                    alt={doctor.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://media.istockphoto.com/id/1468678624/photo/nurse-hospital-employee-and-portrait-of-black-man-in-a-healthcare-wellness-and-clinic-feeling.jpg?s=612x612&w=0&k=20&c=AGQPyeEitUPVm3ud_h5_yVX4NKY9mVyXbFf50ZIEtQI=';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="md:w-3/5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-1">
                  <h2 className="text-base md:text-lg font-semibold">{doctor.name}</h2>
                </div>
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  Specialization: <span className="font-normal">{doctor.specialization}</span>
                </p>
                <div className="my-1 text-sm md:text-base">
                  <span className="font-medium">{doctor.experience} YEARS</span> • <span>{doctor.qualification}</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Location: <span className="font-normal">{doctor.location?.city}, {doctor.location?.state}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Languages: <span className="font-normal">{doctor.languages?.join(', ')}</span>
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                  <div className="flex items-center space-x-1 text-green-600">
                    <ThumbsUp className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-sm md:text-base">{doctor.rating || 0}%</span>
                  </div>
                  <span className="text-gray-400 text-xs md:text-sm">
                    {doctor.isAvailable ? 'Available Now' : 'Currently Unavailable'}
                  </span>
                </div>
              </div>

              {/* Fee + Button */}
              <div className="md:w-1/5 flex flex-col items-center md:items-end gap-2">
                <div className="text-center md:text-right">
                  <div className="text-lg md:text-xl font-bold">₹{doctor.fees}</div>
                </div>
                <Button
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-sm"
                  disabled={!doctor.isAvailable}
                >
                  {doctor.isAvailable ? 'Consult Now' : 'Unavailable'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
