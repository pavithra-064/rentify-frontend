import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../component/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [likeMessages, setLikeMessages] = useState({});
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getallproperty"
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [navigate]);

  const handleLike = async (propertyId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowModal(true);
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/like/${propertyId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      const updatedLikes = response.data.likes;
      // console.log(updatedLikes);
      // Update the properties state with the new likes count
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === propertyId
            ? { ...property, likes: updatedLikes }
            : property
        )
      );
      setLikeMessages((prevMessages) => ({
        ...prevMessages,
        [propertyId]: "Liked",
      }));
      fetchProperties();
    } catch (err) {
      // console.log(err.response);
      if (err.response.status === 400) {
        setLikeMessages((prevMessages) => ({
          ...prevMessages,
          [propertyId]: err.response.data,
        }));
      }
      console.log("Error liking property:", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const redirectToLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div>
      <Navigation />
      <main className="container p-12">
        <h2 className="text-3xl text-cyan-900 font-bold mb-4">Properties</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-lg border-[0.5px] border-cyan-900 rounded-lg "
            >
              <img
                src={property.image}
                alt={property.bedrooms}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-2 px-4 pt-2">
                <h5>{property.bedrooms} BHK Property</h5>
                <h3 className="text-xl font-semibold">
                  Property Name: {property.title}
                </h3>
                <div>
                  Rs.{property.cost} | {property.sqft} sqft{" "}
                </div>
                <p className="text-gray-600">Area: {property.area}</p>
                <p className="text-gray-600">Likes: {property.likes}</p>
                <div className="flex w-full justify-between mt-2">
                  <div className="flex w-full items-center justify-between space-x-4">
                    <button
                      className="text-red"
                      onClick={() => handleLike(property.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} className="text-red" />
                      <span className="ml-2">Like</span>
                    </button>

                    <Link
                      to={
                        localStorage.getItem("token")
                          ? `/viewproperty/${property.id}`
                          : ""
                      }
                      onClick={() => {
                        if (!localStorage.getItem("token")) {
                          setShowModal(true);
                        }
                      }}
                      className="text-blue-500"
                    >
                      View More...
                    </Link>
                  </div>
                </div>
                {likeMessages[property.id] && (
                  <p className="text-red-600 text-md">
                    {likeMessages[property.id]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-4">Please login to perform this action.</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={redirectToLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {sellerDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Seller Details</h2>
            <p className="mb-2">Name: {sellerDetails.name}</p>
            <p className="mb-2">Email: {sellerDetails.email}</p>
            <p className="mb-4">Phone: {sellerDetails.phone}</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setSellerDetails(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
