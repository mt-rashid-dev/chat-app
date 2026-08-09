import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { LuMessageSquare, LuSettings, LuUser, LuLogOut } from "react-icons/lu";

import { axiosInstance } from "../utils/axiosInstance";
import { resetUser } from "../features/auth/authSlice";
import { sleep } from "../utils/sleep";

const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message, { autoClose: 3000 });
  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  const logout = () => {
    axiosInstance.post("/auth/logout")
    .then(async res => {
      notifySuccess("Logged out successfully");
      const value = await sleep(3000, "/login");
      dispatch(resetUser());
      navigate(value);
    })
    .catch(error => {
      notifyError(error?.response?.data?.message);
    });
  };

  return (
    <header className="block w-full fixed bg-base-100 border-b border-base-300">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <LuMessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <h1 className="text-lg font-bold">Chat App</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <LuSettings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {user && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <LuUser className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LuLogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </header>
  );
};

export default Navbar;