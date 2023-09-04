import "./main.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";

const SignupPage = React.lazy(() => import("./pages/Signup/Signup.jsx"));
const LoginPage = React.lazy(() => import("./pages/Login/Login.jsx"));
const LandingPage = React.lazy(() => import("./pages/Landing/LandingPage.jsx"));
const ProfilePage = React.lazy(() => import("./pages/Profile/ProfilePage.jsx"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/:username" element={<ProfilePage />} />
      <Route path="" element={<LandingPage />} />
    </Route>
  )
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const Navigate = React.lazy(() => import("react-router-dom").then((module) => ({ default: module.Navigate })));

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/isLoggedIn`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setIsLoggedIn(response.data.isLoggedIn);
      });
  }, [isLoggedIn]);

  const notloggedRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="" element={<SignupPage/>} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={isLoggedIn ? router : notloggedRouter} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
