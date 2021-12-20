import React from 'react';
import {Outlet , NavLink, Link} from 'react-router-dom';

const Header=()=>{
  return (
    <>
      <header id="header">
        <div className="inner">
          <h1 className="logo">
            <NavLink to="/">아트모아 로고</NavLink>
          </h1>

          <nav className="menu-nav">
            <button className="gnb-btn">메뉴 열기</button>
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

          <div className="util">
            <Link to="/login">로그인</Link>
            <Link to="/join">회원가입</Link>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default Header;