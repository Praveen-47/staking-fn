import React from "react";
import logo from "../../assets/images/BLOCKx.png";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <button className="button__main">Connect</button>
    </div>
  );
}

export default Header;
