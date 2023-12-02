import { useEffect, useState } from 'react'
import Search from './components/Search'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch(
        'https://studies.cs.helsinki.fi/restcountries/api/all'
      )
      const data = await res.json()
      setCountries(data)
    }
    fetchData()
  }, [])

  
  return (
    <div>
      <Search countries={countries} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App
