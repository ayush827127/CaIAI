import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loading from "./Loading";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Checkout = () => {
  //   const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const location = useLocation();
  const { userEmail, userName, productPrice, productName, quantity } =
    location.state;
    const navigate = useNavigate();
    const {sendPurchaseEmail} = useAuth();

  const isPending = false;
  const [discountApplied, setDiscountApplied] = useState(false); // Track if discount applied
  const [couponCode, setCouponCode] = useState(""); // State for coupon code input
  const [totalAmount, setTotalAmount] = useState(productPrice); // Initialize with default amount

  // Function to apply discount coupon
  const applyCoupon = () => {
    const coupons = {
      SAVE10: 0.1, // 10% discount
      SAVE20: 0.2, // 20% discount
      // Add more coupons here if needed
    };

    // Check if entered coupon code exists in the predefined list
    if (coupons.hasOwnProperty(couponCode)) {
      const discount = coupons[couponCode];
      const discountedAmount =
        parseFloat(productPrice) - parseFloat(productPrice) * discount;
      setTotalAmount(discountedAmount.toString());
      setDiscountApplied(true);
    } else {
      alert("Invalid coupon code");
      setCouponCode("");
    }
  };

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount, // Use updated total amount after discount
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
      sendPurchaseEmail(userEmail,userName);
      navigate("/");
    }).catch((error)=>{
        alert("Please try again later!");
        console.log(error);
    })
  };

  return (
    <div className="checkout bg-gray-100 p-8 rounded-lg shadow-md  flex flex-col text-center">
      {isPending ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Payment Section</h1>
          <hr className="h-2 bg-black" />
          <div className=" flex justify-around text-start">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">User Details</h2>
              <p className="text-gray-700">Name: {userName}</p>
              <p className="text-gray-700">Email: {userEmail}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Product Details</h2>
              <p className="text-gray-700">Product Name: {productName}</p>
              <p className="text-gray-700">Price: {productPrice}</p>
              <p className="text-gray-700">Quantity: {quantity}</p>
            </div>
          </div>

          <div className="flex justify-around my-4 mx-6 items-center text-start">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Discount</h2>
              <p className="mb-4">
                Discount Amount: {discountApplied ? "10%" : "0%"}
              </p>
              <p className="text-xl font-semibold">
                Total Payable Amount: ${totalAmount}
              </p>
            </div>
            <div className="items-end ">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="mb-4 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={applyCoupon}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
              >
                Apply Coupon
              </button>
            </div>
          </div>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
          {discountApplied && (
            <p className="text-green-600 mt-4">Coupon applied successfully!</p>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
