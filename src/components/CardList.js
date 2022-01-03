import React from "react";
import {Link} from 'react-router-dom';
import $ from "jquery";

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

class CardList extends React.Component {
  constructor(props){
		super(props);

		this.changeListTypeEvt = this.changeListTypeEvt.bind(this);
	}

	changeListTypeEvt=(target)=>{
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

	componentDidMount(){
		window.addEventListener("resize", imgSizeEvt());
	}
  
  render(){
    return(
      <div className="list-div">
				{this.props.dataList}
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
						this.props.dataList.map((item, idx)=>(
							<li key={idx}>
								<Link to="">
									{item.length}
									<div className="img-div">
										<img src={item[idx].referenceIdentifier} alt="" />
									</div>
									<div className="txt-div">
										<p className="tit">{item[idx].title}</p>
										<p className="txt">{item[idx].description}</p>
									</div>
								</Link>
							</li>
						))
					}
				</ul>
				<div className="btn-wrap">
					<button type="button" className="blue-btn">More</button>
				</div>
			</div>	
    )
  }
};

export default CardList;