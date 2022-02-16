import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
import $ from "jquery";
import { gsap, Power1} from "gsap";
import moment from "moment";
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
      "delay": 6000,
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
      gsap.to($(".main-vis .swiper-slide .txt-div p"), 0 ,{delay:0, top:100, opacity:0, ease:Power1.easeOut});
      gsap.to($(".main-vis .swiper-slide .blue-btn"), 0 ,{delay:0, opacity:0, ease:Power1.easeOut});

      $(".main-vis .swiper-slide").eq(e.activeIndex).find(".txt-div p").each(function(i){
        gsap.to($(this), 0.4 ,{delay:0.3*i,top:0, opacity:1, ease:Power1.easeOut});
      });
      gsap.to($(".main-vis .swiper-slide").eq(e.activeIndex).find(".blue-btn"), 0.4 ,{delay:0.6,opacity:1, ease:Power1.easeOut});
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

  const loadEvt=()=>{
    resizeEvt();

    $(".main-vis").addClass("active");
    gsap.to($(".main-vis .swiper-slide").eq(0).find(".img-div"), 0.6, {delay:0.4, left:0, opacity:1, ease:Power1.easeOut, onComplete:function(){
      $(".main-vis .swiper-slide").eq(0).find(".txt-div p").each(function(i){
        gsap.to($(this), 0.4 ,{delay:0.3*i,top:0, opacity:1, ease:Power1.easeOut});
      });
      gsap.to($(".main-vis .swiper-slide").eq(0).find(".blue-btn"), 0.4 ,{delay:0.6,opacity:1, ease:Power1.easeOut});
      gsap.to($(".main-vis-wrap .next-info, .main-vis .swiper-button-prev, .main-vis .swiper-button-next"), 0.6, {delay:0.6, opacity:1, ease:Power1.easeOut});
    }});
    
    
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
    loadEvt();
    window.addEventListener('resize', windowSizer);

    return()=>{
      window.removeEventListener("resize", windowSizer);
    }
  })
  
  return(
    <div className="main-vis-wrap">
      {data.length > 0}{
        <>
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
                        <p className="txt">{moment(item.startDate.toString()).format("YYYY.MM.DD")} - {moment(item.endDate.toString()).format("YYYY.MM.DD")}</p>
                        <Link to={{
                          pathname: "/art/detail/" + item.seq
                        }} className="blue-btn">About Us</Link>
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
        </> 
      }
    </div>
  )
};

export default MainVis;