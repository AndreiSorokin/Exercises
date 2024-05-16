import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const NavBar = () => {
   const isLogin = localStorage.getItem('library-user-token')
   const navigate = useNavigate()

   const logOut = () => {
      localStorage.removeItem('library-user-token')
      navigate('/login')
   }
   
   return (
      <div>
         <Link to="/">
            <button>Authors</button>
         </Link>
         <Link to="/books">
            <button>Books</button>
         </Link> 
         {isLogin &&
         <Link to="/newBook">
            <button>New book</button>
         </Link>
         }
         {isLogin === null &&
         <Link to="/login">
            <button>Login</button>
         </Link>
         }
         {isLogin &&
         <Link to="/recommendaations">
            <button>Recommendations</button>
         </Link>
         }
         {isLogin && 
         <Link to="/login">
            <button onClick={logOut}>logout</button>
         </Link>
         }
      </div>
   )
}

export default NavBar
