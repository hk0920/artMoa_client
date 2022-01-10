import React from "react";
import moment from "moment";

const DetailInfo=({data})=>{
	const getDataArr = data;
	const dataInfo = {
		title:"",
		subTitle:"",
		thumbnail:"",
		area:"",
		place:"",
		price:"",
		phone:"",
		startDate:"",
		endDate:""
	};

	getDataArr.map((item)=>{
		if(item.name === "title"){
			dataInfo.title = item.value;
		}
		if(item.name === "subTitle"){
			dataInfo.subTitle = item.value;
		}
		if(item.name === "imgUrl"){
			dataInfo.thumbnail = item.value;
		}
		if(item.name === "area"){
			dataInfo.area = item.value;
		}
		if(item.name === "place"){
			dataInfo.place = item.value;
		}
		if(item.name === "price"){
			dataInfo.price = item.value;
		}
		if(item.name === "phone"){
			dataInfo.phone = item.value;
		}
		if(item.name === "startDate"){
			dataInfo.startDate = item.value;
		}
		if(item.name === "endDate"){
			dataInfo.endDate = item.value;
		}
		console.log(item.name);
	})
	
	return(
		<div className="detail-info">
			<div className="img-div">
				<img src={dataInfo.thumbnail} alt="" />
			</div>
			<div className="info-div">
				<p className="tit">{dataInfo.title}</p>
				<p className="txt">{dataInfo.subTitle}</p>
				<ul className="use-info">
					<li>
						<strong className="bold-txt">지역</strong>
						{dataInfo.area!==""?dataInfo.area:"데이터 없음"}
					</li>
					<li>
						<strong className="bold-txt">전시 장소</strong>
						{dataInfo.place!==""?dataInfo.place:"데이터 없음"}
					</li>
					<li>
						<strong className="bold-txt">전시 기간</strong>
						{moment(dataInfo.startDate.toString()).format("YYYY.MM.DD")} ~ {moment(dataInfo.endDate.toString()).format("YYYY.MM.DD")}
					</li>
					<li>
						<strong className="bold-txt">티켓 요금</strong>
						{dataInfo.price!==""?dataInfo.price:"데이터 없음"}
					</li>
					<li>
						<strong className="bold-txt">문의처</strong>
						{dataInfo.phone!==""?dataInfo.phone:"데이터 없음"}
					</li>
				</ul>
				<div className="btn-wrap">
					<a href="" className="blue-btn">More</a>
				</div>
			</div>
		</div>
	)
}

export default DetailInfo;