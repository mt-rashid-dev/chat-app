import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { LuEye, LuEyeOff, LuLock, LuMail, LuMessageSquare, LuUser } from "react-icons/lu";

import SquarePattern from "../components/SquarePattern";
import { axiosInstance } from "../utils/axiosInstance";
import { setUser } from "../features/auth/authSlice";
import { sleep } from "../utils/sleep";

const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message, { autoClose: 3000 });
  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  const validateForm = () =>{
    let success = true;

    if (!fullName.trim()) {
      setNameError("Full name is required");
      success = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      success = false;
    } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Invalid email format");
      success = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      success = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      success = false;
    } else {
      setPasswordError("");
    }

    return success;
  };

  const togglePassword = () => {
    if(showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success) {
      setIsLoading(true);
      const newData = { fullName, email, password };
      axiosInstance.post("/auth/signup", newData)
      .then(async res => {
        notifySuccess("Sign up successful");
        const value = await sleep(3000, false);
        setIsLoading(value);
        dispatch(setUser(res.data));
        navigate("/");
      })
      .catch(error => {
        notifyError(error?.response?.data?.message);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="min-h-scrren grid lg:grid-cols-2 pt-16">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="max-w-md space-y-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-purple-600/10 flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                <LuMessageSquare className="size-6 text-primary"/>
              </div>
              <h1>Create Account</h1>
              <p>Get started with your free account</p>
            </div>
          </div>

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
                  placeholder="John Doe"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
              {nameError && <p className="pl-1 text-red-400">{nameError}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute flex items-center h-full px-3">
                  <LuMail className="size-5 text-base-content/40"/>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 pb-1"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              {emailError && <p className="pl-1 text-red-400">{emailError}</p>}
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
              {passwordError && <p className="pl-1 text-red-400">{passwordError}</p>}
            </div>

            <button type="submit" className="btn bg-purple-600 hover:bg-purple-500 text-gray-100 w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?&nbsp;
              <Link to="/login" className="link text-purple-600 hover:text-purple-500">
                Sign In
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

export default SignUpPage;