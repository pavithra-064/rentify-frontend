import { useNavigate } from "react-router-dom";
import Navigation from "../component/navigation";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    setErrors({ email: "", message: "" });
    let valid = true;
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid Email ID",
      }));
      valid = false;
    }
    if (valid) {
      try {
        const res = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        if (res.status === 200) {
          // console.log(res.data);
          const { token } = res.data;
          const firstName = res.data.user.firstName;
          const userid = res.data.user.userId;
          const lastName = res.data.user.lastName;
          const role = res.data.user.role;
          const email = res.data.user.email;

          const userName = `${firstName} ${lastName}`;
          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
          localStorage.setItem("role", role);
          localStorage.setItem("userid", userid);
          localStorage.setItem("email", email);
          navigate("/");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              message: "User not found. Please register.",
            }));
          } else if (err.response.status === 401) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              message: "Incorrect password.",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              message: "Invalid email or password.",
            }));
          }
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            message: "An error occurred. Please try again later.",
          }));
        }
      }
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex justify-center items-center my-10 md:my-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-md border-[1.2px] border-cyan-900"
        >
          <div className="mb-4">
            <div className=" text-xl uppercase text-center  font-bold mb-2">
              Login
            </div>
          </div>

          <div className="mb-4">
            <label className=" text-sm font-bold mb-2" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className=" text-sm font-bold mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            New to Rentify?{" "}
            <a href="/register" className="underline text-blue-800">
              Sign Up
            </a>
          </div>
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-cyan-950 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
