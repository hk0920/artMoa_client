import React from "react";
import "swiper/css/bundle";
import Accordion from "../../components/Accordion";

const FaqList=()=>{
  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg3"></div>
        <h2 className="sub-title">FAQ</h2>
      </div>
      <div className="art-div">
        <div className="inner">
          <Accordion />
        </div>
      </div>
    </div>
  )
};

export default FaqList;