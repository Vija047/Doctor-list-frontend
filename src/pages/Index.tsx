import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DoctorList from '../components/DoctorList';
import Breadcrumb from '../components/Breadcrumb';
import HelpBanner from '../components/HelpBanner';
import { Doctor } from '../types/doctor';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Filter } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState({
    nearMe: false,
    modeOfConsult: {
      hospitalVisit: true,
      onlineConsult: true
    },
    experience: {
      '0-5': false,
      '6-10': false,
      '11-16': false,
      '17+': false
    },
    fees: {
      '100-500': false,
      '500-1000': false,
      '1000+': false
    },
    language: {
      english: false,
      hindi: false
    }
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isMobile = useIsMobile();

  // Mock doctor data
  const doctorsData: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Summaiya Banu',
      designation: 'General Practitioner',
      years: '8',
      qualification: 'MBBS',
      location: 'Hyderabad',
      clinic: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
      rating: 84,
      patients: '100+',
      fee: 499,
      cashback: 75,
      availableIn: '2 minutes',
      image: '/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png'
    },
    {
      id: '2',
      name: 'Dr. D Bhanu Prakash',
      designation: 'General Practitioner',
      years: '10',
      qualification: 'MBBS, AFIH, ADVANCED CERTI...',
      location: 'Hyderabad',
      clinic: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
      rating: 88,
      patients: '150+',
      fee: 489,
      cashback: 73,
      availableIn: '5 minutes',
      image: '/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png'
    },
    {
      id: '3',
      name: 'Dr. Syed Ismail Ali',
      designation: 'General Practitioner',
      years: '7',
      qualification: 'MBBS',
      location: 'Hyderabad',
      clinic: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
      rating: 92,
      patients: '200+',
      fee: 399,
      cashback: 60,
      availableIn: '10 minutes',
      image: '/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png'
    }
  ];

  // Filter doctors based on current filters
  const filteredDoctors = doctorsData.filter(doctor => {
    // Experience filter
    if (
      (filters.experience['0-5'] && parseInt(doctor.years) <= 5) ||
      (filters.experience['6-10'] && parseInt(doctor.years) > 5 && parseInt(doctor.years) <= 10) ||
      (filters.experience['11-16'] && parseInt(doctor.years) > 10 && parseInt(doctor.years) <= 16) ||
      (filters.experience['17+'] && parseInt(doctor.years) > 16) ||
      (!filters.experience['0-5'] && !filters.experience['6-10'] && !filters.experience['11-16'] && !filters.experience['17+'])
    ) {
      // Fee filter
      if (
        (filters.fees['100-500'] && doctor.fee <= 500) ||
        (filters.fees['500-1000'] && doctor.fee > 500 && doctor.fee <= 1000) ||
        (filters.fees['1000+'] && doctor.fee > 1000) ||
        (!filters.fees['100-500'] && !filters.fees['500-1000'] && !filters.fees['1000+'])
      ) {
        return true;
      }
    }
    return false;
  });

  // If no filters are active, show all doctors
  const displayedDoctors = 
    !Object.values(filters.experience).some(Boolean) && 
    !Object.values(filters.fees).some(Boolean) && 
    !Object.values(filters.language).some(Boolean) 
      ? doctorsData 
      : filteredDoctors;

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      nearMe: false,
      modeOfConsult: {
        hospitalVisit: true,
        onlineConsult: true
      },
      experience: {
        '0-5': false,
        '6-10': false,
        '11-16': false,
        '17+': false
      },
      fees: {
        '100-500': false,
        '500-1000': false,
        '1000+': false
      },
      language: {
        english: false,
        hindi: false
      }
    });
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6">
        <Breadcrumb />
        
        {/* Mobile Filter Button */}
        {isMobile && (
          <Button 
            variant="outline" 
            className="mb-3 mt-2 w-full flex items-center justify-center"
            onClick={toggleMobileFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-2 md:mt-4">
          {/* Sidebar - hidden on mobile unless toggled */}
          <div className={`${isMobile ? (showMobileFilters ? 'block' : 'hidden') : 'block'} w-full md:w-1/4`}>
            <Sidebar 
              filters={filters} 
              onFilterChange={handleFilterChange}
              clearAllFilters={clearAllFilters}
            />
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4">
            <DoctorList doctors={
              !Object.values(filters.experience).some(Boolean) && 
              !Object.values(filters.fees).some(Boolean) && 
              !Object.values(filters.language).some(Boolean) 
                ? [
                    {
                      id: '1',
                      name: 'Dr. Summaiya Banu',
                      designation: 'General Practitioner',
                      years: '8',
                      qualification: 'MBBS',
                      location: 'Hyderabad',
                      clinic: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
                      rating: 84,
                      patients: '100+',
                      fee: 499,
                      cashback: 75,
                      availableIn: '2 minutes',
                      image: '/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png'
                    },
                    {
                      id: '2',
                      name: 'Dr. D Bhanu Prakash',
                      designation: 'General Practitioner',
                      years: '10',
                      qualification: 'MBBS, AFIH, ADVANCED CERTI...',
                      location: 'Hyderabad',
                      clinic: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
                      rating: 88,
                      patients: '150+',
                      fee: 489,
                      cashback: 73,
                      availableIn: '5 minutes',
                      image: '/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png'
                    },
                    {
                      id: '3',
                      name: 'Dr. Syed Ismail Ali',
                      designation: 'General Practitioner',
                      years: '7',
                      qualification: 'MBBS',
                      location: 'Hyderabad',
                      clinic: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
                      rating: 92,
                      patients: '200+',
                      fee: 399,
                      cashback: 60,
                      availableIn: '10 minutes',
                      image: '/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png'
                    }
                  ]
                : [
                    {
                      id: '1',
                      name: 'Dr. Summaiya Banu',
                      designation: 'General Practitioner',
                      years: '8',
                      qualification: 'MBBS',
                      location: 'Hyderabad',
                      clinic: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
                      rating: 84,
                      patients: '100+',
                      fee: 499,
                      cashback: 75,
                      availableIn: '2 minutes',
                      image: '/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png'
                    }
                  ]
            } />
            <div className="mt-4 md:mt-6">
              <HelpBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
