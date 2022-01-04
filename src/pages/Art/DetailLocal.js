import React from "react";
import NaverApiMap from "./NaverAPIMap";


const DetailLocal=()=>{
	return(
		<>
			<div className="local-map">
				<p className="map-addr">경기도 용인시 수지구 어쩌구 저쩌구 위치</p>
				<div className="map-div">
					<NaverApiMap />
				</div>
			</div>
		</>
	)
}

export default DetailLocal;