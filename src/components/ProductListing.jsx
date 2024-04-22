import productImage from "/productImage.jpg";
import React from "react";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import App from "../App";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleBuyButton = () => {
  if (user) {
         // Redirect to checkout with product details if user is logged in
         navigate("/chechkoutlsdjgffgbsdvcvbzxjzxvjbkdsdkbgsjfsdbvbkgdsgakdsfsdkdsgffdksdcbxnmbkcgsdfdbsfmdmnfdms", {
          state: {
            userEmail: user.email,
            userName: user.displayName,
            productPrice: "1", // Hardcoded for now, replace with actual price
            productName: "Camera", // Hardcoded for now, replace with actual product name
            quantity: 1, // Assuming quantity is always 1 for now
          },
        });
    } else {
      alert("Please login to buy the product");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NavBar  */}
      <Navbar />

      {/* Product Listing */}
      <div className="pt-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full my-6">
          <img
            className="object-cover w-full h-64 mb-4 rounded-lg"
            src={productImage}
            alt="Product"
          />
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Camera</h2>
            <p className="text-gray-600">
            Digital Camera, FHD 1080P Camera, Digital Point and Shoot Camera with 16X Zoom Anti Shake, Compact Small Camera for Boys Girls Kids.
            </p>
            <p className="text-gray-700 font-semibold mt-2">$1</p>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleBuyButton}
          >y
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
