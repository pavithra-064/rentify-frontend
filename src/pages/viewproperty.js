import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../component/navigation";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        // Fetch property details
        const response = await axios.get(
          `http://localhost:5000/api/viewproperty/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPropertyDetails(response.data.property[0]);
        setSellerDetails(response.data.seller[0]);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const handleInterest = async () => {
    const response = await axios.post(
      `http://localhost:5000/api/interested/${propertyId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) alert("Details sent to Mail");
  };
  return (
    <div>
      <Navigation />
      <main className="container mx-auto p-8">
        {propertyDetails && (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-64 object-cover object-center"
              src={propertyDetails.image}
              alt={propertyDetails.title}
            />
            <div className="p-6">
              <h2 className="text-3xl text-gray-800 font-bold mb-2">
                {propertyDetails.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {propertyDetails.description}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2">
                  {propertyDetails.bedrooms} Bedrooms
                </span>
                <span className="text-gray-600 mr-2">
                  {propertyDetails.bathrooms} Bathrooms
                </span>
                <span className="text-gray-600">
                  {propertyDetails.sqft} sqft
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2">
                  Rs. {propertyDetails.cost}
                </span>
                <span className="text-gray-600">{propertyDetails.area}</span>
              </div>
              <hr className="my-4" />
              <h3 className="text-xl text-gray-800 font-semibold mb-2">
                Seller Details
              </h3>
              {sellerDetails && (
                <div>
                  <p className="text-gray-600 mb-2">
                    Name:{" "}
                    {sellerDetails.firstName + " " + sellerDetails.lastName}
                  </p>

                  <p className="text-gray-600">
                    Phone: {sellerDetails.phoneNumber.slice(0, 4)}******
                  </p>
                </div>
              )}
              <button
                onClick={handleInterest}
                className="mt-3 p-3 bg-cyan-950 text-white rounded-md"
              >
                I'm Interested
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertyDetails;
