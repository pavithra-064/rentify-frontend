import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../component/navigation";

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    sellerId: userId,
    title: "",
    description: "",
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    cost: "",
    sqft: "",
    nearbyFacilities: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nearbyFacilities") {
      const facilitiesArray = value
        .split(",")
        .map((facility) => facility.trim())
        .filter(Boolean);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: facilitiesArray,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addproperty",
        formData
      );
      if (response.status === 201) {
        alert("Property added successfully!");
        setFormData({
          sellerId: userId,
          title: "",
          description: "",
          place: "",
          area: "",
          bedrooms: "",
          bathrooms: "",
          cost: "",
          sqft: "",
          nearbyFacilities: [],
        });
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property. Please try again.");
    }
  };

  return (
    <div>
      <Navigation />

      <div className="flex justify-center items-center my-10 md:my-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-md border-[1.2px] border-cyan-900"
        >
          <div className="mb-4">
            <div className="block text-md text-center uppercase font-bold mb-2">
              Add Property
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="place">
              Place
            </label>
            <input
              type="text"
              name="place"
              id="place"
              value={formData.place}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="area">
              Area
            </label>
            <input
              type="text"
              name="area"
              id="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="bedrooms">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="bathrooms">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              id="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="cost">
              Cost
            </label>
            <input
              type="number"
              name="cost"
              id="cost"
              value={formData.cost}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="sqft">
              sqft
            </label>
            <input
              type="number"
              name="sqft"
              id="sqft"
              value={formData.sqft}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="nearbyFacilities"
            >
              Nearby Facilities
            </label>
            <input
              type="text"
              name="nearbyFacilities"
              id="nearbyFacilities"
              value={formData.nearbyFacilities}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
