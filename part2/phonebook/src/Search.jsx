import React from 'react'

const Search = ({search, setSearch}) => {

   function searchInputChange(e){
      setSearch(e.target.value)
   }

   return (
   <div>
      <input type="text" value={search} onChange={searchInputChange} />
   </div>
   )
}

export default Search
