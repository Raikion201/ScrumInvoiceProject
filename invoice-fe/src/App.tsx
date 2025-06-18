import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import MainLayout from './app/mainlayout'
import HomePage from './app/page';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
};
export default App;