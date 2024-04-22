import { createBrowserRouter } from "react-router-dom";
import Signup from "../components/SignUp";
import ProductListing from "../components/ProductListing";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListing />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chechkoutlsdjgffgbsdvcvbzxjzxvjbkdsdkbgsjfsdbvbkgdsgakdsfsdkdsgffdksdcbxnmbkcgsdfdbsfmdmnfdms",
    element: <App/>
  }
]);

export default router;
