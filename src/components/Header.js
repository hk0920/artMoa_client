import React, { useEffect, useState } from 'react';
import {Outlet , NavLink, Link} from 'react-router-dom';
import $ from 'jquery';
import GnbNav from './GnbNav';
import TotalSearch from './TotalSearch';

const Header=()=>{
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll=()=>{
    setScrollPosition(window.scrollY);
    if(scrollPosition < window.scrollY){
      $("#header").addClass("hide");
    }else{
      $("#header").removeClass("hide");
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", updateScroll);

    return()=>{
      window.removeEventListener("scroll", updateScroll);
    }
  });

  return (
    <>
      <header id="header">
        <h1 className="logo">
          <NavLink to="/">아트모아 로고</NavLink>
        </h1>
        
        <GnbNav />
        
        <div className="left-util">
          <Link to="/login">로그인</Link>
          <Link to="/join">회원가입</Link>
        </div>

        <TotalSearch />
      </header>

      <Outlet />
    </>
  )
}

export default Header;