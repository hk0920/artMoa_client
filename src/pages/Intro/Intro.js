import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import * as CommonEvt from "../../CommonEvt";
import "./intro.scss";
import audio from "../../assets/video/vangogh_audio.mp3";
import Canvas from "./Canvas";

const Intro = () => {
  const [isAudio, setIsAudio] = useState(false);
  const audioPlayer = useRef();
  const [isLoad, setIsLoad] = useState(false);

  const audioPlay=(e)=>{
    setIsAudio(!isAudio?true:false);
    if(!isAudio){
      audioPlayer.current.play();
      $(e.target).addClass("play");
    }else{
      audioPlayer.current.pause();
      $(e.target).removeClass("play");
    }
  }

  const loadEvt=()=>{
    if(isLoad === false){
      $(".intro-div .sec-div.type1").removeClass("active");
      $(".intro-div .sec-div.type1").find(".txt-area p").removeClass("active");
      setTimeout(() => {
        setIsLoad(true);  
      }, 10);
    }else{
      $(".intro-div .sec-div.type1").addClass("active");
    }
  }

  const scrollEvt=()=>{
    $(".sec-div .txt-area p").each(function(){
      if($(this).offset().top <= window.scrollY + window.innerHeight){
        $(this).addClass("active");
      }else{
        $(this).removeClass("active");
      }
    })
  }
  
  useEffect(()=>{
    CommonEvt.headerStyle();
    loadEvt();
    window.addEventListener("scroll", scrollEvt);

    return()=>{
      window.removeEventListener("scroll", scrollEvt);
    }
  })

  return(
    <div id="cBody" className="pb0">
      <div className="intro-div">
        <div className="audio-div">
          <audio ref={audioPlayer} src={audio} autoPlay={isAudio} loop preload="metadata"></audio>
          <button type="button" className="audio-btn" onClick={audioPlay}>음악재생</button>
        </div>
        <section className="sec-div type1">
          <div className="bg">
            <Canvas />
          </div>
          <div className="txt-area">
            <div className="title-div">
              <p className="tit">Vincent Van Gogh</p>
              <p className="txt">1853.03.30 - 1890.07.29</p>
            </div>
            <div className="txt-div">
              <p className="txt">
                빈센트 반 고흐는 우리나라에서 가장 잘 알려진 외국 회가 중 한명이자 세계 미술사에 길이 남을 위대한 화가 중 한명이다.
              </p>
              <p className="txt">
                해바라기 15송이, 별이 빛나는 밤, 카페테라스 등 세계적인 작품을 탄생시킨 고흐는 처음부터 화가를 목표로 그림을 그렸던 사람은 아니다.
              </p>
            </div>
          </div>
        </section>
        
        <section className="sec-div type2">
          <div className="bg"></div>
          <div className="txt-area">
            <div className="title-div">
              <p className="tit">고흐가 화가가 되기까지</p>
            </div>
            <div className="txt-div">
              <p className="txt">
                고흐는 19세기 그림의 역사에서 가장 개성있는 화가라고 표현해도 과언이 아니다.
                1853년 3월 30일 네덜란드의 중산층 가정에서 태어나 어릴 때부터 고집이 많고 까칠한 성격으로 알려져 있다.
              </p>
              <p className="txt">
                고흐가 처음 그림을 그리기 시작한 것은 10대 초반으로써 당시에는 수채화를 사용해 취미로 그림을 그리는 수준이었다.
              </p>
              <p className="txt">
                이후 16살에 본격적으로 고흐가 미술에 눈을 뜨게 된 계기는 미술품 딜러였던 삼촌의 소개로 화랑에서 일하기 시작하면서 부터였다.
              </p>
              <p className="txt">
                고흐는 프랑스의 런던과 파리를 오가며 약 7년간 화랑에서 그림을 파는 딜러로 활동하면서, 수많은 화가의 다양한 그림을 접할 수 있게 되었다.<br/>
                이는 고흐가 미술적 감각 기르는데 큰 도움이 되었다.
              </p>
              <p className="txt">
                화랑을 그만두고 나서 다른 일을 하기로 한 고흐는 천직을 발견했다 생각하고 신학교에 들어가 전도사가 되기로 한다.
              </p>
              <p className="txt">
                비록 신학교에서의 성적은 낙제 수준이었지만, 전도사를 할 수 있게 된 고흐는 얼마 지나지 않아 고흐를 광신적이라고 판단한 전도위원회에서는 파면을 시키면서 또다시 실업자가 되고 만다.
              </p>
              <p className="txt">
                이 당시부터 고흐는 그림을 그리는 화가가 되겠다고 결심을 하게된다.<br/>
                고흐는 그림을 통해 사람들을 위로해 줄 수 있다고 생각한다.<br/>
                벨기에와 네덜란드 그리고 프랑스 파리를 거쳐 독자적으로 미술에 관해 배우게 된 후 드디어 프랑스 남부의 아를이라는 작은 마을에 도착하게 된다.
              </p>
            </div>
            <div className="title-div">
              <p className="tit">아를에서의 고흐</p>
            </div>
            <div className="txt-div">
              <p className="txt">
                고흐가 아를을 거쳐 생레미의 정신병원에 입원한 후 자살을 선택하기까지, 단지 2년에 걸친 이 시기에 그린 작품들이 현재 세계적으로 가장 유명한, 고흐의 걸작으로 남아있다.
              </p>
            </div>
          </div>
        </section>
        
        <section className="sec-div type3">
          <div className="bg"></div>
          <div className="txt-area">
            <div className="title-div">
              <p className="tit">고흐는 정신병자?</p>
            </div>
            <div className="txt-div">
              <p className="txt">
                고흐에 관한 이야기에서 빠질 수 없는 일이 바로 고희의 '정신병'에 관련된 부분이다.<br/>
                고흐의 괴팍한 성격과 당시 독특하다 목해 기괴했던 그림, 그리고 귓볼을 잘랐던 이야기까지 정상인이라고 생각할 수 없는 기행들이 많이 알려져 있다.<br/>
                실제로 고흐가 정신병원에 입원해 있었던건 사실이지만, 단지 '정신병원'에 입원해 있었다는 사실만으로 고흐를 정신병자라고 부르기에는 다소 무리가 있다.
              </p>
              <p className="txt">
                우선 자발적으로 병원에 입원했으며,<br/>
                병원에 머물던 약 1년동안 150점 이상의 유화를 그렸다.<br/>
                병원에서도 개인 침실을 썼다는 점 동생 테오와 주고 받은 편지에 나와있던 글은 환자라고 생각하기에 무리가 따른다.
              </p>
              <p className="txt">
                실제로 고흐는 간질과 우울증 등 병을 가지고 있는 건 사실이면, 종종 발작을 일으켜 자실을 시도한 적도 있다.<br/>
                당시 병원에서는 고흐가 그림때분에 이런일이 발생한다고 생각했지만 고흐는 반대로 그림만이 자신이 회복할 수 있는 유일한 수단이라고 말했다.
              </p>
            </div>
          </div>
        </section>
        
        <section className="sec-div type4">
          <div className="bg"></div>
          <div className="txt-area">
            <div className="title-div">
              <p className="tit">고흐 작품 특징1</p>
              <p className="txt">노란색을 선호하다</p>
            </div>
            <div className="txt-div">
              <p className="txt">
                현대에서 고흐의 그림을 평가하기로 대표적인 '인상주의'화가입니다.<br/>
                당시에는 그 어느 화풍에도 맞지 않는 그림을 그린 화가는 고흐였다.
              </p>
              <p className="txt">
                고흐의 그림 중 가장 대표적인 특징은 '노란색'과 두께감이 느껴지도록 '칠하는 것'이라고 할 수 있다.<br/>
                고흐의 가장 대표적인 작품 중 하나인 '해바라기' 이외의 많은 그림에도 노란 색깔을 많이 사용하였다.
              </p>
              <p className="txt">
                허핑턴포스트의 기사에는 고흐에 관해 <br/>
                "'반 고흐는 산업혁명 덕분에 개발된 새로운 물감, '크롬 옐로우를' 그림에 많이 사용했다."<br/>
                실제로 고흐가 동생 테오에게 보낸 편지에는 늘 '노란 물감을 사다 달라'고 적혀 있을정도 였다.
              </p>
            </div>
            <div className="title-div">
              <p className="tit">고흐 작품 특징2</p>
              <p className="txt">두꺼운 물감</p>
            </div>
            <div className="txt-div">
              <p className="txt">
                교과서나 책에 실려있는 고흐의 그림을 보면 고흐 캔버스에 물감을 바르는 것이 아니라 태우고 있는 듯한 느낌을 들게한다.<br/>
                두꺼운 물감으로 서둘러 그린 듯한 인물의 표현법과 그의 눈 앞에 있는 것들을 똑같이 재현하기 보다는 자신의 감정을 강하게 표현하기 위해서 주관에 따라 색체를 사용했다.<br/>
                고흐는 당시 화가들이 중요하게 여겼던 환영적인 공간 묘샤에 대한 압박에서 벗어나 회화가 개인의 생각이나 심리적 상태를 보다 자유롭게 표현해주는 수단이 될 수 있다는것을 인식하고 있었음을 알려준다.
              </p>
              <p className="txt">
                천재였지만 살아 생전 미치광이로 인식되었던 그를 이해할 수 없었던 세상에서, 그는 37세의 젊은 나이로 생을 마감했던 건지도 모른다.<br/>
                그러나 순수한 광기가 낳은 그의 삶과 그림이 오늘날, 그를 이해하게 만든다.<br/>
                Starry, starry night.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
};

export default Intro;