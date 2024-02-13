import { useState, useEffect  } from 'react'
import  axios  from 'axios'

export const useCountry = (countryName) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(res => {
        setCountry(res.data)
      })
      .catch(err => err.message)
  }, [countryName])

  return { country }
}