import React from "react";

const PaymentButton = ({ amount, onSuccess, onError }) => {
  const handlePayment = () => {
    // Call PayPal SDK to initiate payment
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            onSuccess(details); // Pass payment details to onSuccess callback
          });
        },
        onError: function (err) {
          onError(err); // Pass error details to onError callback
        },
      })
      .render("#paypal-button-container");
  };

  return (
    <div id="paypal-button-container">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={handlePayment}
      >
        Pay with PayPal
      </button>
    </div>
  );
};

export default PaymentButton;
