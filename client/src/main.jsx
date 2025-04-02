import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Homepage = React.lazy(() => import('./pages/home/Home'));
const CreatePage = React.lazy(() => import('./pages/create/Create'));
const PostPage = React.lazy(() => import('./pages/post/Post'));
const ProfilePage = React.lazy(() => import('./pages/userProfile/UserProfile'));
const SearchPage = React.lazy(() => import('./pages/search/Search'));
const AuthPage = React.lazy(() => import('./pages/auth/Auth'));
import MainLayout from './pages/layouts/MainLayout';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/pin/:id' element={<PostPage />} />
          <Route path='/:username' element={<ProfilePage />} />
          <Route path='/search' element={<SearchPage />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
