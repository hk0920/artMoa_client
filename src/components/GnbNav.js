import React from 'react';
import {NavLink} from 'react-router-dom';

const GnbNav=()=>{
  return (
    <nav className="menu-nav">
      <button className="gnb-btn">
        <strong>메뉴 열기</strong>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul className="gnb">
        <li>
          <NavLink to="/intro">소개</NavLink>
        </li>
        <li>  
          <NavLink to="/art">전시</NavLink>
        </li>
        <li>  
          <NavLink to="/faq">FAQ</NavLink>
        </li>
        <li>  
          <NavLink to="/notice">공지사항</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GnbNav;