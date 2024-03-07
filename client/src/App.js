import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/account/login'; 
import ForgotPassword from './components/account/ForgotPassword'; 
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
// import Header from './components/header/Header';
import AdminPage from './components/account/AdminPage';
import PasswordResetPage from './components/account/PasswordResetPage';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>

      {props.children}
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DataProvider>
      <Router>
        <div style={{ marginTop: 60 }}>
          <Routes>
            <Route path="/login" element={<Login isUserAuthenticated={setIsAuthenticated} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route for ForgotPasswordPage */}
            {/* <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}> */}
              <Route path="/" element={<Home />} />
             {/* </Route> */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/reset-password/:token" element={<PasswordResetPage />} />
            <Route path="/about" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
