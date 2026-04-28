import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="navbar">
      <div className="navbar-logo">BABA Admin</div>
      <button onClick={() => setToken("")} className="btn btn-outline">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
