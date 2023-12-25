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

function App() {

  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {
        loading && 
        <div className="spinner-parent">
        <div class="text-center">
          <div class="spinner-border" role="status">
            
          </div>
        </div>
      </div>
      }
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/userHome" element={<UserHome />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
