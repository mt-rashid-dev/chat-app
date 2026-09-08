import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LuEye, LuEyeOff, LuLock, LuMessageSquare, LuUser } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";

import SquarePattern from "../components/SquarePattern";
import { axiosInstance } from "../utils/axiosInstance";
import { sleep } from "../utils/sleep";
import { setUser } from "../features/auth/authSlice";
import { connectSocket } from "../utils/socket";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message, { autoClose: 3000 });
  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  const togglePassword = () => {
    if(showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginData = { email, password };

    axiosInstance.post("/auth/login", loginData)
    .then(async res => {
      notifySuccess("Logged in successfully");
      const value = await sleep(3000, false);
      setIsLoading(value)
      dispatch(setUser(res.data));
      connectSocket(res.data._id);
      navigate("/");
    })
    .catch(async error => {
      notifyError(error?.response?.data?.message);
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-16">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="max-w-md space-y-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-purple-600/10 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                <LuMessageSquare className="size-6 text-purple-600"/>
              </div>
              <h1>Welcome Back</h1>
              <p>Sign in to your account</p>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute flex items-center h-full px-3">
                  <LuUser className="size-5 text-base-content/40"/>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 pb-1"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute flex items-center h-full px-3">
                  <LuLock className="size-5 text-base-content/40"/>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full px-10 pb-1"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 flex items-center h-full px-3"
                  onClick={togglePassword}
                >
                  {showPassword ? <LuEyeOff className="size-5 text-base-content/40"/> : <LuEye className="size-5 text-base-content/40"/>}
                </button>
              </div>
            </div>

            <button type="submit" className="btn bg-purple-600 hover:bg-purple-500 text-gray-100 w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?&nbsp;
              <Link to="/signup" className="link text-purple-600 hover:text-purple-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <SquarePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

      <ToastContainer />
    </div>
  );
};

export default LoginPage;