import React from "react";
import $ from "jquery";

const Accordion=({data})=>{
	const dataArr = data;

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
						<div className="content-div">{item.content}</div>
					</li>
				))
			}
		</ul>
  )
};

export default Accordion;