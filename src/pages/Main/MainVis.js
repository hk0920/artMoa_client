import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from "swiper/react";
import $ from "jquery";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import SwiperCore, {
  Autoplay,
  EffectFade,Navigation
} from "swiper";

SwiperCore.use([EffectFade,Navigation,Autoplay]);

const data = [
  {
    id:0,
    title:"살바도르 달리",
    text:"스페인의 초현실주의 거장 '살바도르 달리(Salvador Dali)'의 국내 최초 대규모 회고전",
    image:"./main-vis1.jpg" 
  },
  {
    id:1,
    title:"라이프 앤 조이",
    text:"위대한 거장 앙리 마티스가 온다! 마티스가 그린 삶과 예술, 그 기쁨 속으로",
    image:"https://modo-phinf.pstatic.net/20211211_38/1639234523343rHDEF_JPEG/mosa4Btrdb.jpeg" 
  },
  {
    id:2,
    title:"따뜻한 휴일의 기록",
    text:"따뜻한 빛과 피사체가 균형을 이루는 순간",
    image:"http://www.groundseesaw.co.kr/data/main/file1_1622428115l0o94ushqo.jpg" 
  }
]

const imgSizeEvt=()=>{
  console.log("왜 안돼!!!");
  $(".main-vis .swiper-content img").on("load", function(){
    console.log("이미지 로드 후");
    $(".main-vis .swiper-content").each(function(){
      const target = $(this).find(".img-div");
      console.log($(target).height(), $(target).width());
      if(target.find("img").width() * target.height() < target.find("img").height() * target.width()){
        target.find("img").width("100%");
        target.find("img").height("auto");
      }else{
        target.find("img").width("auto");
        target.find("img").height("100%");
      }
    });
  });
}

const MainVis=()=> {
  const [number, setNumber] = useState(1);
  const [activeIdx, setActiveIdx] = useState(1);

  const numberChange=(idx)=>{
    if(idx > $(".swiper-slide").length-3){
      idx = idx-($(".swiper-slide").length-2);
    }
    setNumber(idx);
  }

  const activeIdxEvt=(idx)=>{
    if(idx > $(".swiper-slide").length-2){
      idx = idx-($(".swiper-slide").length-2);
    }else if(idx === 0) {
      idx = $(".swiper-slide").length-2;
    }
    
    if(idx < 10) {
      setActiveIdx("0" + idx);
    }else{
      setActiveIdx(idx);
    }
  }

  const resizeEvt=()=>{
    var nextInfoPosition = $(".main-vis .swiper-content").offset().top + $(".main-vis .swiper-content").height();
    $(".main-vis-wrap .next-info").css("top", nextInfoPosition);
    $(".main-vis .swiper-button-prev").css("top", nextInfoPosition);
    $(".main-vis .swiper-button-next").css("top", nextInfoPosition + $(".main-vis .swiper-button-next").height());
    imgSizeEvt();
  }

  useEffect(()=>{
    resizeEvt();
    window.addEventListener("resize", resizeEvt);
  },[])
  
  return(
    <div className="main-vis-wrap">
      <Swiper 
        className="main-vis"
        effect={"fade"}
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false
        }}
        loop={true}
        navigation={true}
        onInit={(e)=>{
          activeIdxEvt(e.activeIndex);
        }}
        onSlideChange={(e)=> {
          numberChange(e.activeIndex);
          activeIdxEvt(e.activeIndex);
        }} >
          {data.map((dt, i)=>(
            <SwiperSlide key={i}>
              <div className="swiper-content">
                <div className="img-div">
                  <img src={dt.image} alt="" />
                </div>
                <div className="txt-div">
                  <p className="tit">{dt.title}</p>
                  <p className="txt">{dt.text}</p>
                  <Link to="" className="blue-btn">About Us</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="next-info">
        <p className="txt">Next</p>
        <p className="tit">{data[number].title}</p>
      </div>
      <div className="left-util">
        <p className="activeIdx">{activeIdx}</p>
      </div>
    </div>
  )
};

export default MainVis;