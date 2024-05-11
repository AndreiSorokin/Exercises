import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
   return (
      <div>
         <Link to="/">
            <button>Authors</button>
         </Link>
         <Link to="/books">
            <button>Books</button>
         </Link> 
         <Link to="/newBook">
            <button>New book</button>
         </Link> 
      </div>
   )
}

export default NavBar
