import { useState } from 'react'
import { useCountry } from './useCountry' 

export const useField = () => {
  const { country } = useCountry()

  const [selectedCountry, setSelectedCountry] = useState('')
  const [search, setSearch] = useState('')

  // const filteredCountries = country ? country.filter(c=> c.name.common.toLowerCase().includes(search.toLowerCase())) : []
  // const isEmpty = filteredCountries.length === 0

  const handleInputChange = (e) => {
    setSelectedCountry(e.target.value)
    // setSearch(e.target.value)
  }
  const handleClick = (e) => {
    e.preventDefault()
    setSearch(selectedCountry)
  }

  return {
    selectedCountry,
    // filteredCountries,
    search,
    // isEmpty,
    handleInputChange,
    handleClick
  }
}