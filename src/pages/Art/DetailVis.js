import React from "react";
import moment from "moment";

const DetailVis=({data})=>{
	const getDataArr = data;
	const dataInfo = {
		title:"",
		startDate:"",
		endDate:"",
		thumbnail:""
	};

	getDataArr.map((item)=>{
		if(item.name === "title"){
			dataInfo.title = item.value;
		}
		if(item.name === "startDate"){
			dataInfo.startDate = item.value;
		}
		if(item.name === "endDate"){
			dataInfo.endDate = item.value;
		}
		if(item.name === "imgUrl"){
			dataInfo.thumbnail = item.value;
		}
	})
	
	return(
		<div className="detail-vis">
			<div className="inner">
				<div className="img-div">
					<img src={dataInfo.thumbnail} alt="" />
				</div>
				<div className="txt-div">
					<p className="tit">{dataInfo.title}</p>
					<p className="txt">{moment(dataInfo.startDate.toString()).format("YYYY.MM.DD")} ~ {moment(dataInfo.endDate.toString()).format("YYYY.MM.DD")}</p>
				</div>
			</div>
		</div>
	)
}

export default DetailVis;