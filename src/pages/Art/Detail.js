import React, { useEffect, useState } from "react";
import XMLparser from "react-xml-parser";
import {useParams} from "react-router-dom";
import DetailInfo from "./DetailInfo";
import DetailLocal from "./DetailLocal";
import DetailVis from "./DetailVis";
import * as CommonEvt from "../../CommonEvt";
import "./art.scss";
import axios from "axios";


const ArtDetail=()=>{
	const seq = useParams("seq").seq;
	const [performance, setPerformance] = useState([]);
	
	const parseStr=(dataSet)=>{
		const dataArr = new XMLparser().parseFromString(dataSet).children;
		// eslint-disable-next-line no-lone-blocks
		{
			dataArr.map((item) => {
				if(item.name === "msgBody") {
					item.children.map((perforData) => {
						if(perforData.name === "perforInfo"){
							setPerformance(perforData.children);
						}
					})
				}
			});
		}
	}
	
	const getData=(seq)=>{
		let url = "/openapi/rest/publicperformancedisplays/d/";
		var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'OApFbw%2FzxEwtqHKqUyc8QWvBESqtoamTLFLeS7zF7RTUAy1MykuCnHPhQzRBtz8vU76BEmXb2aYcPLMmW7KQkw%3D%3D'; /*Service Key*/
		queryParams += '&' + encodeURIComponent('seq') + '=' + encodeURIComponent(seq); /**/
	
		axios.get('/artApi' + url + queryParams).then(res=>{
			parseStr(res.data);
		}).catch(error=>{
			console.log(error.response);
		})
	}

	useEffect(()=>{
		getData(seq);
		CommonEvt.headerStyle();
	},[])

	return(
		<div id="cBody">
			<div className="detail-wrap">
				<DetailVis data={performance} />
				<div className="inner">
					<DetailInfo data={performance} />
				</div>
				<DetailLocal />
			</div>
		</div>
	)
}

export default ArtDetail;