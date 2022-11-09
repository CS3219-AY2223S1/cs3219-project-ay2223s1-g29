import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SuspenseApp from './SuspenseApp';

const Login = lazy(() => import('../pages/user/Login'));
const Register = lazy(() => import('../pages/user/Register'));

export default function UnauthenticatedApp() {
  return (
    <Suspense fallback={<SuspenseApp />}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Navigate to="" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
