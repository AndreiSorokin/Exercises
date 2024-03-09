import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);

  const fetchCountry = (countryName) => {
    axios
      .get(`https://restcountries.com/v3/name/${countryName}`)
      .then(res => {
        setCountry(res.data);
      })
      .catch(err => {
        setCountry(null);
      });
  };

  useEffect(() => {
    fetchCountry();
  }, [countryName]);

  return { country: country, fetchCountry: fetchCountry };
};
