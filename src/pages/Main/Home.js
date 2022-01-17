import React, { useEffect, useState } from "react";
import "swiper/css/bundle";
import MainVis from "./MainVis";
import CardList from "../../components/CardList";
import TextList from "../../components/TextList";
import * as CommonEvt from "../../CommonEvt";
import "./main.scss";
import { Link } from "react-router-dom";

const Main=()=>{
  const [artData, setArtData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);

  useEffect(()=>{
    CommonEvt.headerStyle();
    getArtList();
    getNoticeList();
  },[]);

  const getArtList=()=>{
    CommonEvt.api.get("/httpApi/support/exhibition/list", {
      params:{
        page:0,
        size:4
      }
    }).then(res=>{
      const dataSet = res.data.data.list;
      setArtData(dataSet);
    }).catch(error=>{
      console.log("에러" + error);
    });
  }

  const getNoticeList=()=>{
    CommonEvt.api.get("/httpApi/support/notice/list",{
      params:{
        page:0,
        size:4
      }
    }).then(res=>{
      const dataSet = res.data.data.list;
      setNoticeData(dataSet);
    }).catch(error=>{
      console.log(error);
    })
  }

  return(
    <div id="cBody" className="main">
      <MainVis />
      <section className="main-sec list-sec">
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
            <CardList data={artData} />
            <div className="btn-wrap">
              <Link to="/art" className="blue-btn">More</Link>
            </div>
          </div>	
        </div>
      </section>
      <section className="main-sec notice-sec">
        <div className="inner">
          <div className="title-div">
            <p className="sec-title">Notice</p>
          </div>
          <div className="list-div">
            <TextList data={noticeData}/>
            <div className="btn-wrap">
              <Link to="/notice" className="txt-more-btn">More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Main;
