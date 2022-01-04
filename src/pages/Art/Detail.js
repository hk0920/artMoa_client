import React from "react";
import DetailInfo from "./DetailInfo";
import DetailLocal from "./DetailLocal";
import DetailVis from "./DetailVis";
import "./art.scss";

const Detail=()=>{
	return(
		<div id="cBody">
			<div className="detail-wrap">
				<DetailVis />
				<div className="inner">
					<DetailInfo />
				</div>
				<DetailLocal />
			</div>
		</div>
	)
}

export default Detail;