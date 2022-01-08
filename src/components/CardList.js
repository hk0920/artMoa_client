import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import $ from "jquery";
import moment from "moment";

const imgSizeEvt=()=>{
	$(".list .img-div").each(function(){
		if($(this).find("img").width() * $(this).height() < $(this).find("img").height() * $(this).width()){
			$(this).find("img").width($(this).width());
			$(this).find("img").height("auto");
		}else{
			$(this).find("img").width("auto");
			$(this).find("img").height($(this).height());
		}
	});
}

const CardList=(data)=> {
	//console.log(data);
	useEffect(()=>{
		window.addEventListener("resize", imgSizeEvt());
		//console.log(data);
	},[])

	const changeListTypeEvt=(target)=>{
		$(target).siblings().removeClass("active");
		$(target).addClass("active");

		const str = target.className.split("-");

		if(str[0] === "card"){
			$(target).parents(".list-div").find(".list").removeClass("board-type").addClass("card-type");
		}else{
			$(target).parents(".list-div").find(".list").removeClass("card-type").addClass("board-type");
		}
		imgSizeEvt();
	}
  
	const seq = "";
	const title = "";
	const img = "";
	const startDate = "";
	const endDate = "";

	return(
		<div className="list-div">
			<div className="list-top">
				<div className="tab-btn">
					<Link to="" className="active">진행중</Link>
					<Link to="">예정</Link>
					<Link to="">종료</Link>
				</div>

				<div className="list-btn">
					<button type="button" className="card-list-btn active" onClick={(e)=>this.changeListTypeEvt(e.target)}>카드형식 정렬</button>
					<button type="button" className="board-list-btn" onClick={(e)=>this.changeListTypeEvt(e.target)}>보드형식 정렬</button>
				</div>
			</div>
			<ul className="list card-type">
				{
					// data.map((item, idx)=>(
					// 	<li key={idx}>
					// 		{
					// 			item.children.map((i)=>{
					// 				if(i.name === "seq") {
					// 					this.seq = i.value
					// 				}
					// 				if(i.name === "title") {
					// 					this.title = i.value
					// 				}
					// 				if(i.name === "thumbnail") {
					// 					this.img = i.value
					// 				}
					// 				if(i.name === "startDate") {
					// 					this.startDate = i.value
					// 				}
					// 				if(i.name === "endDate") {
					// 					this.endDate = i.value
					// 				}
					// 			})
					// 		}
					// 		<Link to="/art/detail/" state={{seq:this.seq,}}>
					// 			<div className="img-div">
					// 				<img src={this.img} alt="" />
					// 			</div>
					// 			<div className="txt-div">
					// 				<p className="tit">{this.title}</p>
					// 				<p className="txt">{moment(this.startDate).format("YYYY.MM.DD")} ~ {moment(this.endDate).format("YYYY.MM.DD")}</p>
					// 			</div>
					// 		</Link>
					// 	</li>
					// ))
				}
			</ul>
			<div className="btn-wrap">
				<button type="button" className="blue-btn">More</button>
			</div>
		</div>	
	)
};

export default CardList;