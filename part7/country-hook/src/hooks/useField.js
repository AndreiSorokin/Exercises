import { useState } from 'react';

export const useField = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleInputChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return {
    selectedCountry,
    handleInputChange,
  };
};
