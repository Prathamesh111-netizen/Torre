import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// import Dashboard from "./pages/Dashboard.jsx";
// import JoinMeeting from "./pages/Join/JoinMeeting.jsx";
// import CreateMeeting from "./pages/CreateMeet/CreateMeeting.jsx";
// import Meeting from "./pages/MeetingPage/Meeting";
// import Lobby from "./pages/Lobby/Lobby";
// import SchedueledMeetings from "./pages/scheduledMeetings/scheduledMeetings.jsx";

const SignupPage = React.lazy(() => import("./pages/Signup/Signup.jsx"));
const LoginPage = React.lazy(()=> import("./pages/Login/Login.jsx"))
const LandingPage = React.lazy(()=> import("./pages/Landing/LandingPage.jsx"))
const ProfilePage = React.lazy(()=> import("./pages/Profile/ProfilePage.jsx"))

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* <Route path="" element={<LandingPage />} /> */}
      {/* <Route path="create" element={<CreateMeeting />} />
      <Route
        path="meeting/:id"
        element={<Meeting />}
        errorElement={<LandingPage />}
      />
      <Route path="scheduled-meetings" element={<SchedueledMeetings />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="lobby" element={<Lobby />} /> */}
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/:username" element={<ProfilePage />} />
      <Route path="" element={<LandingPage />} />

      {/* <Route path="join" element={<JoinMeeting />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
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
