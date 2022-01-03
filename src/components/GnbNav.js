import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import $ from "jquery";
import gsap, { Power3 } from 'gsap';

const GnbNav=()=>{
  const [gnbStatus, setGnbStatus] = useState(false);

  const onClickGnb=(e)=>{
    if(!gnbStatus){
      setGnbStatus(true);
      $("#header").addClass("gnb-on");
      gsap.to($(".gnb"), 0.6, {left:0, ease:Power3.easeOut});
      
      $(document).click(function(e){
        if(e.target.className !== "gnb" && e.target.className !== "gnb-btn on"){
          setGnbStatus(false);
          $("#header").removeClass("gnb-on");
          gsap.to($(".gnb"), 0.6, {left:-$(".gnb").outerWidth(), ease:Power3.easeOut});
        }
      })
    }else{
      setGnbStatus(false);
      $("#header").removeClass("gnb-on");
      gsap.to($(".gnb"), 0.6, {left:-$(".gnb").outerWidth(), ease:Power3.easeOut});
    }
  }

  return (
    <nav className="menu-nav">
      <p>{gnbStatus}</p>
      <button className={!gnbStatus?'gnb-btn':'gnb-btn on'} onClick={onClickGnb}>
        <strong>메뉴 열기</strong>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul className="gnb">
        <li>
          <NavLink to="/intro">About us</NavLink>
        </li>
        <li>  
          <NavLink to="/art">Exhibition</NavLink>
        </li>
        <li>  
          <NavLink to="/faq">FAQ</NavLink>
        </li>
        <li>  
          <NavLink to="/notice">Notice</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GnbNav;