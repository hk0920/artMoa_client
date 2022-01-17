import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import CardList from "../../components/CardList";
import * as CommonEvt from "../../CommonEvt";

const ArtList=()=> {
	const [artData, setArtData] = useState([]);
	const [moreDataCnt, setMoreDataCnt] = useState(0);
  const dataSize = 8;
	
	useEffect(()=>{
		getData();
    CommonEvt.headerStyle();
		window.addEventListener("resize", CommonEvt.imgSizeEvt(".list .img-div"));

		return()=>{
			window.removeEventListener("resize", CommonEvt.imgSizeEvt(".list .img-div"));
		}
	},[]);

	const getData=()=>{
    CommonEvt.api.get("/httpApi/support/exhibition/list", {
			params:{
				page:moreDataCnt,
				size:dataSize
			}
    }).then(res=>{
			const dataSet = res.data.data.list;
			setArtData(artData.concat(dataSet));
			setMoreDataCnt(moreDataCnt + parseInt(dataSize));
    }).catch(error=>{
      console.log("에러" + error);
    });
	}

  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg1"></div>
        <h2 className="sub-title">Exhibition</h2>
      </div>
      <div className="art-div">
        <div className="inner">
          <div className="list-div">
            <div className="list-top">
              <div className="left-div">
                <div className="tab-btn">
                  <Link to="" className="active">진행중</Link>
                  <Link to="">예정</Link>
                  <Link to="">종료</Link>
                </div>
              </div>
              <div className="right-div">
                <div className="list-btn">
                  <button type="button" className="card-list-btn active" onClick={(e)=>CommonEvt.changeListTypeEvt(e.target)}>카드형식 정렬</button>
                  <button type="button" className="board-list-btn" onClick={(e)=>CommonEvt.changeListTypeEvt(e.target)}>보드형식 정렬</button>
                </div>
              </div>
            </div>
            <CardList data={artData}/>
            <div className="btn-wrap">
              <button type="button" className="blue-btn" onClick={getData}>More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ArtList;