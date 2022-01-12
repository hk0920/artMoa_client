import React, { useEffect, useState } from 'react';
import {NavLink, Link, Outlet} from 'react-router-dom';
import $ from 'jquery';
import GnbNav from './GnbNav';
import TotalSearch from './TotalSearch';

const Header=()=>{
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll=()=>{
    setScrollPosition(window.scrollY);
    if(window.scrollY < 50){
      $("#header").removeClass("hide");
    }else{  
      if(scrollPosition < window.scrollY){
        $("#header").addClass("hide");
      }else{
        $("#header").removeClass("hide");
      }
    }
    
    if($("#cBody").hasClass("main")){
      if(window.scrollY < $(".main-vis-wrap").height()){
        $("#header").removeClass("bg-type");
      }else{
        $("#header").addClass("bg-type");
      }
    }else{
      if(window.scrollY < 100){
        $("#header").removeClass("bg-type");
        if($(".detail-wrap").length === 0) {
          $("#header").addClass("white-type");
        }
      }else{
        $("#header").addClass("bg-type");
        if($(".detail-wrap").length === 0) {
          $("#header").removeClass("white-type");
        }
      }
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", updateScroll);

    return()=>{
      window.removeEventListener("scroll", updateScroll);
    }
  });

  return (
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

      <Outlet />
    </header>
  )
}

export default Header;