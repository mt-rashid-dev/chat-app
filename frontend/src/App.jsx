import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth, setOnlineUsers } from "./features/auth/authSlice";
import { socket, disconnectSocket } from "./utils/socket";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const user = useSelector(state => state.auth.user);
  const isCheckingAuth = useSelector(state => state.auth.isCheckingAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnlineUsers = (userIds) => {
      console.log(userIds);
      dispatch(setOnlineUsers(userIds));
    };

    socket.on("getOnlineUsers", handleOnlineUsers);
    dispatch(checkAuth());

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
      disconnectSocket();
    };
  }, [dispatch]);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={user ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={user ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  );
};

export default App;