import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { setCart } from "../redux/cartSlice";
import { getOrdersFailure, getOrdersStart, getOrdersSuccess } from "../redux/orderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from "../components/Logo";

const Login = ({setShowLogin,setShowRegister}) => {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const getUserOrders = async (userId, token) => {
    dispatch(getOrdersStart());
    try {
      const res = await fetch(`https://easybuy-34kz.onrender.com/api/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data) {
        dispatch(getOrdersSuccess(data));
      } else {
        dispatch(getOrdersFailure());
      }
    } catch (error) {
      dispatch(getOrdersFailure());
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch("https://easybuy-34kz.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        dispatch(loginFailure());
        toast.error(data.error);
      } else {
        dispatch(loginSuccess({ user: data.existingUser, token: data.token }));
        const cart = await fetch(`https://easybuy-34kz.onrender.com/api/cart/${data.existingUser._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        });
        const cartData = await cart.json();
        console.log(cartData);
        dispatch(setCart(cartData));
        getUserOrders(data.existingUser._id, data.token);
        toast.success("Login successful");
      }
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
      toast.error(error.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  return (
    <div className="w-full min-w-fit flex items-center justify-center">
      <div className="w-full flex flex-col items-center max-w-sm bg-white pt-2 px-8 pb-8 rounded-lg ">
      <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        <form className="space-y-4 w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute inset-y-0 right-0 flex items-center mr-3 cursor-pointer">
            <div>
        
        <span className="text-sm" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
    </div>

            </label>
          </div>
          <button
            className={`w-full py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${
              isFetching ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleClick}
            disabled={isFetching}
          >
            Login
          </button>
          <div className="text-center mt-4" onClick={handleShowLogin}>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Create a new account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
