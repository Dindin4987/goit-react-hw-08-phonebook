import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { ContactsPage } from 'pages/ContactsPage';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { HomePage } from 'pages/HomePage';
import { useDispatch } from 'react-redux';
import { useAuth } from '../redux/hooks/useAuth';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/authOperations';

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser()).then(() => {
      if (!isRefreshing) {
        navigate('/contacts');
      }
    });
  }, [dispatch, navigate, isRefreshing]);

  return isRefreshing ? (
    <h1>Refreshing user... Please wait.</h1>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={RegisterPage}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={LoginPage} redirectTo="/contacts" />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={ContactsPage} redirectTo="/login" />
            }
          />
          <Route
            path="/logout"
            element={<PrivateRoute component={HomePage} redirectTo="/" />}
          />
        </Route>
      </Routes>
    </>
  );
};
