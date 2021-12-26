import React from "react";
import "swiper/css/bundle";
import CardList from "../../components/CardList";

import MainVis from "./MainVis";

const Main=()=>{
  return(
    <div id="cBody">
      <MainVis />
      <section className="main-sec list-sec">
        <div className="inner">
          <CardList />
        </div>
      </section>
    </div>
  )
};

export default Main;