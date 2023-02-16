import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GoogleOAuthProvider
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
            <Login />
          </GoogleOAuthProvider>
        }
      />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
