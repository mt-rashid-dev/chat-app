import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth } from "./features/auth/authSlice";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const user = useSelector(state => state.auth.user);
  const isCheckingAuth = useSelector(state => state.auth.isCheckingAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (isCheckingAuth && !user) {
    return <span className="loading loading-spinner loading-lg"></span>
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