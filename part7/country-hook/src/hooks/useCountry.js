import { useState } from 'react';
import axios from 'axios';

export const useCountry = () => {
  const [country, setCountry] = useState(null);

  const fetchCountry = (countryName) => {
    axios
      .get(`https://restcountries.com/v3/name/${countryName}`)
      .then(res => {
        setCountry(res.data);
      })
      .catch(err => {
        console.error(err);
        setCountry(null);
      });
  };

  return { country: country, fetchCountry: fetchCountry };
};
