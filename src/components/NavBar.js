import React, { useState } from "react";
import "./NavBar.css";
import {
  AiOutlineMenu,
  AiOutlineDashboard,
  BsPeople,
  AiOutlineSetting,
  IoCalendarNumberOutline,
} from "react-icons/all";

import { Link } from "react-router-dom";

function NavBar() {
  const [navSlide, setSlide] = useState(false);

  const slideNavHandler = () => {
    setSlide(!navSlide);
  };

  return (
    <>
      <nav id='navbar' className={`${navSlide ? "navbar-slide" : ""}`}>
        <ul className='navbar-top'>
          <li className='navbar-slide-toggle' onClick={slideNavHandler}>
            <AiOutlineMenu className='navbar-icons' />
          </li>
          <li className='navbar-logo'>
            <Link to='/' className='navbar-link'>
              <img src='/logo.png' alt='logo' />
              <div
                className={`navbar-icons-title ${
                  navSlide ? "navbar-title-slide" : ""
                }`}>
                <div
                  className='jap'
                  style={{ color: "#ff4040", marginRight: "5px" }}>
                  Japonais
                </div>

                <div className='gym'>Gym</div>
              </div>
            </Link>
          </li>
        </ul>
        <ul className='navbar-middle'>
          <li>
            <Link to='/' className='navbar-link'>
              <AiOutlineDashboard className='navbar-icons' />
              <p
                className={`navbar-icons-title ${
                  navSlide ? "navbar-title-slide" : ""
                }`}>
                Tableau de bord
              </p>
            </Link>
          </li>
          <li>
            <Link to='/users' className='navbar-link'>
              <BsPeople className='navbar-icons' />
              <p
                className={`navbar-icons-title ${
                  navSlide ? "navbar-title-slide" : ""
                }`}>
                Les abonnées
              </p>
            </Link>
          </li>
          <li>
            <Link to='/calendar' className='navbar-link'>
              <IoCalendarNumberOutline className='navbar-icons' />
              <p
                className={`navbar-icons-title ${
                  navSlide ? "navbar-title-slide" : ""
                }`}>
                Calandrier
              </p>
            </Link>
          </li>
        </ul>
        <ul className='navbar-bottom'>
          <Link to='/settings' className='navbar-link'>
            <AiOutlineSetting className='navbar-icons' />
            <p
              className={`navbar-icons-title ${
                navSlide ? "navbar-title-slide" : ""
              }`}>
              Les paramétres
            </p>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
