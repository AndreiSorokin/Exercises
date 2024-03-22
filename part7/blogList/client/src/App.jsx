import {
  Routes, Route,
  Navigate
} from 'react-router-dom'
import Blog from "./components/Blog";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ErrorMessage from "./components/ErrorMessage";
import "./index.css";
import SuccessMessage from "./components/SuccessMessage";
import Users from "./components/Users.jsx";
import User from './components/User.jsx';
import Post from './components/Post.jsx';

function App() {

  return (
    <div>
      <NavBar />
      <ErrorMessage />
      <SuccessMessage />
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/api/blogs' element={<Blog/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/user/:id/blogs' element={<User/>}></Route>
        <Route path='/blogs/:id' element={<Post/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
