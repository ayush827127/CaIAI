import "./App.css";

import Checkout from "./components/Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const initialOptions = {
    "client-id": import.meta.env.VITE_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Checkout />
    </PayPalScriptProvider>
  );
}

export default App;
