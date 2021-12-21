import React from "react";
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from "swiper/react";
import jquery from "jquery";
import $ from "jquery";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./main.scss";

import SwiperCore, {
  EffectFade,Pagination,Navigation
} from "swiper";

SwiperCore.use([EffectFade,Pagination,Navigation]);

const data = [
  {
    id:1,
    title:"살바도르 달리",
    text:"스페인의 초현실주의 거장 '살바도르 달리(Salvador Dali)'의 국내 최초 대규모 회고전",
    image:"https://ddp.or.kr/usr/upload/board_thumb/zboardphotogallery0/20211210044757074.jpg" 
  },
  {
    id:2,
    title:"라이프 앤 조이",
    text:"위대한 거장 앙리 마티스가 온다! 마티스가 그린 삶과 예술, 그 기쁨 속으로",
    image:"https://modo-phinf.pstatic.net/20211211_38/1639234523343rHDEF_JPEG/mosa4Btrdb.jpeg" 
  },
  {
    id:3,
    title:"따뜻한 휴일의 기록",
    text:"따뜻한 빛과 피사체가 균형을 이루는 순간",
    image:"http://www.groundseesaw.co.kr/data/main/file1_1622428115l0o94ushqo.jpg" 
  }
]

class MainVis extends React.Component {
  componentDidMount(){
    $(window).resize(function(){
      var nextInfoPosition = $(".main-vis .swiper-slide").css("padding-bottom").replace("px", "") - $(".main-vis-wrap .next-info").outerHeight();
      $(".main-vis-wrap .next-info").css("bottom", nextInfoPosition);
    }).resize();
  }
  
  render(){
    return(
      <div className="main-vis-wrap">
        <Swiper 
          effect={"fade"}
          pagination={{"type": "fraction"}} 
          navigation={true}
          className="main-vis">
            {data.map((dt)=>(
              <SwiperSlide>
                <div className="txt-div">
                  <p className="tit">{dt.title}</p>
                  <p className="txt">{dt.text}</p>
                  <Link to="" className="more-btn">About Us</Link>
                </div>
    
                <div className="img-div">
                  <img src={dt.image} alt="" />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="next-info">
          <p className="txt">Next</p>
          <p className="tit">{data[0].title}</p>
        </div>
      </div>
    )
  }
};

export default MainVis;