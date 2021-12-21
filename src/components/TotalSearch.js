import React from 'react';

const TotalSearch=()=>{
  return (
    <div className="search-div">
      <input type="text" id="searchInput" name="search-input" placeholder="입력"/>
      <button type="button" className="search-btn">검색</button>
    </div>
  )
}

export default TotalSearch;