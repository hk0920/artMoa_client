import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./notice.scss";

const NoticeDetail=()=>{
	const location = useLocation();
	const [data, setData] = useState({
		title:"",
		description:"",
		date:"",
		url:"",
		viewCnt:""
	});

	useEffect(()=>{
		setData({
			title:location.state.info.title,
			publisher:location.state.info.publisher,
			description:location.state.info.description,
			date:location.state.info.regDate,
			url:location.state.info.url,
			viewCnt:location.state.info.viewCnt
		})
		console.log(location.state.info);
	},[])

	return(
		<div id="cBody">
			<div className="sub-vis">
				<div className="bg bg4"></div>
				<h2 className="sub-title">Notice</h2>
			</div>
			<div className="notice-div inner">
				<div className="view-div">
					<div className="title-div">
						<p className="tit">{data.title}</p>
						<p className="writer">{data.publisher}</p>
						<p className="date">{data.date}</p>
					</div>

					<div className="txt-div">
						{
							data.description===null?<p className="nodata">상세내용이 없습니다.</p>:data.description
						}
					</div>
				</div>
				<div className="btn-wrap">
					<a href={data.url} className="blue-btn">More</a>
				</div>
			</div>
		</div>
	)
}

export default NoticeDetail;