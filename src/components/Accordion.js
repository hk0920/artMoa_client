import React from "react";
import $ from "jquery";
import { Link, useLocation } from "react-router-dom";

const Accordion=({data})=>{
	const dataArr = data;
	const location = useLocation();
	console.log(location.pathname === "/faq");

	const onClick=(e)=>{
		const target = e.target;
		if(target.className === "tit" || target.className === "accordion-btn"){
			const accorBtn = $(target).parents("li");
			if(!accorBtn.hasClass("active")){
				accorBtn.siblings().removeClass("active");
				accorBtn.addClass("active");
			}else{
				accorBtn.removeClass("active");
			}
		}
	}

  return(
		<ul className="accordion-list">
			{
				dataArr.map((item)=>(
					<li key={item.id}>
						<button type="button" className="accordion-btn" onClick={onClick}>
							<p className="tit">{item.title}</p>
						</button>
						<div className="content-div">
							{item.content}
								
							{
								location.pathname === "/faq"?		
									<div className="btn-wrap">
										<Link to="/faq/update" state={{idx:item.id}} className="blue-btn sm">수정</Link>
										<button type="button" className="blue-btn sm">삭제</button>
									</div>
								:""
							}
						</div>
					</li>
				))
			}
		</ul>
  )
};

export default Accordion;