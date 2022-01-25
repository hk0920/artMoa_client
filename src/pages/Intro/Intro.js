import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import * as CommonEvt from "../../CommonEvt";
import "./intro.scss";
import audio from "../../assets/video/vangogh_audio.mp3";

const Intro = () => {
  const [windowSize, setWindowSize] = useState({
    width:window.innerWidth,
    height:window.innerHeight
  });
  const [isAudio, setIsAudio] = useState(false);
  const audioPlayer = useRef();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  
  let resizeTimer
  let windowSizer = () => { 
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(()=>{
      setWindowSize({
        width:document.body.clientWidth,
        height:document.body.clientHeight
      });
    },10);
  }

  const canvasEvt=()=>{
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 2.5;
    contextRef.current = context;
    setCtx(context);
  }

  const startDrawing=()=>{
    console.log("시작")
    setIsDrawing(true);
  }

  const finishDrawing=()=>{
    console.log("끝")
    setIsDrawing(false);
  }

  const drawing=({nativeEvent})=>{
    console.log(nativeEvent);
    console.log("그리는중")
    const {offsetX, offsetY} = nativeEvent;
    if(ctx){
      if(!isDrawing){
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      }else{
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  }

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
  
  useEffect(()=>{
    canvasEvt();
    CommonEvt.headerStyle();
    window.addEventListener('resize', windowSizer);
  },[])

  return(
    <div id="cBody" className="pb0">
      <div className="intro-div">
        <div className="audio-div">
          <audio ref={audioPlayer} src={audio} autoPlay={isAudio} loop preload="metadata"></audio>
          <button type="button" className="audio-btn" onClick={audioPlay}>음악재생</button>
        </div>
        <section className="sec-div t1">
          <div className="bg">
            <canvas id="myCanvas" ref={canvasRef} width={windowSize.width} height={windowSize.height} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={drawing} onMouseLeave={finishDrawing}></canvas>
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
      </div>
    </div>
  )
};

export default Intro;