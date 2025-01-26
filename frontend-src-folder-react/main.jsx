import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { StrictMode } from "react";
import AppRoutes from "./config/routes";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-z6k1ylv53o6dft32.us.auth0.com"
    clientId="CiyIdS0ai6WkJCdiRlwlo1JtBuOCmF5r"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <Toaster position="top-center" />
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </BrowserRouter>
  </Auth0Provider>
);
