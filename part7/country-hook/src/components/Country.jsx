import React, { useState } from 'react'
import { useCountry } from '../hooks/useCountry'
import { useField } from '../hooks/useField'

const Country = ({countryName}) => {
  const { country } = useCountry(countryName)
  const { selectedCountry, search,handleInputChange, handleClick } = useField()

  console.log(country)

  // if (!country) {
  //   return <div>Loading...</div>
  // }

  return (
    <div>
      <form action="">
        <input type="text" onChange={handleInputChange} value={selectedCountry} />
        <button onClick={handleClick}>Search</button>
      </form>
      <div>
        {console.log(search)}
      </div>
{/* <form onSubmit={handleClick}>
        <input type="text" onChange={handleInputChange} value={selectedCountry}/>
        <button type="submit">Search</button>
      </form>

      {
        isEmpty
        ? <h3>Not found...</h3>
        : search.map(c=> {
          return (
            <div key={c.name.official}>
              <h3>{c.name.official} </h3>
              <div>capital {c.capital} </div>
              <div>population {c.population}</div> 
              <img src={c.flags.png} height='100' alt={`flag of ${c.name.official}`}/> 
            </div>
          )
        })
      } */}
    </div>
  )
}

export default Country