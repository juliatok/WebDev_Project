import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Reading from './components/readingpage';
import UserProfile from './components/userProfile';
import MyProfile from './components/myprofile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Reading/>} />
          <Route path="/readingpage" element={<Reading />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
