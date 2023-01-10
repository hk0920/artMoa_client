import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as CommonEvt from "../../CommonEvt";
import "./notice.scss";
import noticeSampleData from "../../datas/NoticeSampleData";

const NoticeDetail=()=>{
	const id = useParams("id").id;
	const [data, setData] = useState({
		id:"",
		title:"",
		content:"",
		readCnt:"",
		register:"",
		date:""
	});
	const navigate = useNavigate();

	useEffect(()=>{
		getData();
	},[])

	const getData=()=>{
		CommonEvt.api.get("/httpApi/support/notice/detail",{
			params:{
				id:id
			}
		}).then((res)=>{
			const info = res.data.data.info;
			console.log(res.data.data.info);
			setData({
				id:info.id,
				title:info.title,
				content:info.content,
				readCnt:info.readCnt,
				register:info.register,
				date:info.registerTime
			})
		}).catch((error)=>{
			for(let i=0; i<noticeSampleData.length; i++){
				if(noticeSampleData[i].id === Number(id)){
					console.log(noticeSampleData[i])
					setData({
						id:noticeSampleData[i].id,
						title:noticeSampleData[i].title,
						content:noticeSampleData[i].content,
						readCnt:noticeSampleData[i].readCnt,
						register:noticeSampleData[i].register,
						date:noticeSampleData[i].registerTime
					});
				}
			}
			console.log(error);
		})
	}

	const deleteEvt=(e)=>{
		const id = e.target.value;
		console.log(id);
		CommonEvt.api.delete("/httpApi/support/notice",{
			data:{
				id:id
			}
		}).then((res)=>{
			console.log(res);
			navigate("/notice");
		}).catch((err)=>{
			console.log(err)
		})
	}

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
						<p className="writer">{data.register}</p>
						<p className="date">{data.date}</p>
					</div>

					<div className="txt-div">
						{
							data.content===null?
								<div className="no-data">
									<p>상세내용이 없습니다.</p>
								</div>
							:
								<pre>{data.content}</pre>
						}
					</div>
				</div>
				<div className="btn-wrap">
					<Link to="/notice/update" state={{idx:data.id}} className="white-btn">수정</Link>
					<button type="button" className="white-btn" value={data.id} onClick={deleteEvt}>삭제</button>
				</div>
			</div>
		</div>
	)
}

export default NoticeDetail;