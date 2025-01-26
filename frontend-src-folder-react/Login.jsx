import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export const Login = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Redirect to "/join" if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/join");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white">
      <div className="flex items-center justify-center h-full p-6">
        <div className="w-full max-w-4xl bg-opacity-90 bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            Welcome to Printify!
          </h1>
          <p className="text-lg text-center mb-8">
            A web application that gives accessibility to print shop owners to
            create rooms for specific room IDs. Multiple users can access the
            same room, upload documents via links or directly, and enhance
            privacy.
          </p>

          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                🖨️ Create rooms for specific room IDs that multiple users can
                access.
              </li>
              <li>
                🔗 Upload documents via links or directly to the room for
                printing.
              </li>
              <li>
                🔒 Enhanced privacy with no need to store personal mobile
                numbers.
              </li>
              <li>💬 Anonymous chatting feature for seamless communication.</li>
              <li>
                🚪 Join a room, send documents to print, and leave the room
                anytime.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            {!isAuthenticated ? (
              <div className="text-center">
                <button
                  className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-110 transform transition-all duration-300"
                  onClick={() => loginWithRedirect()}
                >
                  Login to use the application
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xl font-semibold mb-4">
                  Welcome, {user?.name || "User"}!
                </p>
                <button
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
