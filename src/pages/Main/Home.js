import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { gsap, Power1, Power3 } from  "gsap";
import MainVis from "./MainVis";
import CanvasVis from "./CanvasVis";
import CardList from "../../components/CardList";
import TextList from "../../components/TextList";
import * as CommonEvt from "../../CommonEvt";
import "swiper/css/bundle";
import "./main.scss";

const Main=({type})=>{
  const [visData, setVisData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);

  useEffect(()=>{
    CommonEvt.headerStyle();
    if(type !== "canvas") {
      getData();
      getArtList();
      getNoticeList();
    }
    window.addEventListener("scroll", scrollEvt);

    return()=>{
      window.removeEventListener("scroll", scrollEvt);
    }
  },[type]);
  
  let topPosition1 = null;
  let topPosition2 = null;
  const scrollEvt=()=>{
    let scrollPosition = window.scrollY + window.innerHeight;

    $(".main-sec").each(function(){
      if(scrollPosition > $(this).offset().top + $(this).height()/2){
        gsap.to($(this).find(".sec-title"), 0.6, {top:0, opacity:1, ease:Power3.easeOut});

        if($(".list-btn").length > 0){
          if(topPosition1 === null){
            topPosition1 = $(".main-sec").eq(0).find(".list-btn").css("top").split("p")[0] - 50;
          }
          gsap.to($(this).find(".list-btn"), 0.4, {delay:0.1, top:topPosition1, opacity:1, ease:Power3.easeOut}); 
        }
        gsap.to($(this).find(".list"), 0.6, {delay:0.4, top:0, opacity:1, ease:Power1.easeOut});
        gsap.to($(this).find(".btn-wrap"), 0.6, {delay:0.7, opacity:1, ease:Power1.easeOut});
       
        if($(".notice-sec").length > 0){
          if(topPosition2 === null){
            topPosition2 = $(".notice-sec").find(".btn-wrap").css("top").split("p")[0] - 50;
          }
          gsap.to($(this).find(".btn-wrap"), 0.4, {delay:0.1, top:topPosition2, opacity:1, ease:Power3.easeOut}); 

          $(this).find(".list li").each(function(i){
            gsap.to($(this), 0.4, {delay:0.3*i, top:0, opacity:1, ease:Power1.easeOut});
          });
        }
      }
    })
  }

  const getData=()=>{
    CommonEvt.api.get("/httpApi/support/exhibition/list",{
      params:{
        page:0,
        size:3
      }
    }).then((res)=>{
      const dataSet = res.data.data.list;
      setVisData(dataSet);
    }).catch((err)=>{
      console.log(err);
    })
  }

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
    <div id="cBody" className={type === "canvas"?"main t2":"main"}>
      {
        type === "canvas"?
          <CanvasVis />
        :
          <>
            <MainVis data={visData} />
            <section className="main-sec list-sec">
              <div className="inner">
                <div className="title-div">
                  <p className="sec-title">Exhibition</p>
                </div>
                <div className="list-div">
                  <div className="list-btn">
                    <button type="button" className="card-list-btn active" onClick={(e)=>CommonEvt.changeListTypeEvt(e.target)}>카드형식 정렬</button>
                    <button type="button" className="board-list-btn" onClick={(e)=>CommonEvt.changeListTypeEvt(e.target)}>보드형식 정렬</button>
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
          </>
      }
    </div>
  )
};

export default Main;
