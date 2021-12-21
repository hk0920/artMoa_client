import React from "react";
import "swiper/css/bundle";
import CardList from "../../components/CardList";

import MainVis from "./MainVis";

const Main = () => {
  return(
    <>
      <MainVis />
      <section className="main-sec list-sec">
        <div className="inner">
          <CardList />
        </div>
      </section>
    </>
  )
};

export default Main;