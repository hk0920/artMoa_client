import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import Accordion from "../../components/Accordion";
import * as CommonEvt from "../../CommonEvt";

const FaqList=()=>{
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
          <div className="list-div">
            <div className="list-top">
              <p className="total">총 <span>13</span>개</p>
              <div className="right-div">
                <Link to="/faq/write">글쓰기</Link>
              </div>
            </div>
            <Accordion />
            <div className="btn-wrap">
              <button type="button" className="blue-btn">More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default FaqList;