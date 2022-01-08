import React from "react";
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from "swiper/react";
import $ from "jquery";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import SwiperCore, {
  EffectFade,Navigation
} from "swiper";

SwiperCore.use([EffectFade,Navigation]);

const data = [
  {
    id:0,
    title:"살바도르 달리",
    text:"스페인의 초현실주의 거장 '살바도르 달리(Salvador Dali)'의 국내 최초 대규모 회고전",
    image:"https://ddp.or.kr/usr/upload/board_thumb/zboardphotogallery0/20211210044757074.jpg" 
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
  $(".main-vis .img-div").each(function(){
		if($(this).find("img").width() * $(this).height() < $(this).find("img").height() * $(this).width()){
			$(this).find("img").width($(this).width());
			$(this).find("img").height("auto");
		}else{
			$(this).find("img").width("auto");
			$(this).find("img").height($(this).height());
		}
	});
}

class MainVis extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      number:1,
      activeIdx:1
    };

    this.numberChange = this.numberChange.bind(this);
    this.activeIdxEvt = this.activeIdxEvt.bind(this);
  }

  numberChange(idx){
    if(idx < data.length -1){
      this.setState({
        number:idx + 1
      });
    }else{
      this.setState({
        number:0
      });
    }
  }

  activeIdxEvt(idx){
    if(idx < 10) {
      if(idx == $(".swiper-slide").length-1){
        idx = 1;
      }
      this.setState({
        activeIdx:'0' + idx
      });
    }else{
      this.setState({
        activeIdx:idx
      });
    }
  }

  componentDidMount(){
    $(window).resize(function(){
      var nextInfoPosition = $(".main-vis .swiper-slide").css("padding-bottom").replace("px", "") - $(".main-vis-wrap .next-info").outerHeight();
      $(".main-vis-wrap .next-info").css("bottom", nextInfoPosition);
      imgSizeEvt();
    }).resize();
  }
  
  render(){
    return(
      <div className="main-vis-wrap">
        <Swiper 
          className="main-vis"
          effect={"fade"}
          autoplay={{
            "delay": 2500,
            "disableOnInteraction": false
          }}
          loop={true}
          navigation={true}
          onInit={(e)=>{
            this.activeIdxEvt(e.activeIndex);
          }}
          onSlideChange={(e)=> {
            this.numberChange(e.activeIndex);
            this.activeIdxEvt(e.activeIndex);
          }} >
            {data.map((dt)=>(
              <SwiperSlide key={dt.id}>
                <div className="img-div">
                  <img src={dt.image} alt="" />
                </div>

                <div className="txt-div">
                  <p className="tit">{dt.title}</p>
                  <p className="txt">{dt.text}</p>
                  <Link to="" className="blue-btn">About Us</Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="next-info">
          <p className="txt">Next</p>
          <p className="tit">{data[this.state.number].title}</p>
        </div>
        <div className="left-util">
          <p className="activeIdx">{this.state.activeIdx}</p>
        </div>
      </div>
    )
  }
};

export default MainVis;