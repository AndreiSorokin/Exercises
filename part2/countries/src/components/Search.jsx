import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Search = ({countries, search, setSearch}) => {

   const filteredCountries = countries.filter(c=> c.name.common.toLowerCase().includes(search.toLowerCase()))
   const isMany = filteredCountries.length > 10
   const isEmpty = filteredCountries.length == countries.length
   const isOne = filteredCountries.length == 1
   
   const api_key = import.meta.env.VITE_API_KEY

   const [selectedCountries, setSelectedCountries] = useState({
      languages: [],
      flag: ''
   })
   const [country, setCountry] = useState('');
   const [weatherData, setWeatherData] = useState(null);


   function findCountries(e) {
      setSearch(e.target.value)
      setCountry(e.target.value)
   }

   useEffect(()=> {
      const getWeather = async () => {
         try {
            const countryData = await axios.get(
               `https://restcountries.com/v3.1/name/${country}`
            );
   
            const capital = countryData.data[0].capital[0];
            const response = await axios.get(
               `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
            );
   
            setWeatherData(response.data);
         } catch (error) {
            console.error('Error fetching weather data:', error);
         }
      }
   
      if(isOne) {
         getWeather()
      }
   },[country])


   return (
      <div>
         <input type="text" onChange={findCountries} value={search} />
         <div>
            {
               isEmpty
               ? <p>Enter the name of a country</p>
               : <div>
                  {
                     isMany 
                     ? <p>Too many matches, spicify the country</p>
                     : <div>
                        {
                           isOne
                           ?  <div>
                              {filteredCountries.map(c=> {
                                 return(
                                    <div key={c.name.official} >
                                       <h2> {c.name.common} </h2>
                                       <p>Capital: {c.capital} <br/> 
                                          Area: {c.area} 
                                       </p>
                                       <h3>Languages:</h3>
                                       <ul> 
                                          {
                                             Object.values(c.languages).map(lang=> {
                                                return(
                                                   <li key={lang} > {lang} </li>
                                                )
                                             })
                                          }
                                       </ul>
                                       <img src={c.flags.png} alt="" />
                                       <h2>Weather in {c.capital[0]}</h2>
                                       {weatherData && (
                                          <div>
                                             <h2>{weatherData.name}</h2>
                                             <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
                                             <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="" />
                                             <p>Wind: {weatherData.wind.speed} m/s</p>
                                          </div>
                                       )}
                                    </div>
                                 )
                              })}
                           </div>
                           :  <ul>
                              {
                                 filteredCountries.map(c=> {
                                    return(
                                       <div key={c.name.official} className='countries'>
                                          <li> {c.name.common} </li>
                                                
                                          <button onClick={(e)=> {
                                             e.preventDefault()
                                             const languages = Object.values(c.languages);
                                             const flag = c.flags.png;

                                             setSelectedCountries({ languages, flag });
                                          }} className='show' > Show </button>
                                       </div>
                                    )
                                 })
                              }
                              {
                                 selectedCountries.languages.length > 0 && (
                                    <div>
                                       <h2>Languages:</h2>
                                       <ul>
                                          {selectedCountries.languages.map((lang, index) => (
                                             <li key={index}>{lang}</li>
                                          ))}
                                       </ul>
                                       <img src={selectedCountries.flag} alt='Flag' />
                                    </div>
                                 )
                              }
                           </ul>
                     }
                     </div>
                  }
               </div>
            }
         </div>
      </div>
   )
}

export default Search
