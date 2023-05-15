import React, { Component } from "react";
import "../style/header.css";
import image from "../assets/images/logo.png"
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src ={image} alt ="logo" className="logo-img"/>
        </div>
        <nav className="nav">
          <ul>
            <li>
                <h3>
                   <Link to={'/'}>Home </Link>
                </h3>
            </li>
            <li>
                <h3>
                   <Link to={'/login'}>Login </Link>
                </h3>
              </li>
            <li>
                <h3>
                   <Link to={'/about'}>About </Link>
                </h3>
            </li>
            <li>
                <h3>
                  <Link to={'/contact'}>Contact Us </Link>
                </h3>
            </li>
            <li>
                <h3>
                  <Link to={'/login'}>LogOut </Link>
                </h3>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;
