import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Reading from './components/blogById';
import UserProfile from './components/userProfile';
import MyProfile from './pages/myprofile';
import Login from './components/login';
import Signup from './components/signup';
import  Desktop  from './components/mainpage';
import BlogUpdateForm from './components/updateBlog'
import  Categories  from './components/categories';
import BlogForm from './components/blogForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Layout />}>
          <Route path="/mainpage" element={<Desktop />} />
          <Route path="/blogs/:id" element={<Reading />} />
          <Route path="/profile/:user_id" element={<UserProfile />} />
          <Route path="/myprofile/" element={<MyProfile />} />
          <Route path="/blogs/:id/update" element={<BlogUpdateForm />}/>
          <Route path="/categories" element={<Categories />} /> 
          <Route path="/blogform" element={<BlogForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
