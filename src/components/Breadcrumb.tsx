
import React from 'react';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <a href="/add-doctor" className="ml-1 text-blue-600 hover:text-blue-800 md:ml-2">
              Doctors
            </a>
          </div>
        </li>
       
      </ol>
    </nav>
  );
};

export default Breadcrumb;
