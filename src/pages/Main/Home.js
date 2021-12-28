import React from "react";
import "swiper/css/bundle";
import CardList from "../../components/CardList";
import NoticeList from "../../components/NoticeList";
import MainVis from "./MainVis";
import "./main.scss";

const Main=()=>{
  return(
    <div id="cBody" className="main">
      <MainVis />
      <section className="main-sec list-sec">
        <div className="inner">
          <CardList />
        </div>
      </section>
      <section className="main-sec notice-sec">
        <div className="inner">
          <div className="title-div">
            <p className="sec-title">Notice</p>
          </div>
          <NoticeList />
        </div>
      </section>
    </div>
  )
};

export default Main;