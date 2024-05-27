import { useState } from "react";
import Navigation from "../component/navigation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordMatch: "",
    generic: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;
    let valid = true;
    setErrors({ email: "", passwordMatch: "", generic: "" });

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid Email ID",
      }));
      valid = false;
    }
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: "Passwords do not match",
      }));
      valid = false;
    }
    if (valid) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          formData
        );
        if (response.status === 201) {
          alert("User Added");
          navigate("/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            generic: error.response.data.message,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            generic: "An error occurred while registering user.",
          }));
        }
      }
    }
  };
  return (
    <div>
      <Navigation />
      <div>
        <div className="flex justify-center items-center my-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-10 bg-gray-200 rounded-md shadow-lg border-[1.2px] border-cyan-900"
          >
            <div className="mb-4">
              <div className="text-center uppercase font-bold my-1">
                Register
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-bold my-2" htmlFor="role">
                I am <span className="text-red-500">*</span>:
              </label>
              <div className="flex items-center">
                {" "}
                <input
                  type="radio"
                  id="seller"
                  name="role"
                  value="seller"
                  checked={formData.role === "seller"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="seller" className="mr-4">
                  Seller
                </label>
                <input
                  type="radio"
                  id="buyer"
                  name="role"
                  value="buyer"
                  checked={formData.role === "buyer"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="buyer">Buyer</label>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-bold mb-1" htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-bold mb-1" htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-bold mb-1" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="text-sm font-bold mb-1" htmlFor="phoneNumber">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-bold mb-1" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                className="text-sm font-bold mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.passwordMatch && (
                <p className=" text-red-500 text-md text-bold">
                  {errors.passwordMatch}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                I accept the terms and conditions
              </label>
            </div>
            {errors.generic && (
              <p className=" text-red-500 text-md font-normal py-3">
                {errors.generic}
              </p>
            )}

            <button
              type="submit"
              className={`w-full bg-cyan-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                !formData.termsAccepted && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!formData.termsAccepted}
            >
              Register
            </button>
            <div className="text-center pt-5">
              Already an user?{" "}
              <a className="underline text-blue-800" href="/login">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
