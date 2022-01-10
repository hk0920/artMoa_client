import React, { useEffect } from "react";
import Accordion from "../../components/Accordion";
import * as CommonEvt from "../../CommonEvt";

const FaqWrite=()=>{
  useEffect(()=>{
    CommonEvt.headerStyle();
  })

  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg3"></div>
        <h2 className="sub-title">FAQ</h2>
      </div>
      <div className="faq-div">
        <div className="inner">
					<div className="write-form">
						
					</div>
        </div>
      </div>
    </div>
  )
};

export default FaqWrite;