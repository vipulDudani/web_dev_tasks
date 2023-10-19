import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./helper/ProtectedRoute";

function App() {
  const darkMode = useSelector((state) => state.auth.darkMode);

  return (
    <>
      <BrowserRouter>
        <main className={`${darkMode ? "dark text-white bg-gray-950" : ""}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
