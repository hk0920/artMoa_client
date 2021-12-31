import React from "react";
import TextList from "../../components/TextList";

const NoticeList=()=>{
  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg4"></div>
        <h2 className="sub-title">Notice</h2>
      </div>
      <div className="art-div">
        <div className="inner">
          <div className="list-div">
            <TextList />
            <div className="btn-wrap">
              <button type="button" className="blue-btn">More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NoticeList;