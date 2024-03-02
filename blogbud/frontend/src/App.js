import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Reading from './components/readingpage';
import UserProfile from './components/userProfile';
import MyProfile from './components/myprofile';
import Login from './components/login';
import Signup from './components/signup';
import  Desktop  from './components/mainpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Layout />}>
          <Route path="/mainpage" element={<Desktop />} />
          <Route path="/readingpage" element={<Reading />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
