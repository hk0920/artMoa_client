import React , { useState } from 'react';
import $ from "jquery";

const TotalSearch=()=>{
  const [srchStatus, setSrchStatus] = useState(false);

  const onClickSrch=(e)=>{
    setSrchStatus(srchStatus=>srchStatus?false:true);
    if(srchStatus){
      $(".search-div").removeClass("on");
    }else{
      $(".search-div").addClass("on");
    }
  }

  return (
    <div className="search-div">
      <input type="text" id="searchInput" name="search-input" placeholder="입력"/>
      <button type="button" className="search-btn" onClick={onClickSrch}>검색</button>
    </div>
  )
}

export default TotalSearch;