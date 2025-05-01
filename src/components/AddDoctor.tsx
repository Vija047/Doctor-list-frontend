import { useState } from 'react';
import axios from 'axios';

export default function AddDoctor() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialization: '',
    experience: '',
    qualification: '',
    fees: '',
    languages: [''],
    consultModes: ['Online'],
    location: {
      city: '',
      state: ''
    },
    rating: '',
    isAvailable: true,
    profileImage: ''
  });
  
  const specializations = [
    "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", 
    "Orthopedic", "Gynecologist", "Psychiatrist", "Ophthalmologist",
    "ENT Specialist", "General Physician"
  ];

  const consultModeOptions = ["Online", "Hospital Visit", "Home Visit"];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setDoctorData({
        ...doctorData,
        [parent]: {
          ...doctorData[parent],
          [child]: value
        }
      });
    } else if (type === 'checkbox') {
      setDoctorData({
        ...doctorData,
        [name]: checked
      });
    } else {
      setDoctorData({
        ...doctorData,
        [name]: value
      });
    }
  };
  
  const handleLanguagesChange = (e) => {
    setDoctorData({
      ...doctorData,
      languages: e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang !== '')
    });
  };
  
  const handleConsultModeChange = (mode) => {
    const currentModes = doctorData.consultModes;
    
    if (currentModes.includes(mode)) {
      setDoctorData({
        ...doctorData,
        consultModes: currentModes.filter(m => m !== mode)
      });
    } else {
      setDoctorData({
        ...doctorData,
        consultModes: [...currentModes, mode]
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Convert string values to numbers where needed
      const formattedData = {
        ...doctorData,
        experience: Number(doctorData.experience),
        fees: Number(doctorData.fees),
        rating: Number(doctorData.rating)
      };
      
      // Make the POST request to the backend API
      const response = await axios.post('http://localhost:5000/api/doctors/add-doctor', formattedData);

      // Check the response status
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError("Failed to add doctor. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
    <div className="absolute top-4 left-4 z-50">
    <button className="bg-white border border-gray-300 rounded px-3 py-1 shadow hover:bg-gray-100">
      <a href="/" className="text-blue-600 hover:underline">Back to Home</a>
    </button>
  </div>
  
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-6 px-8">
          <h2 className="text-2xl font-bold text-white">Add New Doctor</h2>
          <p className="text-blue-100 mt-1">Complete the form below to add a doctor to the system</p>
        </div>
        
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mx-8 mt-6">
            <p className="font-bold">Success!</p>
            <p>Doctor profile has been added successfully.</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-8 mt-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={doctorData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Dr. Full Name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input
              id="profileImage"
              type="text"
              name="profileImage"
              value={doctorData.profileImage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/doctor-image.jpg"
            />
          </div>
          
          {/* Professional Details */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Professional Details</h3>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization *</label>
            <select
              id="specialization"
              name="specialization"
              required
              value={doctorData.specialization}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification *</label>
            <input
              id="qualification"
              type="text"
              name="qualification"
              required
              value={doctorData.qualification}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="MBBS, MD, MS, etc."
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (years) *</label>
            <input
              id="experience"
              type="number"
              name="experience"
              required
              min="0"
              max="70"
              value={doctorData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Languages *</label>
            <input
              id="languages"
              type="text"
              name="languages"
              required
              value={doctorData.languages.join(', ')}
              onChange={handleLanguagesChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="English, Hindi, etc. (comma separated)"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
            <input
              id="rating"
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={doctorData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                id="isAvailable"
                type="checkbox"
                name="isAvailable"
                checked={doctorData.isAvailable}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
                Available for consultation
              </label>
            </div>
          </div>
          
          {/* Consultation Details */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Consultation Details</h3>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Consultation Modes *</label>
            <div className="mt-1 space-y-2">
              {consultModeOptions.map(mode => (
                <div key={mode} className="flex items-center">
                  <input
                    id={`mode-${mode}`}
                    type="checkbox"
                    checked={doctorData.consultModes.includes(mode)}
                    onChange={() => handleConsultModeChange(mode)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`mode-${mode}`} className="ml-2 block text-sm text-gray-700">
                    {mode}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="fees" className="block text-sm font-medium text-gray-700">Consultation Fees (INR) *</label>
            <input
              id="fees"
              type="number"
              name="fees"
              required
              min="0"
              value={doctorData.fees}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="md:col-span-2 mt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
