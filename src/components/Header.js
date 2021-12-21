import React from 'react';
import {Outlet , NavLink, Link} from 'react-router-dom';
import GnbNav from './GnbNav';
import TotalSearch from './TotalSearch';

const Header=()=>{
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