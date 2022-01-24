import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
import $ from "jquery";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import * as CommonEvt from "../../CommonEvt";

const MainVis=(props)=> {
  const data = props.data;
  const [swiper, setSwiper] = useState(null);
  const [windowSize, setWindowSize] = useState({width:window.innerWidth});
  const [number, setNumber] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);

  SwiperCore.use([EffectFade,Navigation,Autoplay]);

  const swiperPrams = {
    effect:"fade",
    autoplay:{
      "delay": 10000,
      "disableOnInteraction": false
    },
    loop:true,
    navigation:true,
    onSwiper:setSwiper,
    onInit:(e)=>{
      resizeEvt();
      numberChange(e.realIndex);
      activeIdxEvt(e.realIndex);
    },
    onSlideChange:(e)=> {
      numberChange(e.realIndex);
      activeIdxEvt(e.realIndex);
    }
  }

  const numberChange=(idx)=>{
    idx = idx+1;
    if(idx === data.length){
      idx = 0;
    }
    setNumber(idx);
  }

  const activeIdxEvt=(idx)=>{
    idx = idx+1;
    if(idx < 10) {
      idx = "0" + idx;
    }
    setActiveIdx(idx);
  }


  const resizeEvt=()=>{
    if(data.length > 0){
      CommonEvt.imgSizeEvt(".main-vis .swiper-content .img-div");

      var nextInfoPosition = $(".main-vis .swiper-content").offset().top + $(".main-vis .swiper-content").height();
      $(".main-vis-wrap .next-info").css("top", nextInfoPosition);
      $(".main-vis .swiper-button-prev").css("top", nextInfoPosition);
      $(".main-vis .swiper-button-next").css("top", nextInfoPosition + $(".main-vis .swiper-button-next").height());
    }
  }
  
  let resizeTimer
  let windowSizer = () => { 
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(()=>{
      setWindowSize({width:document.body.clientWidth});
      resizeEvt();
    },10);
  }

  useEffect(()=>{
    resizeEvt();
    window.addEventListener('resize', windowSizer);

    return()=>{
      window.removeEventListener("resize", windowSizer);
    }
  })
  
  return(
    <div className="main-vis-wrap">
      <Swiper {...swiperPrams} ref={setSwiper} className="main-vis" >
          {
            data.map((item, i)=>(
              <SwiperSlide key={i}>
                <div className="swiper-content">
                  <div className="img-div">
                    <img src={item.thumbnail} alt="" />
                  </div>
                  <div className="txt-div">
                    <p className="tit">{item.title}</p>
                    <p className="txt">{item.startDate} - {item.endDate}</p>
                    <Link to="" className="blue-btn">About Us</Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
      </Swiper>
      <div className="next-info">
        <p className="txt">Next</p>
        {
          data.length > 0?
            data.length>1?
              <p className="tit">{data[number].title}</p>
            :
              <p className="txt2">전시/공연이 없습니다.</p>
          :""
        }
      </div>
      <div className="left-util">
        <p className="activeIdx">{activeIdx}</p>
      </div>
    </div>
  )
};

export default MainVis;