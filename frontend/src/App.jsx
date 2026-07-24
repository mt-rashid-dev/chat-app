import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const user = useSelector(state => {
    console.log(state.auth.user);
    return state.auth.user;
  });
  
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
};

export default App;