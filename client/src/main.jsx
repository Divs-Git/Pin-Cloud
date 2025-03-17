import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Post from './pages/post/Post';
import Auth from './pages/auth/Auth';
import UserProfile from './pages/userProfile/UserProfile.jsx';
import Search from './pages/search/Search.jsx';
import MainLayout from './layouts/MainLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/pin/:id' element={<Post />} />
          <Route path='/:username' element={<UserProfile />} />
          <Route path='/search' element={<Search />} />
        </Route>
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
