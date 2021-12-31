import React from "react";
import CardList from "../../components/CardList";

const ArtList=()=>{
  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg1"></div>
        <h2 className="sub-title">Exhibition</h2>
      </div>
      <div className="art-div">
        <div className="inner">
          <CardList />
        </div>
      </div>
    </div>
  )
};

export default ArtList;