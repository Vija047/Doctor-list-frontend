
import React from 'react';
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone } from 'lucide-react';

const HelpBanner = () => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-blue-900 text-white p-4 md:p-6 rounded-lg overflow-hidden relative shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-2/3">
          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 flex items-center">
            <Phone className="h-5 w-5 mr-2 hidden md:inline" />
            Need help consulting the right doctor?
          </h3>
          <p className="text-blue-100 text-sm md:text-base">
            Call <a href="tel:+918040245807" className="font-bold hover:underline">+91-8040245807</a> to book instantly
          </p>
        </div>
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <div className="h-20 md:h-24 w-24 md:w-auto">
            <img 
              src="/lovable-uploads/bc8032f0-5523-4b8e-8f4e-85e92146d5b9.png" 
              alt="Doctor Team" 
              className="h-full object-cover rounded md:rounded-none"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HelpBanner;
