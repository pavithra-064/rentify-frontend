import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../component/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const userid = localStorage.getItem("userid");
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    nearbyFacilities: "",
  });

  const navigate = useNavigate();
  const fetchProperties = async (userid) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getmyproperty/${userid}`
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (!token) {
      navigate("/");
    }

    fetchProperties(userid);
  }, []);

  const handleEdit = (property) => {
    setEditProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      place: property.place,
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      cost: property.cost,
      sqft: property.sqft,
      nearbyFacilities: property.nearbyFacilities.join(", "),
    });
  };

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/deleteproperty/${propertyId}`
      );
      setProperties(
        properties.filter((property) => property._id !== propertyId)
      );
      fetchProperties(userid);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProperty = {
        ...formData,
        nearbyFacilities: formData.nearbyFacilities
          .split(",")
          .map((facility) => facility.trim()),
      };
      const response = await axios.put(
        `http://localhost:5000/api/updateproperty/${editProperty.id}`,
        updatedProperty
      );
      setProperties(
        properties.map((property) =>
          property._id === editProperty.id ? updatedProperty : property
        )
      );
      setEditProperty(null);
      fetchProperties(userid);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <main className="container mx-auto p-12">
        <h2 className="text-3xl font-bold mb-4 text-cyan-900">
          Your Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-lg border-[0.5px] border-cyan-900 rounded-lg "
            >
              <img
                src={property.image}
                alt={property.bedrooms}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-2 p-2">
                <h5>{property.bedrooms} BHK Property</h5>
                <h3 className="text-xl font-semibold">
                  Property Name:{property.title}
                </h3>
                <div>
                  Rs.{property.cost} | {property.sqft} sqft{" "}
                </div>
                <p className="text-gray-600">Area: {property.area}</p>
                <div className="flex w-full justify-between mt-4">
                  <div className="flex w-full items-center justify-between space-x-4">
                    <div
                      className=" text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(property)}
                    >
                      <i className="fas fa-pen mr-2"></i>
                      <FontAwesomeIcon icon={faPen} />
                      <span className="ml-2">Edit</span>
                    </div>
                    <div
                      className=" text-red-500 cursor-pointer"
                      onClick={() => handleDelete(property.id)}
                    >
                      <i className="fas fa-trash mr-2"></i>
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="ml-1"> Delete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Place</label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Area</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="cost"
                  >
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
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="sqft"
                  >
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
                  <label className="block text-gray-700">
                    Nearby Facilities
                  </label>
                  <input
                    type="text"
                    name="nearbyFacilities"
                    value={formData.nearbyFacilities}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setEditProperty(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
