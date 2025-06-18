import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import 'antd/dist/reset.css';

import RootLayout from './app/layout'
import HomePage from './app/page';
import AboutPage from './app/about/page';

// Các component mẫu cho các trang


const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<RootLayout><HomePage /></RootLayout>} />
        <Route path="/about" element={<RootLayout><AboutPage /></RootLayout>} />
      </Routes>
    </>
  )
};
export default App;