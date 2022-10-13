import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SuspenseApp from './SuspenseApp';

const Home = lazy(() => import('../pages/home/Home'));
const Collab = lazy(() => import('../pages/collab/Collab'));

export default function AuthenticatedApp() {
  return (
    <Suspense fallback={<SuspenseApp />}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/collab" element={<Collab />} />

          <Route path="*" element={<Navigate to="" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
