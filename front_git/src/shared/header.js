import React, { useEffect, useState } from "react";
import "../style/header.css";
import image from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import { setAuthUser,getAuthUser,removeAuthUser } from '../helper/Storage';
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
                   <Link to={'/home'}>Home </Link>
                </h3>
            </li>
            <li>
                <h3>
                   <Link to={'/about'}>About </Link>
                </h3>
            </li>
            {/* <li>
                <h3>
                  <Link to={'/contact'}>Contact Us </Link>
                </h3>
            </li> */}
            <li>
                <h3>
                  <Link to={'/account'}>My Account</Link>
                </h3>
            </li>
            <li>
                <h3>
                  <Link to={'/'} onClick={()=>removeAuthUser()}>LogOut </Link>
                </h3>
            </li>
            {
              getAuthUser().role==1&&(
                <li>
                  <h3>
                    <Link to={'/admin'} style={{color:"white",backgroundColor:"brown",borderRadius:"3px",padding:"5px"}}>Admin</Link>
                  </h3>
                </li>
              )
            }
            {
              getAuthUser().role==0&&(
                <li>
                  <h3>
                    <Link to={'reader/showSearchHistory'} style={{color:"white",backgroundColor:"brown",borderRadius:"3px",padding:"5px",fontSize:"15px"}}>Search History</Link>
                  </h3>
                </li>
              )
            }
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;