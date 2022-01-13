import React , { useState } from 'react';
import $ from "jquery";

const TotalSearch=(props)=>{
  const [srchStatus, setSrchStatus] = useState(false);

  const onClickSrch=(e)=>{
    const target = e.target;
    const searchTxt = $(target).prev("input[name=search-input]").val();
    setSrchStatus(srchStatus=>srchStatus?false:true);

    if(!srchStatus){
      if($(target).parents("#header").length > 0){
        $(target).parents(".search-div").addClass("on");
      }else{
        props.searchEvt(searchTxt);
      }
    }else{
      if($(target).parents("#header").length > 0){
        $(target).parents(".search-div").removeClass("on");
      }
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