import React from 'react';
import { useCountry } from '../hooks/useCountry';
import { useField } from '../hooks/useField';

const Country = () => {
  const { selectedCountry, handleInputChange } = useField();
  const { country, fetchCountry } = useCountry();

  const handleClick = (e) => {
    e.preventDefault();
    if (selectedCountry.trim() !== '') {
      fetchCountry(selectedCountry);
    }
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <input type="text" onChange={handleInputChange} value={selectedCountry} />
        <button type="submit">Search</button>
      </form>

      {country && country.length > 0 ? (
        <div key={country[0].name.official}>
          <h3>{country[0].name.official}</h3>
          <div>capital {country[0].capital}</div>
          <div>population {country[0].population}</div>
          <img src={country[0].flags[1]} style={{height:'150px', width: '250px', marginTop: '15px', border: '1px solid black'}} alt={`flag of ${country[0].name.official}`} />
        </div>
      ) : (
        <div>
          {!selectedCountry ? (
            <h3>Enter a country name to search</h3>
          ) : (
            <h3>Country not found</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Country;
