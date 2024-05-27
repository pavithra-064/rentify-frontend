import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsSeller(role === "seller");
  }, []);

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("userid");
    localStorage.removeItem("email");
    navigate("/login");
  }
  return (
    <nav className="bg-cyan-950 p-4 flex container justify-between">
      <div className=" ">
        <div className="text-white text-xl font-bold">Rentify</div>
      </div>
      <div className="text-lg italic text-white">
        "Where Renting meets Simplicity"
      </div>
      {token ? (
        <div className="flex items-center ">
          <div className="text-white ">{userName}</div>
          <div className="relative">
            <button
              className="text-white focus:outline-none ml-2 mt-1"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-5"
                fill="none"
                viewBox="0 0 22 22"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <div className="py-2">
                  {isSeller && (
                    <a
                      href="/addproperty"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                      Add Property
                    </a>
                  )}
                  {isSeller && (
                    <a
                      href="/getmyproperty"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                      View My Properties
                    </a>
                  )}
                  <a
                    href="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                  >
                    View All Properties
                  </a>
                  <button
                    className="w-full text-start px-4 pr-10 py-2 text-lg text-gray-800 hover:bg-blue-500 hover:text-white"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <a href="/login" className="text-white text-lg hover:text-blue-500">
            Login
          </a>
        </div>
      )}
    </nav>
  );
}
