import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgot_password/forgotpassword";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import UserHome from "./pages/user_dash/user_main_dash";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";
import ApplyCounsellor from "./pages/user_dash/applying_counsellor";
import UserAppintment from "./pages/user_dash/appointment";
import UserProfile from "./pages/user_dash/user_profile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="text-center">
            <div class="spinner-border" role="status"></div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />

      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/applyingCounsellor"
          element={
            <ProtectedRoute>
              <ApplyCounsellor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userHome"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userAppointments"
          element={
            <ProtectedRoute>
              <UserAppintment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
