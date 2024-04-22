import React from "react";
import { FaRegUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Modal from "./Modal";
import Profile from "./Profile";

const Navbar = () => {
    const { user, loading } = useAuth();

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 left-0 right-0 z-10 flex items-center justify-between">
      <div className="flex items-center">
        <img
          className="h-8 mr-2"
          src="https://via.placeholder.com/50x50"
          alt="Logo"
        />
        <span className="text-white text-lg font-semibold">CaIAI</span>
      </div>
      <div className="mx-5">
         {/* Profile menu */}
         {user ? <Profile user={user}/> : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-green rounded-full px-6  flex items-center gap-2"
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
      </div>
    </nav>
  );
};

export default Navbar;
