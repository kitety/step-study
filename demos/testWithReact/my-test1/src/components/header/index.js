import React from "react";
import logo from "../../assets/logo.png";
import "./styles.css";

const Header = props => {
  return (
    <header data-test="headerComponent">
      <div className="wrap">
        <div className="logo">
          <img src={logo} alt="" srcSet="" data-test="logoImg" />
        </div>
      </div>
    </header>
  );
};

export default Header;
