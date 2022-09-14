import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('../pages/home/Home'));

export default function AuthenticatedApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />

          <Route path="*" element={<Navigate to="" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
