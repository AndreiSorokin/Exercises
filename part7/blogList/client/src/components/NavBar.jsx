import React from 'react'
import { Link } from 'react-router-dom';
import { userLogout } from "../redux/slices/loginSlice";

import { Button, Typography } from '@mui/material';


import { useAppSelector, useAppDispatch } from '../redux/store';

const NavBar = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector(state => state.user.user);

   function logOut() {
      dispatch(userLogout())
   }

   return (
      <div style={{ backgroundColor: 'white', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         {user &&
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
               <Typography variant="h6" style={{ color: 'black', marginRight: '20px' }}>{user.name} logged in</Typography>
               <Link to="/api/blogs" style={{ textDecoration: 'none' }}>
                     <Button variant="outlined" style={{ color: 'black', borderColor: 'black', minWidth: '120px', margin: '5px' }}>
                        Blogs
                     </Button>
               </Link>
               <Link to="/users" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" style={{ color: 'black', borderColor: 'black', minWidth: '120px', margin: '5px' }}>
                     Users
                  </Button>
               </Link>
               <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button onClick={logOut} variant="outlined" style={{ color: 'black', borderColor: 'black', minWidth: '120px', margin: '5px' }}>
                     Log out
                  </Button>
                  </Link>
            </div>
         }
      </div>
   );
}

export default NavBar
