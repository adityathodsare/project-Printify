import React from "react";
import { Route, Routes } from "react-router";
import App from "../App.jsx";
import ChatPage from "../components/ChatPage.jsx";
import Login from "../login.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/join" element={<App />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Login />} />

        <Route path="*" element={<h1>404 not found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
