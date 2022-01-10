import React, { useEffect, useState } from "react";
import "swiper/css/bundle";
import axios from "axios";
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
  },[]);

  const getArtList=()=>{
    var url = "http://61.102.114.235:19090/support/exhibition/list";

    axios.get(url, {
      headers:{
        "X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA",
      },
      params:{
        page:0,
        size:4
      }
    }).then(res=>{
      console.log(res.data.data.list);
      const dataSet = res.data.data.list;
      setArtData(dataSet);
    }).catch(error=>{
      console.log("에러" + error);
    });
  }

  const getNoticeList=()=>{
    var url = "http://api.kcisa.kr/openapi/service/rest/meta2020/getKOCAnotice?serviceKey=7d58e468-50c5-4c98-89be-819d8fdcff3f";

    axios.get(url,{
      params:{
        numOfRows:8,
        pageNo:1
      }
    }).then(res=>{
      setNoticeData(res.data.response.body.items.item);
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
              <div className="tab-btn">
                <Link to="" className="active">진행중</Link>
                <Link to="">예정</Link>
                <Link to="">종료</Link>
              </div>

              <div className="list-btn">
                <button type="button" className="card-list-btn active" onClick={(e)=>CommonEvt.changeListTypeEvt(e.target)}>카드형식 정렬</button>
                <button type="button" className="board-list-btn" onClick={(e)=>CommonEvt.changeListTypeEvt(e.target)}>보드형식 정렬</button>
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
              <button type="button" className="txt-more-btn">More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Main;