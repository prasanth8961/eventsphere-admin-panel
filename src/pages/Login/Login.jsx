import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../App/Features/Api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../App/Features/Auth/authSlice";
import { toast, Bounce } from "react-toastify";
import { useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitLogin] = useLoginMutation();

  const validate = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email address";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 4) {
      errors.password = "password invalid";
      valid = false;
    }
    if (!valid) {
      toast.error("Enter valid credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    setErrors(errors);
    return valid;
  };
  const [navigateReady, setNavigateReady] = useState(false);

  // useEffect(() => {
  //   if (navigateReady) {
  //       //     navigate("/dashboard");
  //   }
  // }, [navigateReady]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);

        const response = await submitLogin({ email, password }).unwrap();
        if (response["success"]) {
          localStorage.setItem("token", response["data"].accessToken);
          dispatch(setCredentials({ token: response["data"].accessToken }));
          toast.success("Login success", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          navigate("/dashboard");
        } else {
          setLoading(false);
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        if (error.data.message) {
          toast.error(error.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        } else if (error.error) {
          toast.error(error.error.split(":")[1], {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
        setLoading(false);
      } finally {
        setLoading(false);
        setEmail(""), setPassword("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center    ">
      <div className="bg-white backdrop-filter backdrop-blur-sm bg-opacity-40 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6  ">Login</h2>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold ">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-2 w-full p-3 border ${errors.email ? "border-red" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold ">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-2 w-full p-3 border ${errors.password ? "border-red" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 flex align-middle justify-center gap-2 ${loading ? "bg-blue-600 opacity-35" : "bg-blue-600"
                }  text-white font-semibold rounded-lg shadow hover:bg-blue-900 transition`}
            >
              {loading && (
                <div className="flex items-center justify-center">
                  <div className="h-6 w-6 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
                </div>
              )}
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
