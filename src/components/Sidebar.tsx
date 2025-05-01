
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SidebarProps {
  filters: {
    nearMe: boolean;
    modeOfConsult: {
      hospitalVisit: boolean;
      onlineConsult: boolean;
    };
    experience: {
      '0-5': boolean;
      '6-10': boolean;
      '11-16': boolean;
      '17+': boolean;
    };
    fees: {
      '100-500': boolean;
      '500-1000': boolean;
      '1000+': boolean;
    };
    language: {
      english: boolean;
      hindi: boolean;
    };
  };
  onFilterChange: (filters: any) => void;
  clearAllFilters: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, clearAllFilters }) => {
  const handleNearMeClick = () => {
    onFilterChange({
      ...filters,
      nearMe: !filters.nearMe
    });
  };

  const handleModeOfConsultChange = (mode: 'hospitalVisit' | 'onlineConsult') => {
    onFilterChange({
      ...filters,
      modeOfConsult: {
        ...filters.modeOfConsult,
        [mode]: !filters.modeOfConsult[mode]
      }
    });
  };

  const handleExperienceChange = (range: '0-5' | '6-10' | '11-16' | '17+') => {
    onFilterChange({
      ...filters,
      experience: {
        ...filters.experience,
        [range]: !filters.experience[range]
      }
    });
  };

  const handleFeesChange = (range: '100-500' | '500-1000' | '1000+') => {
    onFilterChange({
      ...filters,
      fees: {
        ...filters.fees,
        [range]: !filters.fees[range]
      }
    });
  };

  const handleLanguageChange = (language: 'english' | 'hindi') => {
    onFilterChange({
      ...filters,
      language: {
        ...filters.language,
        [language]: !filters.language[language]
      }
    });
  };

  return (
    <Card className="p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-blue-600 text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      <Button 
        variant="outline" 
        onClick={handleNearMeClick}
        className={`w-full mb-6 ${filters.nearMe ? 'bg-blue-50 border-blue-500 text-blue-700' : ''}`}
      >
        Show Doctors Near Me
      </Button>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Mode of Consult</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hospitalVisit" 
              checked={filters.modeOfConsult.hospitalVisit}
              onCheckedChange={() => handleModeOfConsultChange('hospitalVisit')}
            />
            <label htmlFor="hospitalVisit" className="text-sm">Hospital Visit</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="onlineConsult" 
              checked={filters.modeOfConsult.onlineConsult}
              onCheckedChange={() => handleModeOfConsultChange('onlineConsult')}
            />
            <label htmlFor="onlineConsult" className="text-sm">Online Consult</label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Experience (In Years)</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="exp-0-5" 
              checked={filters.experience['0-5']}
              onCheckedChange={() => handleExperienceChange('0-5')}
            />
            <label htmlFor="exp-0-5" className="text-sm">0-5</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="exp-6-10" 
              checked={filters.experience['6-10']}
              onCheckedChange={() => handleExperienceChange('6-10')}
            />
            <label htmlFor="exp-6-10" className="text-sm">6-10</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="exp-11-16" 
              checked={filters.experience['11-16']}
              onCheckedChange={() => handleExperienceChange('11-16')}
            />
            <label htmlFor="exp-11-16" className="text-sm">11-16</label>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 text-sm mt-1">+1 More</button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Fees (In Rupees)</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fee-100-500" 
              checked={filters.fees['100-500']}
              onCheckedChange={() => handleFeesChange('100-500')}
            />
            <label htmlFor="fee-100-500" className="text-sm">100-500</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fee-500-1000" 
              checked={filters.fees['500-1000']}
              onCheckedChange={() => handleFeesChange('500-1000')}
            />
            <label htmlFor="fee-500-1000" className="text-sm">500-1000</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fee-1000-plus" 
              checked={filters.fees['1000+']}
              onCheckedChange={() => handleFeesChange('1000+')}
            />
            <label htmlFor="fee-1000-plus" className="text-sm">1000+</label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Language</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="english" 
              checked={filters.language.english}
              onCheckedChange={() => handleLanguageChange('english')}
            />
            <label htmlFor="english" className="text-sm">English</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hindi" 
              checked={filters.language.hindi}
              onCheckedChange={() => handleLanguageChange('hindi')}
            />
            <label htmlFor="hindi" className="text-sm">Hindi</label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
