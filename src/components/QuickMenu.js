import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import $ from "jquery";
import gsap, { Power3 } from 'gsap';

const QuickMenu=()=>{
  const [quickStatus, setQuickStatus] = useState(false);

	const onClickQuick=()=>{
		setQuickStatus(quickStatus=>quickStatus?false:true);
		if(!quickStatus){
			$(".quick-div").addClass("active");
		}else{
			$(".quick-div").removeClass("active");
		}
	}

	const onClickTop=()=>{
		gsap.to($("html, body"), 0.4, {scrollTop:0, ease:Power3.easeOut});
	}

	const topScroll=()=>{
    if($("#footer").offset().top <= window.scrollY + window.innerHeight){
			$(".top-btn").css({"position":"absolute", "bottom":$("#footer").outerHeight()}).fadeIn(400);
			$(".quick-div").css({"position":"absolute", "bottom":$("#footer").outerHeight(true) + $(".quick-div .quick-btn").height()});
    }else{
			$(".top-btn").css({"position":"fixed", "bottom": 0}).fadeOut(400);
			$(".quick-div").css({"position":"fixed", "bottom":"60px"});
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", topScroll);

    return()=>{
      window.removeEventListener("scroll", topScroll);
    }
  });

  return (
		<>
			<div className="quick-div">
				<button type="button" className="quick-btn" onClick={onClickQuick}>퀵메뉴 열기</button>
				<div className="quick-menu">
					<Link to="" className="pick-link"><span>추천전시</span></Link>
					<Link to="" className="notice-link"><span>공지사항</span></Link>
					<Link to="" className="faq-link"><span>FAQ</span></Link>
				</div>
			</div>
			<button type="button" className="top-btn" onClick={onClickTop}>위로 이동</button>
		</>
  )
}

export default QuickMenu;