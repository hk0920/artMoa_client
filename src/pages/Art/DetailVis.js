import React from "react";

const DetailVis=({data})=>{
	const getDataArr = data;
	const dataInfo = {
		title:"",
		subTitle:"",
		thumbnail:""
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
	})
	
	return(
		<div className="detail-vis">
			<div className="inner">
				<div className="img-div">
					<img src={dataInfo.thumbnail} alt="" />
				</div>
				<div className="txt-div">
					<p className="tit">{dataInfo.title}</p>
					<p className="txt">{dataInfo.subTitle}</p>
				</div>
			</div>
		</div>
	)
}

export default DetailVis;